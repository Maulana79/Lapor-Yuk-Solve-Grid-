from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from profil.models import Profile

# --- VIEW UNTUK REGISTER ---
def register_view(request):
    if request.method == 'POST':
        nama = request.POST.get('name')
        nik = request.POST.get('nik')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        password = request.POST.get('password')
        konfirmasi = request.POST.get('confirm_password')

        if password == konfirmasi:
            if User.objects.filter(username=nik).exists() or User.objects.filter(email=email).exists():
                messages.error(request, 'NIK atau email sudah terdaftar!')
            else:
                user = User.objects.create_user(username=nik, email=email, password=password, first_name=nama)
                user.save()
                Profile.objects.create(user=user, phone=phone)
                login(request, user)
                return redirect('beranda')
        else:
            messages.error(request, 'Password dan Konfirmasi tidak cocok!')

    return render(request, 'users/register.html')

# --- VIEW UNTUK LOGIN ---
def login_view(request):
    if request.method == 'POST':
        login_value = request.POST.get('username')
        password = request.POST.get('password')
        username = login_value

        if login_value and '@' in login_value:
            try:
                user_by_email = User.objects.get(email__iexact=login_value)
                username = user_by_email.username
            except User.DoesNotExist:
                username = login_value

        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('beranda')
        else:
            messages.error(request, 'Email/NIK atau Password salah!')

    return render(request, 'users/login.html')

# --- VIEW UNTUK LOGOUT (Opsional tapi penting) ---
def logout_view(request):
    logout(request)
    return redirect('login')

@login_required(login_url='/login/')
def change_password_view(request):
    success_message = None
    error_message = None

    if request.method == 'POST':
        current_password = request.POST.get('current_password')
        new_password = request.POST.get('new_password')
        confirm_password = request.POST.get('confirm_password')

        if not request.user.check_password(current_password):
            error_message = 'Password saat ini tidak cocok.'
        elif not new_password or new_password != confirm_password:
            error_message = 'Password baru dan konfirmasi harus sama.'
        else:
            request.user.set_password(new_password)
            request.user.save()
            update_session_auth_hash(request, request.user)
            success_message = 'Password berhasil diperbarui.'

    return render(request, 'users/password_change.html', {
        'success_message': success_message,
        'error_message': error_message,
    })