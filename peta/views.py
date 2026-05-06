from django.shortcuts import render
from django.db.models import Q
from laporan.models import Pengaduan
import json


def peta_view(request):
    # Fetch all laporan from database
    laporan_list = Pengaduan.objects.all().order_by('-created_at')
    
    # Transform data for map display
    laporan_map_data = []
    for laporan in laporan_list:
        # Map status to status display and color
        status_mapping = {
            'pending': {'display': 'Menunggu', 'id': 'menunggu', 'color': 'text-red-600', 'dotColor': '#ef4444'},
            'diproses': {'display': 'Diproses', 'id': 'diproses', 'color': 'text-yellow-600', 'dotColor': '#f59e0b'},
            'selesai': {'display': 'Selesai', 'id': 'selesai', 'color': 'text-green-600', 'dotColor': '#10b981'},
        }
        
        status_info = status_mapping.get(laporan.status, status_mapping['pending'])
        
        # Use actual coordinates or default to Jakarta center area
        latitude = laporan.latitude if laporan.latitude else -6.175392
        longitude = laporan.longitude if laporan.longitude else 106.827153
        
        # Add slight variation if both are defaults (to spread markers)
        if not laporan.latitude or not laporan.longitude:
            import random
            latitude += random.uniform(-0.05, 0.05)
            longitude += random.uniform(-0.05, 0.05)
        
        # Get first image or use placeholder
        image_url = f"/media/{laporan.gambar[0]}" if laporan.gambar and len(laporan.gambar) > 0 else "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400"
        
        laporan_data = {
            'id': laporan.id,
            'status': status_info['display'],
            'statusId': status_info['id'],
            'statusColor': status_info['color'],
            'dotColor': status_info['dotColor'],
            'kategori': laporan.get_kategori_display(),
            'waktu': f"{laporan.created_at.strftime('%d %B %Y')}",
            'judul': laporan.judul,
            'jarak': '0.5 km',
            'likes': 0,
            'comments': 0,
            'position': [latitude, longitude],
            'image': image_url,
            'deskripsi': laporan.deskripsi,
            'lokasi': laporan.lokasi_detail,
        }
        laporan_map_data.append(laporan_data)
    
    # Convert to JSON for JavaScript
    laporan_json = json.dumps(laporan_map_data)
    
    return render(request, 'peta.html', {
        'laporan_list': laporan_list,
        'laporan_json': laporan_json,
        'total_laporan': len(laporan_map_data),
    })
