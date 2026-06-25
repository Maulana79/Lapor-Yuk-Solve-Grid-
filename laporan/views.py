from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.db.models import Avg, Q, Count
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.files.storage import default_storage
from django.core.cache import cache
from django.conf import settings
from .models import Pengaduan, Notifikasi, Dukungan
from profil.models import Profile
import json
import hashlib
import os
import uuid
import math
from google import genai


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR') or ''


def is_same_origin_request(request):
    origin = request.headers.get('Origin')
    if origin:
        allowed_origin = f"{request.scheme}://{request.get_host()}"
        if origin != allowed_origin:
            return False
    return True


def rate_limit_request(request, cache_key_prefix, max_requests=20, window_seconds=60):
    ip = get_client_ip(request)
    if not ip:
        return False

    cache_key = f"{cache_key_prefix}:{ip}"
    count = cache.get(cache_key, 0)
    if count >= max_requests:
        return False
    cache.set(cache_key, count + 1, timeout=window_seconds)
    return True


@login_required(login_url='/login/')
def beranda_view(request):
    kategori_filter = request.GET.get('kategori', '')
    
    # Get user profile data
    user = request.user
    username = user.username or ''
    profile_name = user.get_full_name() or user.first_name or username
    email_display = user.email or username

    profile, _ = Profile.objects.get_or_create(user=user)
    profile_location = profile.location or 'Lokasi belum tersedia'
    
    # Get all laporan with support counts and default trending order
    laporan_list = Pengaduan.objects.annotate(support_count=Count('dukungan'))

    if kategori_filter and kategori_filter != 'semua':
        laporan_list = laporan_list.filter(kategori=kategori_filter)

    laporan_list = laporan_list.order_by('-support_count', '-created_at')

    # Get 4 latest laporan for display
    laporan_terbaru = laporan_list[:4]
    supported_ids = set()
    if request.user.is_authenticated:
        supported_ids = set(Dukungan.objects.filter(user=request.user, laporan__in=laporan_terbaru).values_list('laporan_id', flat=True))
    
    # Calculate statistics
    total_laporan = Pengaduan.objects.count()
    jumlah_diproses = Pengaduan.objects.filter(status='diproses').count()
    jumlah_selesai = Pengaduan.objects.filter(status='selesai').count()
    
    # Calculate average satisfaction rating
    avg_rating = Pengaduan.objects.filter(rating__isnull=False).aggregate(Avg('rating'))['rating__avg']
    tingkat_kepuasan = round((avg_rating / 5 * 100)) if avg_rating else 0
    
    # Kategori choices
    kategori_choices = Pengaduan.KATEGORI_CHOICES
    
    # Transform data for map display (same format as peta_view)
    def calculate_distance(lat1, lon1, lat2, lon2):
        lat1_rad = math.radians(lat1)
        lon1_rad = math.radians(lon1)
        lat2_rad = math.radians(lat2)
        lon2_rad = math.radians(lon2)
        dlon = lon2_rad - lon1_rad
        dlat = lat2_rad - lat1_rad
        a = math.sin(dlat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon/2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        return 6371 * c
    
    samarinda_lat = -0.5021
    samarinda_lon = 117.1536
    
    laporan_map_data = []
    for laporan in laporan_list:
        status_mapping = {
            'pending': {'display': 'Menunggu', 'id': 'menunggu', 'color': 'text-red-600', 'dotColor': '#ef4444'},
            'diproses': {'display': 'Diproses', 'id': 'diproses', 'color': 'text-yellow-600', 'dotColor': '#f59e0b'},
            'selesai': {'display': 'Selesai', 'id': 'selesai', 'color': 'text-green-600', 'dotColor': '#10b981'},
        }
        
        status_info = status_mapping.get(laporan.status, status_mapping['pending'])
        
        latitude = laporan.latitude if laporan.latitude else -0.5021
        longitude = laporan.longitude if laporan.longitude else 117.1536
        
        if not laporan.latitude or not laporan.longitude:
            import random
            latitude += random.uniform(-0.05, 0.05)
            longitude += random.uniform(-0.05, 0.05)
        
        distance = calculate_distance(samarinda_lat, samarinda_lon, latitude, longitude)
        
        if distance < 1:
            jarak_display = f"{distance*1000:.0f} m"
        else:
            jarak_display = f"{distance:.1f} km"
        
        image_url = laporan.gambar_urls[0] if laporan.gambar and len(laporan.gambar) > 0 else "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400"
        
        laporan_data = {
            'id': laporan.id,
            'status': status_info['display'],
            'statusId': status_info['id'],
            'statusColor': status_info['color'],
            'dotColor': status_info['dotColor'],
            'kategori': laporan.get_kategori_display(),
            'waktu': f"{laporan.created_at.strftime('%d %B %Y')}",
            'judul': laporan.judul,
            'jarak': jarak_display,
            'likes': 0,
            'comments': 0,
            'position': [latitude, longitude],
            'image': image_url,
            'deskripsi': laporan.deskripsi,
            'lokasi': laporan.lokasi_detail,
        }
        laporan_map_data.append(laporan_data)
    
    laporan_json = json.dumps(laporan_map_data)
    
    return render(request, 'laporan/beranda.html', {
        'laporan_terbaru': laporan_terbaru,
        'total_laporan': total_laporan,
        'jumlah_diproses': jumlah_diproses,
        'jumlah_selesai': jumlah_selesai,
        'kategori_choices': kategori_choices,
        'kategori_filter': kategori_filter,
        'tingkat_kepuasan': tingkat_kepuasan,
        'profile_name': profile_name,
        'profile_location': profile_location,
        'supported_ids': supported_ids,
        'laporan_json': laporan_json,
    })

def lapor_view(request):
    return render(request, 'laporan/lapor.html')

def pencarian_view(request):
    query = request.GET.get('q', '').strip()
    hasil_laporan = Pengaduan.objects.none()

    if query:
        hasil_laporan = Pengaduan.objects.filter(
            Q(judul__icontains=query) | Q(deskripsi__icontains=query)
        ).order_by('-created_at')

    return render(request, 'laporan/hasil_pencarian.html', {
        'query': query,
        'hasil_laporan': hasil_laporan,
    })

def semua_laporan_view(request):
    """
    Halaman untuk melihat semua laporan dari semua user
    """
    query = request.GET.get('q', '').strip()
    kategori_filter = request.GET.get('kategori', '').strip()
    status_filter = request.GET.get('status', '').strip()
    sort = request.GET.get('sort', 'latest').strip()

    laporan_list = Pengaduan.objects.annotate(support_count=Count('dukungan'))

    if query:
        laporan_list = laporan_list.filter(
            Q(judul__icontains=query) |
            Q(deskripsi__icontains=query) |
            Q(lokasi_detail__icontains=query)
        )

    if kategori_filter and kategori_filter != 'semua':
        laporan_list = laporan_list.filter(kategori=kategori_filter)

    if status_filter in ['pending', 'diproses', 'selesai']:
        laporan_list = laporan_list.filter(status=status_filter)

    if sort == 'oldest':
        laporan_list = laporan_list.order_by('created_at')
    elif sort == 'trending':
        laporan_list = laporan_list.order_by('-support_count', '-created_at')
    else:
        laporan_list = laporan_list.order_by('-created_at')

    # Pagination
    from django.core.paginator import Paginator
    paginator = Paginator(laporan_list, 12)  # 12 laporan per halaman
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    supported_ids = set()
    if request.user.is_authenticated:
        supported_ids = set(Dukungan.objects.filter(user=request.user, laporan__in=page_obj.object_list).values_list('laporan_id', flat=True))

    return render(request, 'laporan/semua_laporan.html', {
        'page_obj': page_obj,
        'query': query,
        'kategori_filter': kategori_filter,
        'status_filter': status_filter,
        'sort': sort,
        'kategori_choices': Pengaduan.KATEGORI_CHOICES,
        'status_choices': [('pending', 'Menunggu'), ('diproses', 'Diproses'), ('selesai', 'Selesai')],
        'supported_ids': supported_ids,
    })

@login_required(login_url='/login/')
def riwayat_view(request):
    query = request.GET.get('q', '').strip()
    status_filter = request.GET.get('status', '').strip()
    sort = request.GET.get('sort', 'latest').strip()

    laporan_list = Pengaduan.objects.filter(user=request.user)

    if query:
        laporan_list = laporan_list.filter(
            Q(judul__icontains=query) |
            Q(deskripsi__icontains=query) |
            Q(lokasi_detail__icontains=query)
        )

    if status_filter in ['pending', 'diproses', 'selesai']:
        laporan_list = laporan_list.filter(status=status_filter)

    if sort == 'oldest':
        laporan_list = laporan_list.order_by('created_at')
    else:
        laporan_list = laporan_list.order_by('-created_at')

    return render(request, 'riwayat/riwayat.html', {
        'laporan_list': laporan_list,
        'total_laporan': laporan_list.count(),
        'jumlah_menunggu': laporan_list.filter(status='pending').count(),
        'jumlah_diproses': laporan_list.filter(status='diproses').count(),
        'jumlah_selesai': laporan_list.filter(status='selesai').count(),
        'query': query,
        'status_filter': status_filter,
        'sort': sort,
    })
@login_required(login_url='/login/')
def beri_rating_view(request, laporan_id):
    """
    View untuk memberikan atau mengubah rating laporan
    """
    try:
        laporan = Pengaduan.objects.get(id=laporan_id, user=request.user, status='selesai')
    except Pengaduan.DoesNotExist:
        messages.error(request, 'Laporan tidak ditemukan atau belum selesai diproses.')
        return redirect('riwayat')

    if request.method == 'POST':
        rating = request.POST.get('rating')
        if rating and rating.isdigit():
            rating_value = int(rating)
            if 1 <= rating_value <= 5:
                laporan.rating = rating_value
                laporan.save()
                messages.success(request, 'Rating berhasil diberikan!')
            else:
                messages.error(request, 'Rating harus antara 1-5 bintang.')
        else:
            messages.error(request, 'Rating tidak valid.')

    return redirect('riwayat')
def api_pengaduan(request):
    if request.method == 'POST':
        if not is_same_origin_request(request):
            return JsonResponse({'success': False, 'message': 'Origin tidak diizinkan'}, status=403)

        if not rate_limit_request(request, 'api_pengaduan', max_requests=15, window_seconds=60):
            return JsonResponse({'success': False, 'message': 'Terlalu banyak permintaan, coba lagi nanti.'}, status=429)

        try:
            judul = request.POST.get('judul')
            deskripsi = request.POST.get('deskripsi')
            kategori = request.POST.get('kategori')
            urgensi = request.POST.get('urgensi')
            lokasi_detail = request.POST.get('lokasi_detail', '')
            latitude = request.POST.get('latitude')
            longitude = request.POST.get('longitude')
            is_anonim = request.POST.get('is_anonim') == 'true'
            
            # Handle multiple images using default storage (Supabase bucket)
            gambar_paths = []
            if 'gambar' in request.FILES:
                for uploaded_file in request.FILES.getlist('gambar'):
                    extension = os.path.splitext(uploaded_file.name)[1]
                    filename = f"{uuid.uuid4().hex}{extension}"
                    file_path = f"pengaduan/{filename}"
                    saved_path = default_storage.save(file_path, uploaded_file)
                    gambar_paths.append(saved_path)

            pengaduan = Pengaduan.objects.create(
                judul=judul,
                deskripsi=deskripsi,
                kategori=kategori,
                urgensi=urgensi,
                lokasi_detail=lokasi_detail,
                latitude=float(latitude) if latitude else None,
                longitude=float(longitude) if longitude else None,
                gambar=gambar_paths,
                is_anonim=is_anonim,
                user=request.user if request.user.is_authenticated and not is_anonim else None
            )

            return JsonResponse({
                'success': True,
                'message': 'Laporan berhasil dibuat',
                'id': pengaduan.id
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': str(e)
            }, status=400)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)


