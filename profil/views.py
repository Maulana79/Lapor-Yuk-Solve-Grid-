from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.db.models import Count

from .forms import ProfileForm
from .models import Profile
from laporan.models import Pengaduan


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

    # Get recent reports for display
    recent_reports = laporan_qs.order_by('-created_at')[:4]

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
    }
    return render(request, 'profil.html', context)
