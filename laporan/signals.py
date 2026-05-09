from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Pengaduan, Notifikasi


@receiver(post_save, sender=Pengaduan)
def create_notification_on_status_change(sender, instance, created, **kwargs):
    """
    Signal untuk membuat notifikasi ketika status Pengaduan berubah.
    Hanya untuk user yang tidak anonim.
    """
    if not created and instance.user:  # Jika edit (bukan create) dan user bukan anonim
        # Cek apakah status benar-benar berubah dengan membandingkan dengan instance sebelumnya
        old_instance = Pengaduan.objects.filter(pk=instance.pk).values('status').first()
        
        if old_instance and old_instance['status'] != instance.status:
            # Status berubah, buat notifikasi
            pesan = f"Status laporan Anda '{instance.judul}' telah berubah menjadi {instance.get_status_display()}"
            Notifikasi.objects.create(
                penerima=instance.user,
                pesan=pesan
            )
