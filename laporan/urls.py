from django.urls import path
from . import views

urlpatterns = [
    path('', views.beranda_view, name='beranda'),
    path('lapor/', views.lapor_view, name='lapor'),
    path('riwayat/', views.riwayat_view, name='riwayat'),
    path('cari/', views.pencarian_view, name='cari_laporan'),
    path('api/pengaduan/', views.api_pengaduan, name='api_pengaduan'),
    path('api/notifikasi/<int:notif_id>/read/', views.mark_notifikasi_read, name='mark_notifikasi_read'),
    path('api/chatbot/', views.chatbot_api, name='chatbot_api'),
]
