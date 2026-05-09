from django.shortcuts import render
from django.db.models import Q
from laporan.models import Pengaduan
import json
import math


def calculate_distance(lat1, lon1, lat2, lon2):
    """
    Calculate distance between two coordinates using Haversine formula
    Returns distance in kilometers
    """
    # Convert to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    # Haversine formula
    dlon = lon2_rad - lon1_rad
    dlat = lat2_rad - lat1_rad
    a = math.sin(dlat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    distance = 6371 * c  # Earth's radius in km

    return distance


def peta_view(request):
    # Fetch all laporan from database
    laporan_list = Pengaduan.objects.all().order_by('-created_at')

    # Samarinda center coordinates
    samarinda_lat = -0.5021
    samarinda_lon = 117.1536

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

        # Use actual coordinates or default to Samarinda center area
        latitude = laporan.latitude if laporan.latitude else -0.5021
        longitude = laporan.longitude if laporan.longitude else 117.1536

        # Add slight variation if both are defaults (to spread markers)
        if not laporan.latitude or not laporan.longitude:
            import random
            latitude += random.uniform(-0.05, 0.05)
            longitude += random.uniform(-0.05, 0.05)

        # Calculate distance from Samarinda center
        distance = calculate_distance(samarinda_lat, samarinda_lon, latitude, longitude)

        # Format distance display
        if distance < 1:
            jarak_display = f"{distance*1000:.0f} m"
        else:
            jarak_display = f"{distance:.1f} km"

        # Get first image or use placeholder
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
    
    # Convert to JSON for JavaScript
    laporan_json = json.dumps(laporan_map_data)
    
    return render(request, 'peta.html', {
        'laporan_list': laporan_list,
        'laporan_json': laporan_json,
        'total_laporan': len(laporan_map_data),
    })
