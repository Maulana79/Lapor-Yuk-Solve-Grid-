import { Link, useLocation } from 'react-router-dom';
import { Home, Map, History, User, Search, Bell, Plus } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  // Daftar menu navigasi
  const navMenus = [
    { title: 'Beranda', path: '/', icon: <Home size={18} /> },
    { title: 'Peta', path: '/maps', icon: <Map size={18} /> },
    { title: 'Riwayat', path: '/riwayat', icon: <History size={18} /> },
    { title: 'Profil', path: '/profil', icon: <User size={18} /> },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Bagian Kiri: Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src="/LaporYuk.svg" alt="Logo Lapor Yuk" className="w-8 h-8" />
        <span className="text-xl font-bold text-gray-800">
          Lapor<span className="text-[#00B27A]">Yuk!</span>
        </span>
      </Link>

      {/* Bagian Tengah: Menu Navigasi */}
      <div className="hidden md:flex items-center gap-2 bg-gray-50/50 rounded-full px-2 py-1">
        {navMenus.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <Link
              key={menu.title}
              to={menu.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-white text-gray-800 shadow-sm border border-gray-100' 
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {menu.icon}
              {menu.title}
            </Link>
          );
        })}
      </div>

      {/* Bagian Kanan: Aksi & Profil */}
      <div className="flex items-center gap-5">
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Search size={20} />
        </button>
        
        <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
          <Bell size={20} />
          {/* Badge Notifikasi Merah */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
            3
          </span>
        </button>

        <Link to="/lapor" className="flex items-center gap-1 bg-[#00B27A] hover:bg-[#009968] text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm">
          <Plus size={18} />
          Lapor
        </Link>

        <div className="w-8 h-8 rounded-full bg-[#00B27A] text-white flex items-center justify-center text-sm font-bold shadow-sm cursor-pointer">
          BS
        </div>
      </div>
    </nav>
  );
}