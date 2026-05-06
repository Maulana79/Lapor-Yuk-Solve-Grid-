from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Avg
from .models import Pengaduan
import json

def beranda_view(request):
    kategori_filter = request.GET.get('kategori', '')
    
    # Get all laporan
    laporan_list = Pengaduan.objects.all().order_by('-created_at')
    
    # Filter by kategori if provided
    if kategori_filter and kategori_filter != 'semua':
        laporan_list = laporan_list.filter(kategori=kategori_filter)
    
    # Get 4 latest laporan for display
    laporan_terbaru = laporan_list[:4]
    
    # Calculate statistics
    total_laporan = Pengaduan.objects.count()
    jumlah_diproses = Pengaduan.objects.filter(status='diproses').count()
    jumlah_selesai = Pengaduan.objects.filter(status='selesai').count()
    
    # Calculate average satisfaction rating
    avg_rating = Pengaduan.objects.filter(rating__isnull=False).aggregate(Avg('rating'))['rating__avg']
    tingkat_kepuasan = round((avg_rating / 5 * 100)) if avg_rating else 0
    
    # Kategori choices
    kategori_choices = Pengaduan.KATEGORI_CHOICES
    
    return render(request, 'laporan/beranda.html', {
        'laporan_terbaru': laporan_terbaru,
        'total_laporan': total_laporan,
        'jumlah_diproses': jumlah_diproses,
        'jumlah_selesai': jumlah_selesai,
        'kategori_choices': kategori_choices,
        'kategori_filter': kategori_filter,
        'tingkat_kepuasan': tingkat_kepuasan,
    })

def lapor_view(request):
    return render(request, 'laporan/lapor.html')

def riwayat_view(request):
    laporan_list = Pengaduan.objects.order_by('-created_at')
    return render(request, 'riwayat/riwayat.html', {
        'laporan_list': laporan_list,
        'total_laporan': laporan_list.count(),
        'jumlah_menunggu': laporan_list.filter(status='pending').count(),
        'jumlah_diproses': laporan_list.filter(status='diproses').count(),
        'jumlah_selesai': laporan_list.filter(status='selesai').count(),
    })

@csrf_exempt
def api_pengaduan(request):
    if request.method == 'POST':
        try:
            judul = request.POST.get('judul')
            deskripsi = request.POST.get('deskripsi')
            kategori = request.POST.get('kategori')
            urgensi = request.POST.get('urgensi')
            lokasi_detail = request.POST.get('lokasi_detail', '')
            latitude = request.POST.get('latitude')
            longitude = request.POST.get('longitude')
            is_anonim = request.POST.get('is_anonim') == 'true'
            
            # Handle multiple images
            gambar_paths = []
            if 'gambar' in request.FILES:
                for uploaded_file in request.FILES.getlist('gambar'):
                    # Save file to media/pengaduan/
                    import os
                    from django.conf import settings
                    file_path = os.path.join('pengaduan', uploaded_file.name)
                    full_path = os.path.join(settings.MEDIA_ROOT, file_path)
                    os.makedirs(os.path.dirname(full_path), exist_ok=True)
                    with open(full_path, 'wb+') as destination:
                        for chunk in uploaded_file.chunks():
                            destination.write(chunk)
                    gambar_paths.append(file_path)

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