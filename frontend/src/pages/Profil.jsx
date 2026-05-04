import { 
  MapPin, Settings, Bell, Shield, HelpCircle, LogOut, 
  Award, TrendingUp, Heart, CheckCircle, Star, ShieldCheck,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profil() {
  // Data dummy laporan saya
  const laporanSaya = [
    {
      id: 1,
      status: 'Selesai',
      statusColor: 'text-green-600',
      barColor: 'bg-green-500',
      waktu: '2 hari lalu',
      judul: 'Jalan Berlubang di Depan Kantor Pos',
      lokasi: 'Jl. Menteng Raya No. 1',
      likes: 32,
      comments: 12,
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 2,
      status: 'Diproses',
      statusColor: 'text-yellow-600',
      barColor: 'bg-yellow-500',
      waktu: '1 hari lalu',
      judul: 'Sampah Menumpuk di Gang Mawar',
      lokasi: 'Gang Mawar RT 05/03, Mente...',
      likes: 20,
      comments: 9,
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      
      {/* 1. Cover Photo & Header Background */}
      <div className="h-48 md:h-64 w-full relative">
        <img 
          src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=1200" 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        {/* Tombol Kamera untuk ganti cover */}
        <button className="absolute top-6 right-6 md:right-12 bg-white/20 hover:bg-white/30 backdrop-blur-md p-2.5 rounded-full text-white transition-colors border border-white/30">
          <CameraIcon size={20} />
        </button>
      </div>

      {/* 2. Main Profile Card (Overlapping) */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-16 md:-mt-24 relative z-10">
        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-md border border-gray-100">
          
          {/* Avatar & Identitas */}
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative -mt-16 md:-mt-20 mb-3">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200" alt="Budi Santoso" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#00B27A] border-2 border-white rounded-full flex items-center justify-center shadow-sm">
                <ShieldCheck size={14} className="text-white" />
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">Budi Santoso</h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="bg-green-50 text-[#00B27A] px-3 py-1 rounded-full text-xs font-bold border border-green-100 flex items-center gap-1">
                <CheckCircle size={12} /> Warga Aktif
              </span>
            </div>
            
            <p className="text-gray-500 text-sm font-medium mt-3 flex items-center justify-center gap-4 flex-wrap">
              <span className="flex items-center gap-1"><MapPin size={16} /> Kec. Menteng, Jakarta Pusat</span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span>Bergabung Januari 2025</span>
            </p>
          </div>

          {/* Gamification: XP Bar */}
          <div className="mt-8 mb-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Poin Kontribusi</span>
              <span className="text-sm font-bold text-[#00B27A]">720 / 1000 XP</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#00B27A] rounded-full w-[72%] transition-all duration-1000"></div>
            </div>
          </div>

          <div className="h-px w-full bg-gray-100 my-6"></div>

          {/* Kontak Info */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-600 font-medium mb-6">
            <div className="flex items-center gap-1.5"><MailIcon size={16} className="text-gray-400"/> budi.santoso@email.com</div>
            <div className="flex items-center gap-1.5"><PhoneIcon size={16} className="text-gray-400"/> +62 812-3456-7890</div>
            <div className="flex items-center gap-1.5"><IdCardIcon size={16} className="text-gray-400"/> NIK: 3171•••••••0001</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-[#00B27A]">14</span>
              <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase">Laporan</span>
            </div>
            <div className="flex flex-col items-center border-l border-gray-100">
              <span className="text-2xl font-bold text-[#00B27A]">9</span>
              <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase">Selesai</span>
            </div>
            <div className="flex flex-col items-center border-l border-gray-100">
              <span className="text-2xl font-bold text-red-500">186</span>
              <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase">Dukungan</span>
            </div>
            <div className="flex flex-col items-center border-l border-gray-100">
              <span className="text-2xl font-bold text-orange-500">#12</span>
              <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase">Peringkat</span>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-8 space-y-8">
        
        {/* 3. Menu Navigasi Profil */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4 px-2">Menu</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 border border-gray-100"><Settings size={20} /></div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-800 text-sm">Pengaturan Akun</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Ubah profil, email, dan password</p>
                </div>
              </div>
              <ChevronRightIcon size={20} className="text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 border border-gray-100"><Bell size={20} /></div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-800 text-sm">Notifikasi</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Atur preferensi pemberitahuan</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">2</span>
                <ChevronRightIcon size={20} className="text-gray-400" />
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 border border-gray-100"><Shield size={20} /></div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-800 text-sm">Privasi & Keamanan</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Autentikasi dua faktor, biometrik</p>
                </div>
              </div>
              <ChevronRightIcon size={20} className="text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 border border-gray-100"><HelpCircle size={20} /></div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-800 text-sm">Pusat Bantuan</h4>
                  <p className="text-xs text-gray-500 mt-0.5">FAQ dan hubungi tim support</p>
                </div>
              </div>
              <ChevronRightIcon size={20} className="text-gray-400" />
            </button>
          </div>

          <Link to="/login" className="w-full mt-4 bg-red-50 text-red-500 font-bold p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors border border-red-100 shadow-sm">
            <LogOut size={20} /> Keluar dari Akun
          </Link>
        </div>

        {/* 4. Pencapaian */}
        <div>
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-lg font-bold text-gray-800">Pencapaian</h2>
            <span className="text-sm font-bold text-[#00B27A]">5/6</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Achieved */}
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 shadow-sm">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500"><Star size={20} fill="currentColor"/></div>
              <span className="text-xs font-bold text-gray-800">Pelapor Pertama</span>
            </div>
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 shadow-sm">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-500"><Award size={20} fill="currentColor"/></div>
              <span className="text-xs font-bold text-gray-800">5 Laporan</span>
            </div>
            <div className="bg-purple-50 border border-purple-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-500"><Award size={20} fill="currentColor"/></div>
              <span className="text-xs font-bold text-gray-800">10 Laporan</span>
            </div>
            <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-[#00B27A]"><TrendingUp size={20}/></div>
              <span className="text-xs font-bold text-gray-800">Trending</span>
            </div>
            <div className="bg-pink-50 border border-pink-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 shadow-sm">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-500"><Heart size={20} fill="currentColor"/></div>
              <span className="text-xs font-bold text-gray-800">100 Likes</span>
            </div>
            
            {/* Locked */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 grayscale opacity-60">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500"><ShieldCheck size={20}/></div>
              <span className="text-xs font-bold text-gray-500">Terverifikasi</span>
            </div>
          </div>
        </div>

        {/* 5. Laporan Saya */}
        <div>
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-[#00B27A] border border-green-100 shadow-sm"><FileTextIcon size={20} /></div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 leading-tight">Laporan Saya</h2>
              <p className="text-xs text-gray-500 font-medium">5 laporan dibuat</p>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 px-2 scrollbar-hide">
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold bg-[#00B27A] text-white shadow-sm">Semua <span className="ml-1 bg-white/20 px-1.5 rounded-md">5</span></button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold bg-white text-gray-600 border border-gray-200 shadow-sm">Menunggu <span className="ml-1 bg-gray-100 px-1.5 rounded-md">1</span></button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold bg-white text-gray-600 border border-gray-200 shadow-sm">Diproses <span className="ml-1 bg-gray-100 px-1.5 rounded-md">2</span></button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold bg-white text-gray-600 border border-gray-200 shadow-sm">Selesai <span className="ml-1 bg-gray-100 px-1.5 rounded-md">2</span></button>
          </div>

          <div className="space-y-4">
            {laporanSaya.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative">
                  <img src={item.image} alt={item.judul} className="w-full h-full object-cover" />
                  <div className="absolute bottom-1 right-1 bg-white/90 p-1 rounded-lg"><MapPin size={12} className="text-gray-600"/></div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[10px] font-bold ${item.statusColor} flex items-center gap-1`}><span className={`w-1.5 h-1.5 rounded-full ${item.barColor}`}></span> {item.status}</span>
                    <span className="text-[10px] text-gray-400 font-semibold">{item.waktu}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm leading-snug mb-1 line-clamp-1">{item.judul}</h3>
                  <p className="text-xs text-gray-500 line-clamp-1 mb-2">{item.lokasi}</p>
                  
                  {/* Progress Bar Status */}
                  <div className="w-full h-1.5 bg-gray-100 rounded-full mt-auto overflow-hidden flex">
                    <div className={`h-full ${item.id === 1 ? 'w-full bg-green-500' : 'w-1/2 bg-yellow-500'}`}></div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-gray-400"><Heart size={14} /> <span className="text-xs font-bold">{item.likes}</span></div>
                    <div className="flex items-center gap-1.5 text-gray-400"><MessageCircle size={14} /> <span className="text-xs font-bold">{item.comments}</span></div>
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

// Icon Components Helper
const CameraIcon = (props) => <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>;
const MailIcon = (props) => <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const PhoneIcon = (props) => <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const IdCardIcon = (props) => <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 10h2"/><path d="M16 14h2"/><path d="M6.17 15a3 3 0 0 1 5.66 0"/><circle cx="9" cy="11" r="2"/><rect x="2" y="5" width="20" height="14" rx="2"/></svg>;
const ChevronRightIcon = (props) => <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>;
const FileTextIcon = (props) => <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>;