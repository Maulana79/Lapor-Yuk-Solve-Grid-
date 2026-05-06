from django.urls import path
from . import views

urlpatterns = [
    path('peta/', views.peta_view, name='peta'),
]