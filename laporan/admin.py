from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Pengaduan, Notifikasi, Dukungan


@admin.register(Pengaduan)
class PengaduanAdmin(ModelAdmin):
    list_display = ('judul', 'user', 'kategori', 'urgensi', 'status', 'created_at', 'support_count', 'rating')
    list_filter = ('kategori', 'urgensi', 'status', 'created_at')
    search_fields = ('judul', 'deskripsi', 'lokasi_detail', 'user__username')
    readonly_fields = ('created_at', 'latitude', 'longitude')
    list_editable = ('status',)
    fieldsets = (
        ('Informasi Laporan', {
            'fields': ('judul', 'deskripsi', 'kategori', 'urgensi')
        }),
        ('Lokasi', {
            'fields': ('lokasi_detail', 'latitude', 'longitude')
        }),
        ('Media', {
            'fields': ('gambar',)
        }),
        ('Status & User', {
            'fields': ('status', 'user', 'is_anonim')
        }),
        ('Penilaian', {
            'fields': ('rating',)
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

    def support_count(self, obj):
        return obj.dukungan.count()
    support_count.short_description = 'Dukungan'


@admin.register(Notifikasi)
class NotifikasiAdmin(ModelAdmin):
    list_display = ('penerima', 'pesan_preview', 'is_read', 'tanggal_dibuat')
    list_filter = ('is_read', 'tanggal_dibuat')
    search_fields = ('penerima__username', 'pesan')
    readonly_fields = ('tanggal_dibuat',)
    list_editable = ('is_read',)

    def pesan_preview(self, obj):
        return obj.pesan[:50] + '...' if len(obj.pesan) > 50 else obj.pesan
    pesan_preview.short_description = 'Pesan'


@admin.register(Dukungan)
class DukunganAdmin(ModelAdmin):
    list_display = ('laporan', 'user', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('laporan__judul', 'user__username')
    readonly_fields = ('created_at',)
