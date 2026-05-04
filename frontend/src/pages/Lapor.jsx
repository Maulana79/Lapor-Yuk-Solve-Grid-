import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import { 
  FileText, Camera, MapPin, AlignLeft, Send, 
  ChevronLeft, ChevronRight, Check,
  AlertTriangle, Trash2, Lightbulb, Droplets, TreePine, Zap, Flame, Info,
  UploadCloud, Image as ImageIcon, Star, Search, Shield, Edit3
} from 'lucide-react';

export default function Lapor() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Data Form Laporan
  const [selectedCategory, setSelectedCategory] = useState('');
  const [urgensi, setUrgensi] = useState('');
  const [isAnonim, setIsAnonim] = useState(false);

  const categories = [
    { id: 'jalan', title: 'Jalan Rusak', desc: 'Lubang, retak, aspal rusak', icon: <AlertTriangle size={24} />, bgIcon: 'bg-orange-500', bgCard: 'bg-orange-50' },
    { id: 'sampah', title: 'Sampah', desc: 'Tumpukan sampah, TPA ilegal', icon: <Trash2 size={24} />, bgIcon: 'bg-orange-500', bgCard: 'bg-white' },
    { id: 'lampu', title: 'Lampu Mati', desc: 'PJU mati, traffic light rusak', icon: <Lightbulb size={24} />, bgIcon: 'bg-blue-500', bgCard: 'bg-white' },
    { id: 'banjir', title: 'Banjir', desc: 'Genangan, drainase tersumbat', icon: <Droplets size={24} />, bgIcon: 'bg-blue-500', bgCard: 'bg-white' },
    { id: 'pohon', title: 'Pohon Tumbang', desc: 'Pohon roboh, dahan menggantung', icon: <TreePine size={24} />, bgIcon: 'bg-green-500', bgCard: 'bg-white' },
    { id: 'listrik', title: 'Listrik/Kabel', desc: 'Kabel menjuntai, tiang miring', icon: <Zap size={24} />, bgIcon: 'bg-yellow-500', bgCard: 'bg-white' },
    { id: 'kebakaran', title: 'Kebakaran', desc: 'Titik api, bahaya kebakaran', icon: <Flame size={24} />, bgIcon: 'bg-red-500', bgCard: 'bg-white' },
    { id: 'lainnya', title: 'Lainnya', desc: 'Kategori tidak tercantum', icon: <Info size={24} />, bgIcon: 'bg-gray-500', bgCard: 'bg-white' },
  ];

  const urgensiList = [
    { id: 'rendah', title: 'Rendah', desc: 'Tidak mendesak, bisa ditangani dalam beberapa minggu', icon: <Info size={20} />, color: 'text-gray-500', border: 'border-gray-200 hover:border-gray-300', bgActive: 'bg-gray-50 border-gray-400' },
    { id: 'sedang', title: 'Sedang', desc: 'Perlu ditangani dalam beberapa hari', icon: <AlertTriangle size={20} />, color: 'text-yellow-500', border: 'border-yellow-200 hover:border-yellow-300', bgActive: 'bg-yellow-50/50 border-yellow-400' },
    { id: 'tinggi', title: 'Tinggi', desc: 'Mendesak, berpotensi bahaya jika dibiarkan', icon: <AlertTriangle size={20} />, color: 'text-orange-500', border: 'border-orange-200 hover:border-orange-300', bgActive: 'bg-orange-50/50 border-orange-400' },
    { id: 'darurat', title: 'Darurat', desc: 'Sangat berbahaya, butuh penanganan segera', icon: <AlertTriangle size={20} />, color: 'text-red-500', border: 'border-red-200 hover:border-red-300', bgActive: 'bg-red-50 border-red-500' },
  ];

  const stepperIcons = [
    <FileText size={20} key="1" />, <Camera size={20} key="2" />, 
    <MapPin size={20} key="3" />, <AlignLeft size={20} key="4" />, <Send size={20} key="5" />
  ];

  const handleNext = () => {
    if (currentStep === 1 && !selectedCategory) return alert("Pilih kategori dulu, ya!");
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Logika ketika tombol "Kirim Laporan" ditekan di Step 5
      alert("Laporan berhasil dikirim! Nanti ini akan nyambung ke API Django.");
      navigate('/'); // Pindah kembali ke halaman Beranda
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else navigate('/');
  };

  // Fungsi untuk mendapatkan data kategori yang sedang dipilih (untuk Step 5)
  const getSelectedCategoryData = () => {
    return categories.find(c => c.id === selectedCategory) || categories[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      {/* 1. Header & Stepper */}
      <div className="bg-gradient-to-r from-[#009465] to-[#00B27A] pt-8 pb-12 px-6 md:px-12 rounded-b-[2.5rem] shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Buat Laporan Baru 📝</h1>
          <p className="text-white/80 font-medium mb-10">Laporkan masalah di sekitarmu dalam 5 langkah mudah</p>

          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/20 rounded-full z-0"></div>
            {stepperIcons.map((icon, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isPassed = stepNumber < currentStep;

              return (
                <div key={stepNumber} className="relative z-10 flex items-center bg-[#009465] px-2 py-1">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'bg-white/30 text-white shadow-lg border border-white/50 backdrop-blur-md scale-110' 
                             : isPassed ? 'bg-white text-[#00B27A] shadow-md' : 'bg-white/10 text-white/50'
                  }`}>
                    {isPassed ? <Check size={20} strokeWidth={3} /> : icon}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mt-8">
        
        {/* === STEP 1: PILIH KATEGORI === */}
        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Pilih Kategori Laporan</h2>
            <p className="text-gray-500 mb-8">Pilih kategori yang paling sesuai dengan masalah yang ingin dilaporkan</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                  className={`relative flex items-center gap-4 p-5 rounded-2xl text-left transition-all border-2 ${selectedCategory === cat.id ? 'border-orange-500 bg-orange-50/50 shadow-md' : 'border-transparent bg-white shadow-sm hover:shadow-md hover:border-gray-200'}`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shrink-0 ${cat.bgIcon}`}>{cat.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-1">{cat.title}</h3>
                    <p className="text-sm text-gray-500">{cat.desc}</p>
                  </div>
                  {selectedCategory === cat.id && <div className="absolute top-3 right-3 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-sm"><Check size={14} className="text-white" strokeWidth={3} /></div>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* === STEP 2: UPLOAD FOTO === */}
        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Foto Bukti</h2>
            <p className="text-gray-500 mb-8">Tambahkan foto untuk memperkuat laporanmu (maks. 5 foto)</p>
            <div className="border-2 border-dashed border-gray-300 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center bg-white hover:bg-gray-50 transition-colors cursor-pointer mb-8 group">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-[#00B27A] mb-4 group-hover:scale-110 transition-transform"><UploadCloud size={32} /></div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Drag & drop foto di sini</h3>
              <p className="text-gray-500 text-sm mb-6">atau klik untuk pilih dari galeri</p>
              <button className="bg-white border-2 border-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
                <Camera size={20} /> Ambil Foto Langsung
              </button>
            </div>
          </div>
        )}

        {/* === STEP 3: LOKASI KEJADIAN === */}
        {currentStep === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Tentukan Lokasi</h2>
            <p className="text-gray-500 mb-8">Pilih titik lokasi masalah pada peta agar petugas mudah menemukan</p>
            <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4">
                <Search size={20} className="text-gray-400 mr-3" />
                <input type="text" placeholder="Cari alamat atau nama jalan..." className="w-full bg-transparent border-none outline-none text-gray-700 text-sm" />
              </div>
              
              {/* AREA PETA INTERAKTIF */}
              <div className="w-full h-80 bg-gray-200 rounded-2xl overflow-hidden relative border border-gray-200">
                {/* Komponen Peta Asli */}
                <MapContainer 
                  center={[-6.175392, 106.827153]} 
                  zoom={15} 
                  style={{ width: '100%', height: '100%' }}
                  zoomControl={false}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  />
                </MapContainer>

                {/* Pin Overlay (Fix di tengah layar) */}
                {/* z-[400] diperlukan agar pin berada di atas layer peta Leaflet, pointer-events-none agar mouse tembus ke peta di bawahnya */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-[400]">
                  <div className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg font-bold text-sm mb-2 whitespace-nowrap">
                    Geser peta untuk menentukan titik
                  </div>
                  <MapPin size={40} className="text-red-500 drop-shadow-md -mt-1" fill="currentColor" />
                </div>
              </div>
              {/* END AREA PETA */}

            </div>
          </div>
        )}

        {/* === STEP 4: DETAIL LAPORAN === */}
        {currentStep === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Detail Laporan</h2>
            <p className="text-gray-500 mb-8">Jelaskan masalah sejelas mungkin agar cepat ditangani</p>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-gray-800">Judul Laporan <span className="text-red-500">*</span></label>
                  <span className="text-xs text-gray-400 font-medium">0/100</span>
                </div>
                <input type="text" placeholder="Contoh: Jalan berlubang besar di depan kantor pos" className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B27A]/20 focus:border-[#00B27A] transition-all shadow-sm" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-gray-800">Deskripsi Lengkap <span className="text-red-500">*</span></label>
                  <span className="text-xs text-gray-400 font-medium">0/500</span>
                </div>
                <textarea rows="5" placeholder="Jelaskan detail masalah: sejak kapan, seberapa parah, dampak ke warga sekitar..." className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B27A]/20 focus:border-[#00B27A] transition-all shadow-sm resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">Tingkat Urgensi <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {urgensiList.map((item) => (
                    <button key={item.id} onClick={() => setUrgensi(item.id)} className={`flex items-start gap-4 p-4 rounded-xl text-left border transition-all ${urgensi === item.id ? item.bgActive : `bg-white ${item.border}`}`}>
                      <div className={`mt-0.5 ${urgensi === item.id ? item.color : 'text-gray-400'}`}>{item.icon}</div>
                      <div>
                        <h4 className={`text-sm font-bold mb-1 ${urgensi === item.id ? item.color : 'text-gray-700'}`}>{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500"><Shield size={20} /></div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Lapor Secara Anonim</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Nama kamu tidak akan ditampilkan di laporan</p>
                  </div>
                </div>
                <button onClick={() => setIsAnonim(!isAnonim)} className={`relative w-12 h-7 rounded-full transition-colors ${isAnonim ? 'bg-[#00B27A]' : 'bg-gray-300'}`}>
                  <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${isAnonim ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === STEP 5: TINJAUAN & KIRIM === */}
        {currentStep === 5 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-[#00B27A] mx-auto mb-4 shadow-sm border border-green-200">
                <Send size={36} className="ml-1" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Tinjau Laporanmu</h2>
              <p className="text-gray-500">Pastikan semua data sudah benar sebelum dikirim ke instansi terkait.</p>
            </div>

            {/* Kotak Ringkasan */}
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 divide-y divide-gray-100">
              
              {/* Kategori Info */}
              <div className="pb-5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${getSelectedCategoryData().bgIcon}`}>
                    {getSelectedCategoryData().icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Kategori</p>
                    <h4 className="font-bold text-gray-800">{getSelectedCategoryData().title}</h4>
                  </div>
                </div>
                <button onClick={() => setCurrentStep(1)} className="text-[#00B27A] text-sm font-bold flex items-center gap-1 hover:underline"><Edit3 size={16}/> Ubah</button>
              </div>

              {/* Lokasi Info */}
              <div className="py-5 flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-500 font-bold mb-2 uppercase tracking-wider">Lokasi Kejadian</p>
                  <div className="flex items-start gap-2">
                    <MapPin size={18} className="text-red-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700 font-medium">Jl. Jend. Sudirman No. 45, Kecamatan Menteng, Jakarta Pusat, DKI Jakarta (Contoh Data)</p>
                  </div>
                </div>
                <button onClick={() => setCurrentStep(3)} className="text-[#00B27A] text-sm font-bold flex items-center gap-1 hover:underline shrink-0 ml-4"><Edit3 size={16}/> Ubah</button>
              </div>

              {/* Detail Info */}
              <div className="py-5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Detail Masalah</p>
                  <button onClick={() => setCurrentStep(4)} className="text-[#00B27A] text-sm font-bold flex items-center gap-1 hover:underline"><Edit3 size={16}/> Ubah</button>
                </div>
                <h4 className="font-bold text-gray-800 text-lg mb-2">Jalan berlubang besar di depan minimarket</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">Lubangnya cukup dalam dan sering tertutup genangan air kalau hujan. Sudah ada beberapa motor yang hampir jatuh karena tidak melihat lubang tersebut.</p>
                
                <div className="flex gap-2">
                  <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-bold border border-red-100 flex items-center gap-1">
                    <AlertTriangle size={14}/> Tingkat Urgensi: {urgensi || 'Belum dipilih'}
                  </span>
                  {isAnonim && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold border border-gray-200 flex items-center gap-1">
                      <Shield size={14}/> Identitas Anonim
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* 3. Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 md:px-12 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          
          <button onClick={handleBack} className="px-5 py-3 text-gray-500 font-semibold rounded-xl hover:bg-gray-50 flex items-center gap-2 transition-colors">
            <ChevronLeft size={20} /> <span className="hidden sm:inline">Kembali</span>
          </button>

          {/* Indikator Titik */}
          <div className="hidden md:flex gap-2">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div key={dot} className={`w-2.5 h-2.5 rounded-full transition-all ${dot === currentStep ? 'bg-[#00B27A] w-6' : 'bg-gray-200'}`}></div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {currentStep === 2 && (
              <button onClick={handleNext} className="px-5 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors flex items-center gap-1">Lewati <ChevronRight size={18} /></button>
            )}

            <button onClick={handleNext}
              className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm ${
                currentStep === 1 && !selectedCategory ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 
                currentStep === 4 ? 'bg-[#80D9BD] text-white hover:bg-[#00B27A]' : 'bg-[#00B27A] hover:bg-[#009968] text-white shadow-md'
              }`}
            >
              {currentStep === 4 ? 'Tinjau Laporan' : currentStep === 5 ? 'Kirim Laporan' : 'Lanjutkan'} 
              {currentStep !== 5 && <ChevronRight size={20} />}
            </button>
          </div>
          
        </div>
      </div>

    </div>
  );
}