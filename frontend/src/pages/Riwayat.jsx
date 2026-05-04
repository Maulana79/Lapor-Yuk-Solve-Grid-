import { 
  Search, Filter, MapPin, Calendar, 
  Clock, AlertTriangle, CheckCircle, TrendingUp, 
  TrendingDown, Heart, MessageCircle, ChevronDown 
} from 'lucide-react';

export default function Riwayat() {
  // Data dummy laporan untuk halaman Riwayat
  const riwayatLaporan = [
    {
      id: 1,
      tanggalGrup: 'Hari Ini',
      jumlah: 2,
      items: [
        {
          id: 101,
          status: 'Menunggu',
          statusColor: 'text-red-600',
          dotColor: 'bg-red-500',
          kategori: 'Sampah',
          waktu: '5 jam lalu',
          judul: 'Tumpukan Sampah Menggunung di Pasar',
          lokasi: 'Jl. Raya Pasar Minggu, Jakarta Sel...',
          likes: 42,
          comments: 15,
          image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600'
        },
        {
          id: 102,
          status: 'Diproses',
          statusColor: 'text-yellow-600',
          dotColor: 'bg-yellow-500',
          kategori: 'Jalan Rusak',
          waktu: '2 jam lalu',
          judul: 'Jalan Berlubang Besar di Jl. Sudirman',
          lokasi: 'Jl. Sudirman No. 45, Jakarta Pu...',
          likes: 24,
          comments: 8,
          image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=600'
        }
      ]
    },
    {
      id: 2,
      tanggalGrup: 'Kemarin',
      jumlah: 2,
      items: [
        {
          id: 201,
          status: 'Diproses',
          statusColor: 'text-yellow-600',
          dotColor: 'bg-yellow-500',
          kategori: 'Banjir',
          waktu: '1 hari lalu',
          judul: 'Genangan Banjir Setinggi Lutut',
          lokasi: 'Jl. Kemang Raya, Jakarta Sela...',
          likes: 56,
          comments: 22,
          image: 'https://images.unsplash.com/photo-1542082873-c1d3f9e9beaf?auto=format&fit=crop&q=80&w=600'
        },
        {
          id: 202,
          status: 'Selesai',
          statusColor: 'text-green-600',
          dotColor: 'bg-green-500',
          kategori: 'Lampu Mati',
          waktu: '1 hari lalu',
          judul: 'Lampu Jalan Mati di Depan SDN 05',
          lokasi: 'Jl. Kebon Jeruk Raya, Jakarta B...',
          likes: 18,
          comments: 5,
          image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=600'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. Header Section */}
      <div className="bg-gradient-to-r from-[#009465] to-[#00B27A] pt-8 pb-20 px-6 md:px-12 rounded-b-[2.5rem] shadow-sm">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Riwayat Laporan</h1>
            <span className="text-2xl">📋</span>
          </div>
          <p className="text-white/80 font-medium mb-8">Pantau semua laporan di sekitarmu dan aktivitas selama sebulan terakhir</p>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3">
            <button className="bg-white text-[#00B27A] px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm">
              <MapPin size={18} /> 
              <div className="text-left leading-tight">
                <div className="text-sm">Di Sekitarmu</div>
                <div className="text-[10px] text-gray-500 font-medium">Radius 5 km</div>
              </div>
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-colors">
              <Calendar size={18} /> 
              <div className="text-left leading-tight">
                <div className="text-sm">1 Bulan Terakhir</div>
                <div className="text-[10px] text-white/70 font-medium">18 Mar - 17 Apr</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 -mt-10 relative z-10">
        
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-gray-700">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-3xl font-bold text-gray-800">5</h3>
              <TrendingUp size={20} className="text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 font-bold mb-2 uppercase">Total Laporan</p>
            <div className="flex items-center gap-1 text-xs font-bold text-green-500">
              <TrendingUp size={14} /> +12% <span className="text-gray-400 font-medium ml-1">vs bulan lalu</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-red-500">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-3xl font-bold text-gray-800">2</h3>
              <AlertTriangle size={20} className="text-red-400" />
            </div>
            <p className="text-xs text-gray-500 font-bold mb-2 uppercase">Menunggu</p>
            <div className="flex items-center gap-1 text-xs font-bold text-red-500">
              <TrendingDown size={14} /> -8% <span className="text-gray-400 font-medium ml-1">vs bulan lalu</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-yellow-500">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-3xl font-bold text-gray-800">2</h3>
              <Clock size={20} className="text-yellow-500" />
            </div>
            <p className="text-xs text-gray-500 font-bold mb-2 uppercase">Sedang Diproses</p>
            <div className="flex items-center gap-1 text-xs font-bold text-green-500">
              <TrendingUp size={14} /> +5% <span className="text-gray-400 font-medium ml-1">vs bulan lalu</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-[#00B27A]">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-3xl font-bold text-gray-800">1</h3>
              <CheckCircle size={20} className="text-[#00B27A]" />
            </div>
            <p className="text-xs text-gray-500 font-bold mb-2 uppercase">Selesai</p>
            <div className="flex items-center gap-1 text-xs font-bold text-green-500">
              <TrendingUp size={14} /> +18% <span className="text-gray-400 font-medium ml-1">vs bulan lalu</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center shadow-sm">
            <Search size={20} className="text-gray-400 mr-3 shrink-0" />
            <input 
              type="text" 
              placeholder="Cari laporan, lokasi, atau kategori..." 
              className="w-full bg-transparent border-none outline-none text-gray-700 text-sm"
            />
          </div>
          <div className="flex gap-3">
            <button className="bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 shadow-sm transition-colors">
              <Filter size={16} /> Filter
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 shadow-sm transition-colors">
              <Clock size={16} /> Terbaru <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>

        {/* Info Text */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500 font-medium">Menampilkan <span className="font-bold text-gray-800">5</span> laporan</p>
          <div className="flex items-center gap-1.5 text-sm font-bold text-[#00B27A]">
            <MapPin size={16} /> Kec. Menteng, Jakarta Pusat
          </div>
        </div>

        {/* Laporan List Grouped by Date */}
        <div className="space-y-8">
          {riwayatLaporan.map((grup) => (
            <div key={grup.id}>
              {/* Date Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white border border-gray-200 px-4 py-1.5 rounded-lg text-sm font-bold text-gray-700 flex items-center gap-2 shadow-sm">
                  <Calendar size={16} className="text-gray-400" />
                  {grup.tanggalGrup}
                  <span className="text-gray-400 font-medium ml-1">({grup.jumlah})</span>
                </div>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              {/* Cards List */}
              <div className="space-y-4">
                {grup.items.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-5 hover:shadow-md transition-shadow">
                    
                    {/* Image Thumbnail */}
                    <div className="relative w-full sm:w-40 h-40 sm:h-auto rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.judul} className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-gray-800 px-2.5 py-1 rounded-md text-xs font-bold shadow-sm">
                        {item.kategori}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${item.dotColor}`}></span>
                          <span className={`text-xs font-bold ${item.statusColor}`}>{item.status}</span>
                        </div>
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                          <Clock size={12} /> {item.waktu}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-gray-800 text-lg leading-snug mb-2">{item.judul}</h3>
                      <div className="flex items-start gap-1.5 text-gray-500 text-sm mb-4">
                        <MapPin size={16} className="mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{item.lokasi}</span>
                      </div>
                      
                      {/* Footer Actions */}
                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-5 text-gray-400">
                          <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                            <Heart size={16} /> <span className="text-xs font-bold">{item.likes}</span>
                          </button>
                          <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                            <MessageCircle size={16} /> <span className="text-xs font-bold">{item.comments}</span>
                          </button>
                        </div>
                        <button className="text-xs font-bold text-[#00B27A] bg-green-50 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors">
                          Lihat Detail
                        </button>
                      </div>
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}