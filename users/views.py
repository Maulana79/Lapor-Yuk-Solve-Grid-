from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

# --- VIEW UNTUK REGISTER ---
def register_view(request):
    if request.method == 'POST':
        # 1. Tangkap data dari atribut 'name' di HTML
        nama = request.POST.get('name')
        username = request.POST.get('email') or request.POST.get('username')
        password = request.POST.get('password')
        konfirmasi = request.POST.get('confirm_password')

        # 2. Validasi Password
        if password == konfirmasi:
            # Cek apakah email/NIK sudah dipakai
            if User.objects.filter(username=username).exists():
                messages.error(request, 'Email atau NIK sudah terdaftar!')
            else:
                # 3. Simpan ke Database
                user = User.objects.create_user(username=username, password=password, first_name=nama)
                user.save()
                
                # 4. Langsung login-kan dan arahkan ke beranda
                login(request, user)
                return redirect('beranda') # Sesuaikan dengan name url beranda kamu
        else:
            messages.error(request, 'Password dan Konfirmasi tidak cocok!')

    return render(request, 'users/register.html')

# --- VIEW UNTUK LOGIN ---
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        # 1. Cek kecocokan di database
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            # 2. Jika cocok, buat sesi login
            login(request, user)
            return redirect('beranda') # Sesuaikan dengan name url beranda kamu
        else:
            # 3. Jika salah, tolak
            messages.error(request, 'Email/NIK atau Password salah!')

    return render(request, 'users/login.html')

# --- VIEW UNTUK LOGOUT (Opsional tapi penting) ---
def logout_view(request):
    logout(request)
    return redirect('login')