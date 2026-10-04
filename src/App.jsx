import React, { useState, useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { LoginModal } from "./components/features/auth/LoginModal";
import { RegisterModal } from "./components/features/auth/RegisterModal";
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import { HomePage } from "./components/pages/HomePage";

function MainContent() {
  const { isLoginOpen, setIsLoginOpen, isRegisterOpen, setIsRegisterOpen } = useAuth();

  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedData = async () => {
      try {
        const featuredRes = await fetch('https://api.kinoxii.redberryinternship.ge/api/movies/featured');
        const featuredJson = await featuredRes.json();

        console.log("Featured API:", featuredJson);

        const extractData = (res) => {
          if (Array.isArray(res)) return res;
          if (res && Array.isArray(res.data)) return res.data;
          if (res && res.movies && Array.isArray(res.movies)) return res.movies;
          return [];
        };

        setFeaturedMovies(extractData(featuredJson));
      } catch (err) {
        console.error("მონაცემების ჩატვირთვის შეცდომა:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedData();
  }, []);

  const nextSlide = () => {
    if (featuredMovies.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }
  };

  const prevSlide = () => {
    if (featuredMovies.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
    }
  };

  const currentMovie = featuredMovies[currentSlide] || featuredMovies[0] || {
    title: 'THE ODYSSEY',
    description: 'A king spends ten years trying to get home to his already war-weary state...',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1920',
    genres: [{ name: 'Action' }, { name: 'Adventure' }]
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-red-600 selection:text-white">
      <Navbar />
      
      <main className="flex-grow">
        
        <section className="relative h-[75vh] flex items-center px-8 md:px-16 overflow-hidden bg-gradient-to-t from-[#0a0a0a] via-black/60 to-black">
          <div className="absolute inset-0 z-0">
            <img 
              src={currentMovie.poster || currentMovie.image || currentMovie.banner || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1920'} 
              alt={currentMovie.title}
              className="w-full h-full object-cover opacity-40 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex items-center space-x-3 text-xs text-gray-300">
              <span className="px-2.5 py-1 bg-white/10 rounded-md">PG-13</span>
              <span>2h 14m</span>
              <span>•</span>
              <span>
                {Array.isArray(currentMovie.genres) 
                  ? currentMovie.genres.map(g => g.name || g).join(', ') 
                  : (currentMovie.genre || 'Adventure')}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
              {currentMovie.title}
            </h1>

            <p className="text-gray-300 text-sm md:text-base line-clamp-3 leading-relaxed">
              {currentMovie.description || currentMovie.summary || 'აღმოაჩინე კინემატოგრაფის საუკეთესო შედევრები.'}
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 transition">
                Buy tickets
              </button>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl backdrop-blur-md transition">
                All sessions
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 z-20 flex items-center space-x-2">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition"
            >
              ‹
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition"
            >
              ›
            </button>
          </div>
        </section>

   
        <HomePage />
      </main>
      
      <footer className="border-t border-white/10 bg-[#050505] py-8 text-center text-sm text-gray-500">
        <p>© 2026 KINOXII. ყველა უფლება დაცულია.</p>
      </footer>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}