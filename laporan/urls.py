from django.urls import path
from . import views

urlpatterns = [
    path('', views.beranda_view, name='beranda'),
    path('lapor/', views.lapor_view, name='lapor'),
    path('riwayat/', views.riwayat_view, name='riwayat'),
    path('api/pengaduan/', views.api_pengaduan, name='api_pengaduan'),
]