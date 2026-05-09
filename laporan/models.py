from django.db import models
from django.contrib.auth.models import User

class Pengaduan(models.Model):
    KATEGORI_CHOICES = [
        ('jalan', 'Jalan Rusak'),
        ('sampah', 'Sampah'),
        ('lampu', 'Lampu Mati'),
        ('banjir', 'Banjir'),
        ('pohon', 'Pohon Tumbang'),
        ('listrik', 'Listrik/Kabel'),
        ('kebakaran', 'Kebakaran'),
        ('lainnya', 'Lainnya'),
    ]

    URGENSI_CHOICES = [
        ('rendah', 'Rendah'),
        ('sedang', 'Sedang'),
        ('tinggi', 'Tinggi'),
        ('darurat', 'Darurat'),
    ]

    RATING_CHOICES = [
        (1, '⭐'),
        (2, '⭐⭐'),
        (3, '⭐⭐⭐'),
        (4, '⭐⭐⭐⭐'),
        (5, '⭐⭐⭐⭐⭐'),
    ]

    judul = models.CharField(max_length=100)
    deskripsi = models.TextField()
    kategori = models.CharField(max_length=20, choices=KATEGORI_CHOICES)
    urgensi = models.CharField(max_length=20, choices=URGENSI_CHOICES)
    lokasi_detail = models.CharField(max_length=255, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    gambar = models.JSONField(default=list, blank=True)  # List of image paths
    is_anonim = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='pending')
    rating = models.IntegerField(choices=RATING_CHOICES, null=True, blank=True)  # Kepuasan (1-5)

    def __str__(self):
        return self.judul


class Notifikasi(models.Model):
    penerima = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifikasi')
    pesan = models.TextField()
    is_read = models.BooleanField(default=False)
    tanggal_dibuat = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-tanggal_dibuat']
        verbose_name_plural = 'Notifikasi'

    def __str__(self):
        return f"Notifikasi untuk {self.penerima.username}: {self.pesan[:50]}"
