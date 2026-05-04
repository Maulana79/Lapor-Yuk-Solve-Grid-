import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  // Fungsi dummy untuk pura-pura login dan pindah ke Dashboard
  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafaf4] via-[#7ae5c2] to-[#00b27a] flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
        
        {/* Bagian Kiri: Ilustrasi (Hanya tampil di layar menengah ke atas) */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 max-w-sm">
          <div className="bg-gradient-to-b from-[#f0f8ff] to-[#d6eaff] rounded-3xl p-8 shadow-lg w-full aspect-[4/5] relative overflow-hidden flex flex-col border border-white/50">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 z-10 leading-snug">
              Permudah <span className="text-orange-500">pelaporan keluhan</span> dan <span className="text-orange-500">insiden</span>!
            </h2>
            
            {/* Placeholder untuk Ilustrasi 3D menggunakan gambar dari Unsplash */}
            <div className="flex-1 w-full mt-4 bg-center bg-contain bg-no-repeat z-10 drop-shadow-xl" 
                 style={{ backgroundImage: "url('https://cdn3d.iconscout.com/3d/premium/thumb/customer-service-4994446-4161729.png')" }}>
            </div>
            
            {/* Dekorasi efek cahaya di background kotak ilustrasi */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-blue-100/50 rounded-t-[100%] blur-xl"></div>
          </div>
        </div>

        {/* Bagian Kanan: Form Login */}
        <div className="w-full max-w-md relative z-10">
          <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-2xl">
            
            {/* Logo & Header */}
            <div className="flex flex-col items-center mb-8">
                <img src="/LaporYuk.svg" alt="Logo Lapor Yuk" className="w-16 h-16 mb-4 drop-shadow-sm" />
                <h1 className="text-2xl font-extrabold text-gray-800">LaporYuk!</h1>
                <p className="text-gray-500 text-sm mt-1 font-medium">Suaramu, Perubahan Kita</p>
            </div>

            {/* Toggle Metode Login (Email vs NIK) */}
            <div className="flex bg-gray-50 p-1.5 rounded-xl mb-6 border border-gray-100">
              <button className="flex-1 bg-white text-[#00B27A] shadow-sm py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all">
                <Mail size={16} /> Email
              </button>
              <button className="flex-1 text-gray-500 hover:text-gray-700 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all">
                <Phone size={16} /> NIK/No. HP
              </button>
            </div>

            {/* Form Input */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                <input 
                  type="email" 
                  placeholder="contoh@email.com" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B27A]/20 focus:border-[#00B27A] transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <input 
                  type="password" 
                  placeholder="Masukkan password" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B27A]/20 focus:border-[#00B27A] transition-all"
                  required
                />
              </div>

              <div className="flex justify-end pt-1">
                <a href="#" className="text-[#00B27A] text-sm font-bold hover:underline">Lupa password?</a>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#00B27A] hover:bg-[#009968] text-white font-bold py-3.5 rounded-xl transition-colors shadow-md mt-2 flex justify-center items-center gap-2"
              >
                Masuk
              </button>
            </form>

            {/* Divider (Garis Pemisah) */}
            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-xs text-gray-400 font-semibold">atau masuk dengan</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Tombol Login Google */}
            <button className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Masuk dengan Google
            </button>

          </div>

          {/* Footer Text (Register Link) */}
          <div className="text-center mt-6">
            <p className="text-white/90 text-sm font-medium">
              Belum punya akun? <Link to="/register" className="font-extrabold text-white hover:underline drop-shadow-sm">Daftar sekarang</Link>
            </p>
          </div>
        </div>

      </div>

      {/* Syarat & Ketentuan di paling bawah */}
      <div className="mt-auto pt-8 pb-4 relative z-10">
        <p className="text-white/80 text-xs font-medium text-center">
          Dengan masuk, Anda menyetujui <a href="#" className="underline font-bold hover:text-white transition-colors">Syarat & Ketentuan</a> kami
        </p>
      </div>

    </div>
  );
}