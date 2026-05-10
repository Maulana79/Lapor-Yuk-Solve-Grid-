from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('password_change/', views.change_password_view, name='password_change'),
    path('forgot_password/', views.forgot_password_view, name='forgot_password'),
    path('reset_password/<str:uidb64>/<str:token>/', views.reset_password_view, name='reset_password'),
    path('syarat-ketentuan/', views.syarat_ketentuan_view, name='syarat_ketentuan'),
]