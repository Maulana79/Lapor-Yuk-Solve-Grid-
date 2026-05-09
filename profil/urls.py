from django.urls import path
from . import views

urlpatterns = [
    path('', views.profil_view, name='profil'),
    path('notifikasi/', views.notifikasi_view, name='profil_notifikasi'),
    path('privasi-keamanan/', views.privasi_view, name='profil_privasi'),
    path('pusat-bantuan/', views.pusat_bantuan_view, name='profil_help'),
]