@login_required(login_url='/login/')
def dukung_laporan(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            laporan_id = data.get('laporan_id')

            if not laporan_id:
                return JsonResponse({'success': False, 'error': 'laporan_id required'}, status=400)

            try:
                laporan = Pengaduan.objects.get(id=laporan_id)
            except Pengaduan.DoesNotExist:
                return JsonResponse({'success': False, 'error': 'Laporan tidak ditemukan'}, status=404)

            dukungan, created = Dukungan.objects.get_or_create(user=request.user, laporan=laporan)
            support_count = laporan.dukungan.count()
            message = 'Dukungan berhasil disimpan.' if created else 'Anda sudah mendukung laporan ini.'

            return JsonResponse({
                'success': True,
                'supported': True,
                'created': created,
                'support_count': support_count,
                'message': message,
            })
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'JSON tidak valid'}, status=400)
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)

    return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=400)


@login_required(login_url='/login/')
def mark_notifikasi_read(request, notif_id):
    """
    API endpoint untuk menandai notifikasi sebagai sudah dibaca.
    """
    try:
        # Cuma ambil notifikasi yang sesuai ID dan memang milik user yang lagi login
        notifikasi = Notifikasi.objects.get(id=notif_id, penerima=request.user)
        notifikasi.is_read = True
        notifikasi.save()
        return JsonResponse({'success': True, 'message': 'Notifikasi ditandai sebagai dibaca'})
    except Notifikasi.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Notifikasi tidak ditemukan'}, status=404)


