import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LoginModal } from './features/auth/LoginModal';
import { RegisterModal } from './features/auth/RegisterModal';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-4">მოგესალმებით Kinoxii-ზე</h1>
          <p className="text-gray-400">აირჩიეთ ფილმები, სერიალები და ისიამოვნეთ ყურებით.</p>
        </main>

        {/* გლობალური მოდალები */}
        <LoginModal />
        <RegisterModal />
      </div>
    </AuthProvider>
  );
}

export default App;