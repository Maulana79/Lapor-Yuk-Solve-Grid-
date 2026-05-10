from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Pengaduan, Notifikasi


def get_admin_users():
    """
    Mendapatkan semua user yang adalah admin/staff.
    """
    return User.objects.filter(is_staff=True)


@receiver(pre_save, sender=Pengaduan)
def store_old_status(sender, instance, **kwargs):
    """
    Signal untuk menyimpan status lama sebelum disimpan ke database.
    """
    if instance.pk:
        try:
            old_instance = Pengaduan.objects.get(pk=instance.pk)
            instance._old_status = old_instance.status
        except Pengaduan.DoesNotExist:
            instance._old_status = None
    else:
        instance._old_status = None


@receiver(post_save, sender=Pengaduan)
def create_notification_on_pengaduan_change(sender, instance, created, **kwargs):
    """
    Signal untuk membuat notifikasi:
    1. Ke user yang membuat laporan saat status berubah
    2. Ke semua admin saat laporan baru dibuat
    3. Ke semua admin saat status berubah
    """
    admin_users = get_admin_users()
    
    # Jika laporan baru dibuat, notifikasi ke semua admin
    if created:
        user_info = f"dari {instance.user.username}" if instance.user else "Laporan Anonim"
        for admin in admin_users:
            pesan = f"Laporan baru '{instance.judul}' ({instance.kategori}) {user_info} - Status: {instance.status.upper()}"
            Notifikasi.objects.create(
                penerima=admin,
                pesan=pesan
            )
    
    # Jika status berubah, notifikasi ke user dan admin
    if not created:
        old_status = getattr(instance, '_old_status', None)
        
        if old_status and old_status != instance.status:
            # Notifikasi ke user yang membuat laporan (jika tidak anonim)
            if instance.user:
                pesan_user = f"Status laporan Anda '{instance.judul}' telah berubah menjadi {instance.status.upper()}"
                Notifikasi.objects.create(
                    penerima=instance.user,
                    pesan=pesan_user
                )
            
            # Notifikasi ke semua admin
            user_info = f"dari {instance.user.username}" if instance.user else "Laporan Anonim"
            for admin in admin_users:
                pesan_admin = f"Status laporan '{instance.judul}' {user_info} berubah dari {old_status.upper()} menjadi {instance.status.upper()}"
                Notifikasi.objects.create(
                    penerima=admin,
                    pesan=pesan_admin
                )