@login_required(login_url='/login/')
def notifikasi_status(request):
    """
    API endpoint sederhana untuk mengambil jumlah notifikasi belum dibaca
    dan daftar notifikasi terbaru (maks 10) dalam format JSON.
    """
    notifikasi_qs = Notifikasi.objects.filter(penerima=request.user, is_read=False).order_by('-tanggal_dibuat')[:10]
    notifikasi_list = []
    for n in notifikasi_qs:
        notifikasi_list.append({
            'id': n.id,
            'pesan': n.pesan,
            'tanggal_dibuat': n.tanggal_dibuat.isoformat(),
        })

    return JsonResponse({
        'jumlah_notifikasi': notifikasi_qs.count(),
        'notifikasi': notifikasi_list,
    })


def chatbot_api(request):
    if request.method == 'POST':
        if not is_same_origin_request(request):
            return JsonResponse({'success': False, 'error': 'Origin tidak diizinkan'}, status=403)

        if not rate_limit_request(request, 'chatbot_api', max_requests=20, window_seconds=60):
            return JsonResponse({'success': False, 'error': 'Terlalu banyak permintaan, coba lagi nanti.'}, status=429)

        try:
            data = json.loads(request.body)
            pesan_user = data.get('pesan')

            if not pesan_user:
                return JsonResponse({'success': False, 'error': 'Pesan kosong'})

            normalized_question = pesan_user.strip()
            cache_key = 'chatbot_response:' + hashlib.sha256(normalized_question.encode('utf-8')).hexdigest()
            cached_response = cache.get(cache_key)

            if cached_response:
                return JsonResponse({'success': True, 'balasan': cached_response, 'cached': True})

            # Inisialisasi client baru
            client = genai.Client(api_key=settings.GEMINI_API_KEY)
            
            prompt_system = f"""
            ROLE: 
            Kamu adalah 'MinYuk', asisten virtual resmi aplikasi 'Lapor Yuk!'.
            Lokasi tugasmu adalah di Samarinda, Kalimantan Timur.

            BATASAN KETAT (MANDATORY):
            1. Kamu HANYA boleh menjawab pertanyaan seputar pelaporan masalah publik (jalan rusak, sampah, banjir, dll).
            2. Jika user bertanya di luar topik pengaduan (seperti politik, presiden, artis, harga barang, atau pengetahuan umum lainnya), kamu WAJIB menjawab: 
            'Maaf, sebagai asisten Lapor Yuk!, saya hanya diinstruksikan untuk membantu Anda terkait pengaduan masyarakat di Samarinda. Ada yang bisa saya bantu soal laporan Anda?'
            3. JANGAN berikan informasi presiden, ekonomi, atau berita dunia meskipun kamu tahu jawabannya.

            Pertanyaan User: {pesan_user}
            """
            
            # Pemanggilan model dengan nama yang benar untuk SDK terbaru
            response = client.models.generate_content(
                model="gemini-2.5-flash", 
                contents=prompt_system # Kirim langsung pesan user-nya
            )
            
            cache.set(cache_key, response.text, timeout=60 * 60 * 24)
            return JsonResponse({'success': True, 'balasan': response.text})
            
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)
            
    return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=400)


