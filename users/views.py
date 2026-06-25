from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode, url_has_allowed_host_and_scheme
from django.utils.encoding import force_bytes, force_str
from django.urls import reverse
from django.conf import settings
from datetime import datetime

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
    next_url = request.GET.get('next') or request.POST.get('next') or ''

    if request.method == 'POST':
        login_value = request.POST.get('username')
        password = request.POST.get('password')
        admin_login = request.POST.get('admin_login') == 'on'
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
            if admin_login:
                if user.is_staff or user.is_superuser:
                    return redirect('/admin/')
                messages.error(request, 'Akun Anda tidak memiliki akses dashboard admin.')
            if next_url and url_has_allowed_host_and_scheme(next_url, allowed_hosts={request.get_host()}, require_https=request.is_secure()):
                return redirect(next_url)
            return redirect('beranda')
        else:
            messages.error(request, 'Email/NIK atau Password salah!')

    return render(request, 'users/login.html', {'next': next_url})

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


# --- VIEW UNTUK FORGOT PASSWORD ---
def forgot_password_view(request):
    """
    Halaman untuk meminta reset password via email
    """
    if request.method == 'POST':
        email = request.POST.get('email')
        try:
            user = User.objects.get(email__iexact=email)
            # Generate token untuk reset password
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            
            # Buat link reset password
            reset_link = request.build_absolute_uri(
                reverse('reset_password', kwargs={'uidb64': uid, 'token': token})
            )
            
            # Kirim email
            subject = 'Reset Password LaporYuk!'
            message = f"""
            Halo {user.first_name or user.username},
            
            Anda telah meminta untuk mereset password. Klik link di bawah untuk membuat password baru:
            
            {reset_link}
            
            Link ini hanya berlaku selama 24 jam.
            
            Jika Anda tidak meminta reset password, abaikan email ini.
            
            Terima kasih,
            Tim LaporYuk!
            """
            
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
            messages.success(request, 'Link reset password telah dikirim ke email Anda. Periksa inbox atau folder spam.')
            return redirect('login')
        except User.DoesNotExist:
            # Jangan beritahu bahwa email tidak ada (security best practice)
            messages.success(request, 'Jika email terdaftar, link reset password telah dikirim.')
            return redirect('login')
    
    return render(request, 'users/forgot_password.html')


def reset_password_view(request, uidb64, token):
    """
    Halaman untuk reset password dengan token
    """
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    
    if user is not None and default_token_generator.check_token(user, token):
        if request.method == 'POST':
            new_password = request.POST.get('new_password')
            confirm_password = request.POST.get('confirm_password')
            
            if new_password and new_password == confirm_password:
                user.set_password(new_password)
                user.save()
                messages.success(request, 'Password berhasil direset. Silakan login dengan password baru.')
                return redirect('login')
            else:
                messages.error(request, 'Password dan konfirmasi tidak cocok.')
        
        return render(request, 'users/reset_password.html', {'uidb64': uidb64, 'token': token})
    else:
        messages.error(request, 'Link reset password tidak valid atau sudah kadaluarsa.')
        return redirect('login')


# --- VIEW UNTUK SYARAT DAN KETENTUAN ---
def syarat_ketentuan_view(request):
    """
    Halaman untuk menampilkan syarat dan ketentuan aplikasi
    """
    context = {
        'current_date': datetime.now(),
    }
    return render(request, 'users/syarat_ketentuan.html', context)