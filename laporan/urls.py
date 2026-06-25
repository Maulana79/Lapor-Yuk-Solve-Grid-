from django.urls import path
from . import views

urlpatterns = [
    path('', views.beranda_view, name='beranda'),
    path('lapor/', views.lapor_view, name='lapor'),
    path('riwayat/', views.riwayat_view, name='riwayat'),
    path('cari/', views.pencarian_view, name='cari_laporan'),
    path('semua-laporan/', views.semua_laporan_view, name='semua_laporan'),
    path('beri-rating/<int:laporan_id>/', views.beri_rating_view, name='beri_rating'),
    path('api/pengaduan/', views.api_pengaduan, name='api_pengaduan'),
    path('api/dukung/', views.dukung_laporan, name='dukung_laporan'),
    path('api/notifikasi/<int:notif_id>/read/', views.mark_notifikasi_read, name='mark_notifikasi_read'),
    path('api/notifikasi/status/', views.notifikasi_status, name='notifikasi_status'),
    path('api/chatbot/', views.chatbot_api, name='chatbot_api'),
    path('api/nearby-reports/', views.nearby_reports, name='nearby_reports'),
    path('api/all-reports/', views.all_reports, name='all_reports'),
]