def nearby_reports(request):
    """
    Get all reports within 100m radius of given coordinates.
    Only return reports in the same category when kategori is provided.
    """
    try:
        latitude = float(request.GET.get('lat', 0))
        longitude = float(request.GET.get('lng', 0))
        kategori_filter = request.GET.get('kategori', '').strip()
        
        if latitude == 0 or longitude == 0:
            return JsonResponse({'success': False, 'reports': []}, status=400)
        
        # Convert 100 meters to approximate degrees (1 degree ≈ 111km at equator)
        # 100m ≈ 0.0009 degrees
        radius_degrees = 0.0009
        
        # Query nearby reports
        nearby = Pengaduan.objects.filter(
            latitude__gte=latitude - radius_degrees,
            latitude__lte=latitude + radius_degrees,
            longitude__gte=longitude - radius_degrees,
            longitude__lte=longitude + radius_degrees,
        ).exclude(latitude__isnull=True, longitude__isnull=True)

        if kategori_filter:
            nearby = nearby.filter(kategori=kategori_filter)
        
        reports_data = []
        for laporan in nearby:
            reports_data.append({
                'id': laporan.id,
                'judul': laporan.judul,
                'latitude': float(laporan.latitude) if laporan.latitude else None,
                'longitude': float(laporan.longitude) if laporan.longitude else None,
                'status': laporan.status,
                'kategori': laporan.kategori,
            })
        
        return JsonResponse({
            'success': True,
            'reports': reports_data,
            'count': len(reports_data),
        })
    except (ValueError, TypeError) as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)


def all_reports(request):
    """
    Return all reports that already have latitude and longitude.
    """
    try:
        nearby = Pengaduan.objects.exclude(latitude__isnull=True).exclude(longitude__isnull=True)

        reports_data = []
        for laporan in nearby:
            reports_data.append({
                'id': laporan.id,
                'judul': laporan.judul,
                'latitude': float(laporan.latitude) if laporan.latitude else None,
                'longitude': float(laporan.longitude) if laporan.longitude else None,
                'status': laporan.status,
            })

        return JsonResponse({
            'success': True,
            'reports': reports_data,
            'count': len(reports_data),
        })
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)