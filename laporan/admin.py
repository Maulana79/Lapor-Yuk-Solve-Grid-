from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Pengaduan, Notifikasi


@admin.register(Pengaduan)
class PengaduanAdmin(ModelAdmin):
    list_display = ('judul', 'user', 'kategori', 'urgensi', 'status', 'created_at', 'rating')
    list_filter = ('kategori', 'urgensi', 'status', 'created_at')
    search_fields = ('judul', 'deskripsi', 'lokasi_detail', 'user__username')
    readonly_fields = ('created_at',)
    list_editable = ('status',)

    def get_list_display_status(self, obj):
        return obj.status


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
