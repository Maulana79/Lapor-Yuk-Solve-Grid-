import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { 
  Search, X, Layers, Plus, Minus, Crosshair, 
  Flame, Heart, MessageCircle, Share2, MapPin 
} from 'lucide-react';

// Membuat icon kustom (lingkaran dengan border putih) menggunakan divIcon Leaflet
const createMarkerIcon = (colorCode) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${colorCode}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10], // Titik tengah icon
  });
};

const icons = {
  menunggu: createMarkerIcon('#ef4444'),   // Merah
  diproses: createMarkerIcon('#f59e0b'),   // Kuning/Oranye
  selesai: createMarkerIcon('#10b981'),    // Hijau
};

export default function Maps() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Semua');

  // Posisi tengah awal peta (Misal: Monas, Jakarta)
  const centerPosition = [-6.175392, 106.827153];

  const categories = ['Semua', 'Jalan Rusak', 'Sampah', 'Lampu Mati', 'Banjir'];

  const laporanData = [
    {
      id: 1,
      status: 'Diproses',
      statusId: 'diproses',
      statusColor: 'text-yellow-600',
      dotColor: 'bg-yellow-500',
      kategori: 'Jalan Rusak',
      waktu: '2 jam lalu',
      judul: 'Jalan Berlubang Besar di Jl. Sudirman',
      jarak: '0.3 km',
      likes: 24,
      comments: 8,
      position: [-6.180000, 106.820000],
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 2,
      status: 'Menunggu',
      statusId: 'menunggu',
      statusColor: 'text-red-600',
      dotColor: 'bg-red-500',
      kategori: 'Sampah',
      waktu: '5 jam lalu',
      judul: 'Tumpukan Sampah Menggunung',
      jarak: '1.2 km',
      likes: 42,
      comments: 15,
      position: [-6.170000, 106.835000],
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 3,
      status: 'Selesai',
      statusId: 'selesai',
      statusColor: 'text-green-600',
      dotColor: 'bg-green-500',
      kategori: 'Lampu Mati',
      waktu: '1 hari lalu',
      judul: 'Lampu Jalan Mati di Depan SDN 05',
      jarak: '0.8 km',
      likes: 18,
      comments: 5,
      position: [-6.185000, 106.830000],
      image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    // Kurangi tinggi navbar (asumsi ~70px) agar peta tidak tembus batas bawah layar
    <div className="relative w-full h-[calc(100vh-70px)] bg-gray-100 overflow-hidden font-sans">
      
      {/* 1. LAYER PETA (Leaflet) */}
      <div className="absolute inset-0 z-0">
        <MapContainer 
          center={centerPosition} 
          zoom={14} 
          style={{ width: '100%', height: '100%' }}
          zoomControl={false} // Matikan zoom control bawaan agar bisa diganti dengan buatan sendiri
        >
          {/* Menggunakan Map Tile dari CartoDB (varian Positron) yang warnanya soft/bersih seperti desain */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {/* Render Marker Berdasarkan Data */}
          {laporanData.map((laporan) => (
            <Marker 
              key={laporan.id} 
              position={laporan.position} 
              icon={icons[laporan.statusId]}
            >
              {/* Pop-up kecil saat marker di-klik */}
              <Popup className="rounded-xl overflow-hidden">
                <div className="text-center p-1">
                  <h4 className="font-bold text-gray-800 text-sm mb-1">{laporan.judul}</h4>
                  <span className={`text-xs font-bold ${laporan.statusColor}`}>{laporan.status}</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* 2. LAYER KONTROL PETA (Floating Kanan & Bawah) */}
      <div className="absolute top-6 left-6 z-10">
        <button className="bg-white p-3 rounded-xl shadow-md text-gray-700 hover:text-[#00B27A] transition-colors">
          <Layers size={24} />
        </button>
      </div>

      <div className="absolute top-6 right-6 z-10 flex flex-col gap-3">
        <div className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
          <button className="p-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 transition-colors">
            <Plus size={24} />
          </button>
          <button className="p-3 text-gray-700 hover:bg-gray-50 transition-colors">
            <Minus size={24} />
          </button>
        </div>
        <button className="bg-white p-3 rounded-xl shadow-md text-gray-700 hover:text-[#00B27A] transition-colors">
          <Crosshair size={24} />
        </button>
      </div>

      <div className="absolute bottom-8 right-6 z-10">
        <button className="bg-white px-5 py-3 rounded-xl shadow-md text-gray-700 font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
          <Flame size={20} className="text-gray-400" /> Heatmap
        </button>
      </div>

      <div className="absolute bottom-8 left-6 md:left-[420px] z-10 transition-all duration-300">
        <div className="bg-white p-5 rounded-2xl shadow-md w-64">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-gray-800 text-sm">Keterangan</h4>
            <button className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
          </div>
          <div className="space-y-3 text-sm text-gray-600 font-medium">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white shadow-sm shrink-0"></span>
              Menunggu Ditangani
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 bg-yellow-500 rounded-full border-2 border-white shadow-sm shrink-0"></span>
              Sedang Diproses
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm shrink-0"></span>
              Selesai Diperbaiki
            </div>
          </div>
        </div>
      </div>

      {/* 3. LAYER SIDEBAR KIRI (Laporan Terkini) */}
      <div className={`absolute top-0 left-0 h-full w-full md:w-[400px] bg-white shadow-2xl z-20 flex flex-col transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-100 shrink-0">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Laporan Terkini</h2>
              <p className="text-sm text-gray-500">6 laporan ditemukan</p>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="bg-gray-100 p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors md:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Box */}
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4">
            <Search size={20} className="text-gray-400 mr-3 shrink-0" />
            <input 
              type="text" 
              placeholder="Cari lokasi atau jenis laporan..." 
              className="w-full bg-transparent border-none outline-none text-gray-700 text-sm"
            />
          </div>

          {/* Categories/Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  activeFilter === cat 
                    ? 'bg-[#00B27A] text-white border-[#00B27A]' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {laporanData.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 hover:border-[#00B27A]/30 transition-colors cursor-pointer group">
              
              {/* Thumbnail */}
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${item.dotColor}`}></span>
                    <span className={`text-[10px] font-bold ${item.statusColor} uppercase tracking-wider`}>{item.status}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-semibold">{item.waktu}</span>
                </div>
                
                <h3 className="font-bold text-gray-800 text-sm leading-snug mb-2 line-clamp-2">{item.judul}</h3>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
                    <MapPin size={12} /> {item.jarak}
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="flex items-center gap-1"><Heart size={12} /> <span className="text-[10px] font-bold">{item.likes}</span></div>
                    <div className="flex items-center gap-1"><MessageCircle size={12} /> <span className="text-[10px] font-bold">{item.comments}</span></div>
                    <Share2 size={12} className="ml-1 hover:text-[#00B27A]" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Tombol Buka Sidebar (Hanya muncul jika sidebar ditutup di versi Mobile) */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-6 left-6 z-10 bg-[#00B27A] text-white p-3 rounded-xl shadow-lg flex items-center gap-2 font-bold text-sm"
        >
          <Search size={18} /> Cari Laporan
        </button>
      )}

    </div>
  );
}