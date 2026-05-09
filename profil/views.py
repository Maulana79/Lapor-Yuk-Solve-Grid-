from django.http import JsonResponse
from django.shortcuts import render
from django.template.loader import render_to_string
from django.contrib.auth.decorators import login_required
from django.db.models import Count

from .forms import ProfileForm
from .models import Profile
from laporan.models import Pengaduan, Notifikasi


@login_required(login_url='/login/')
def profil_view(request):
    user = request.user
    username = user.username or ''
    profile_name = user.get_full_name() or user.first_name or username
    email_display = user.email or username

    if username.isdigit() and len(username) >= 8:
        nik_display = username[:4] + '•' * (len(username) - 8) + username[-4:]
    else:
        nik_display = '-'

    profile, _ = Profile.objects.get_or_create(user=user)
    if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            success_message = 'Profil berhasil disimpan.'
        else:
            success_message = None
    else:
        form = ProfileForm(instance=profile)
        success_message = None

    profile_location = profile.location or 'Lokasi belum tersedia'
    profile_phone = profile.phone or '-'

    laporan_qs = Pengaduan.objects.filter(user=user)
    total_reports = laporan_qs.count()
    pending_reports = laporan_qs.filter(status='pending').count()
    processing_reports = laporan_qs.filter(status='diproses').count()
    completed_reports = laporan_qs.filter(status='selesai').count()
    support_reports = laporan_qs.filter(rating__isnull=False).count()
    jumlah_notifikasi = Notifikasi.objects.filter(penerima=user, is_read=False).count()

    filter_status = request.GET.get('status', 'all')
    all_reports = laporan_qs.order_by('-created_at')
    filtered_reports = all_reports
    if filter_status in ['pending', 'diproses', 'selesai']:
        filtered_reports = filtered_reports.filter(status=filter_status)

    # Get reports for display
    recent_reports = filtered_reports

    report_cards_json = [
        {
            'judul': report.judul,
            'status': report.status,
            'created_at': report.created_at.strftime('%d %b %Y'),
            'lokasi_detail': report.lokasi_detail or 'Lokasi tidak spesifik',
            'urgensi': report.get_urgensi_display(),
            'deskripsi': report.deskripsi,
            'gambar_url': report.gambar_urls[0] if report.gambar_urls else '',
        }
        for report in all_reports
    ]

    # Calculate achievements
    completed_achievements = 0
    is_veteran = user.date_joined.year < 2024
    if total_reports >= 1:
        completed_achievements += 1
    if total_reports >= 5:
        completed_achievements += 1
    if total_reports >= 10:
        completed_achievements += 1
    if completed_reports >= 3:
        completed_achievements += 1
    if support_reports >= 5:
        completed_achievements += 1
    if is_veteran:
        completed_achievements += 1

    users_with_reports = (
        Pengaduan.objects
        .filter(user__isnull=False)
        .values('user')
        .annotate(report_count=Count('id'))
        .order_by('-report_count')
    )
    rank_display = 'N/A'
    for index, item in enumerate(users_with_reports, start=1):
        if item['user'] == user.id:
            rank_display = index
            break

    points = total_reports * 50
    goal_points = 1000
    progress_percent = min(100, int(points / goal_points * 100)) if goal_points else 0

    context = {
        'profile_name': profile_name,
        'email_display': email_display,
        'nik_display': nik_display,
        'profile_location': profile_location,
        'profile_phone': profile_phone,
        'joined_date': user.date_joined.strftime('%B %Y'),
        'total_reports': total_reports,
        'pending_reports': pending_reports,
        'processing_reports': processing_reports,
        'completed_reports': completed_reports,
        'support_reports': support_reports,
        'rank_display': rank_display,
        'points': points,
        'goal_points': goal_points,
        'progress_percent': progress_percent,
        'profile_form': form,
        'profile': profile,
        'success_message': success_message,
        'recent_reports': recent_reports,
        'completed_achievements': completed_achievements,
        'is_veteran': is_veteran,
        'jumlah_notifikasi': jumlah_notifikasi,
        'filter_status': filter_status,
        'report_cards_json': report_cards_json,
    }
    return render(request, 'profil.html', context)


@login_required(login_url='/login/')
def notifikasi_view(request):
    from laporan.models import Notifikasi

    notifikasi_list = Notifikasi.objects.filter(penerima=request.user)
    return render(request, 'profil_notifikasi.html', {
        'notifikasi_list': notifikasi_list,
    })


@login_required(login_url='/login/')
def privasi_view(request):
    return render(request, 'profil_privacy.html')


@login_required(login_url='/login/')
def pusat_bantuan_view(request):
    return render(request, 'profil_help.html')
