import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Maps from './pages/Maps';
import Riwayat from './pages/Riwayat';
import Lapor from './pages/Lapor';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute tanpa Navbar (Auth) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rute dengan Navbar (Dibungkus oleh MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/riwayat" element={<Riwayat />} />
          <Route path="/profil" element={<div className="p-8">Halaman Profil</div>} />
          <Route path="/lapor" element={<Lapor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;