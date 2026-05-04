import { MapPin, Plus, TrendingUp, Clock, CheckCircle, ThumbsUp, ChevronRight, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  // Data dummy untuk filter kategori
  const categories = ['Semua', 'Jalan Rusak', 'Sampah', 'Lampu Mati', 'Banjir'];

  // Data dummy untuk daftar laporan terkini
  const laporanTerkini = [
    {
      id: 1,
      status: 'Diproses',
      statusColor: 'bg-yellow-100 text-yellow-700',
      dotColor: 'bg-yellow-500',
      kategori: 'Jalan Rusak',
      waktu: '2 jam lalu',
      judul: 'Jalan Berlubang Besar di Jl. Sudirman',
      lokasi: 'Jl. Sudirman No. 45, Jakarta Pu...',
      pelapor: 'Ahmad S.',
      likes: 24,
      comments: 8,
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 2,
      status: 'Menunggu',
      statusColor: 'bg-red-100 text-red-700',
      dotColor: 'bg-red-500',
      kategori: 'Sampah',
      waktu: '5 jam lalu',
      judul: 'Tumpukan Sampah Menggunung di Pasar',
      lokasi: 'Jl. Raya Pasar Minggu, Jakarta Sela...',
      pelapor: 'Siti M.',
      likes: 42,
      comments: 15,
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 3,
      status: 'Selesai',
      statusColor: 'bg-green-100 text-green-700',
      dotColor: 'bg-green-500',
      kategori: 'Lampu Mati',
      waktu: '1 hari lalu',
      judul: 'Lampu Jalan Mati di Depan SDN 05',
      lokasi: 'Jl. Kebon Jeruk Raya, Jakarta B...',
      pelapor: 'Budi P.',
      likes: 18,
      comments: 5,
      image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 4,
      status: 'Diproses',
      statusColor: 'bg-yellow-100 text-yellow-700',
      dotColor: 'bg-yellow-500',
      kategori: 'Banjir',
      waktu: '3 jam lalu',
      judul: 'Genangan Banjir Setinggi Lutut',
      lokasi: 'Jl. Kemang Raya, Jakarta Sela...',
      pelapor: 'Dewi R.',
      likes: 56,
      comments: 22,
      image: 'https://images.unsplash.com/photo-1542082873-c1d3f9e9beaf?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="pb-12 bg-gray-50 min-h-screen">
      
      {/* 1. Header Hijau */}
      <div className="bg-[#00B27A] pt-8 pb-24 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-white/90 mb-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold border border-white/30">
                BS
              </div>
              <span className="text-sm font-medium">Selamat pagi 🌅</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Budi Santoso</h1>
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/20 backdrop-blur-sm">
              <MapPin size={16} /> Kec. Menteng, Jakarta Pusat
            </div>
          </div>
          <Link to="/lapor" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-3 rounded-xl font-semibold transition-all border border-white/30 backdrop-blur-sm shadow-sm hover:shadow-md">
            <div className="bg-white/30 p-1 rounded-md"><Plus size={16} /></div>
            Buat Laporan Baru <span className="ml-1 text-lg leading-none">↗</span>
          </Link>
        </div>
      </div>

      {/* 2. Card Statistik */}
      <div className="px-6 md:px-12 -mt-12 relative z-10 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Laporan */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-[#00B27A]"><TrendingUp size={28} /></div>
            <div><h3 className="text-3xl font-bold text-gray-800">247</h3><p className="text-sm text-gray-500 font-medium">Total Laporan</p></div>
          </div>
          {/* Sedang Diproses */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"><Clock size={28} /></div>
            <div><h3 className="text-3xl font-bold text-gray-800">32</h3><p className="text-sm text-gray-500 font-medium">Sedang Diproses</p></div>
          </div>
          {/* Sudah Selesai */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-b-4 border-b-blue-500 flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><CheckCircle size={28} /></div>
            <div><h3 className="text-3xl font-bold text-gray-800">189</h3><p className="text-sm text-gray-500 font-medium">Sudah Selesai</p></div>
          </div>
          {/* Tingkat Kepuasan */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-b-4 border-b-purple-500 flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-purple-500"><ThumbsUp size={28} /></div>
            <div><h3 className="text-3xl font-bold text-gray-800">96%</h3><p className="text-sm text-gray-500 font-medium">Tingkat Kepuasan</p></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto space-y-10">
        
        {/* 3. Kategori */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Kategori</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat, index) => (
              <button 
                key={index} 
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  index === 0 
                    ? 'bg-[#00B27A] text-white border-[#00B27A]' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Peta Laporan Mini */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Peta Laporan</h2>
          <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden shadow-sm group">
            {/* Placeholder Map Image */}
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" alt="Map Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
            
            {/* Map Overlay Content */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="text-white">
                <div className="flex items-center gap-1.5 font-bold text-lg">
                  <MapPin size={20} className="text-[#00B27A]" /> Laporan Sekitarmu
                </div>
                <p className="text-white/80 text-sm ml-6">12 laporan dalam radius 2 km</p>
              </div>
              <Link to="/maps" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors border border-white/30">
                Buka Peta <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* 5. Banner CTA */}
        <div className="bg-gradient-to-r from-[#00B27A] to-[#009465] rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm text-white">
          <div>
            <h2 className="text-2xl font-bold mb-2">Lihat masalah di kotamu?</h2>
            <p className="text-white/90">Laporkan sekarang dan bantu pemerintah merespon lebih cepat.</p>
          </div>
          <Link to="/lapor" className="bg-white text-[#00B27A] hover:bg-gray-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-colors whitespace-nowrap">
            <Plus size={18} /> Buat Laporan
          </Link>
        </div>

        {/* 6. Laporan Terkini */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">Laporan Terkini 🔥</h2>
            <Link to="/riwayat" className="text-[#00B27A] text-sm font-semibold flex items-center hover:underline">
              Lihat semua <ChevronRight size={16} />
            </Link>
          </div>
          
          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {laporanTerkini.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                
                {/* Image & Overlays */}
                <div className="relative h-48 w-full">
                  <img src={item.image} alt={item.judul} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 bg-white shadow-sm`}>
                      <span className={`w-2 h-2 rounded-full ${item.dotColor}`}></span>
                      <span className="text-gray-700">{item.status}</span>
                    </span>
                    <span className="text-white text-xs font-semibold drop-shadow-md">{item.waktu}</span>
                  </div>
                  
                  {/* Bottom Badge (Kategori) */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {item.kategori}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 text-lg leading-tight mb-2 line-clamp-1">{item.judul}</h3>
                  <div className="flex items-start gap-1.5 text-gray-500 text-sm mb-4">
                    <MapPin size={16} className="mt-0.5 shrink-0" />
                    <span className="line-clamp-1">{item.lokasi}</span>
                  </div>
                  
                  <p className="text-xs text-gray-400 mb-4">Dilaporkan oleh {item.pelapor}</p>
                  
                  {/* Card Footer (Actions) */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-4 text-gray-500">
                      <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                        <Heart size={18} /> <span className="text-sm">{item.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                        <MessageCircle size={18} /> <span className="text-sm">{item.comments}</span>
                      </button>
                    </div>
                    <button className="flex items-center gap-1.5 text-[#00B27A] bg-green-50 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-100 transition-colors">
                      <Share2 size={16} /> Share
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}