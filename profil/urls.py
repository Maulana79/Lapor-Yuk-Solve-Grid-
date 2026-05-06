from django.urls import path
from . import views

urlpatterns = [
    path('', views.profil_view, name='profil'),
]
