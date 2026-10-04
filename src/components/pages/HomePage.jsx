import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        
        // პარალელურად ვქაჩავთ ორთავე ენდფოინთიდან
        const [nowRes, comingRes] = await Promise.all([
          fetch('https://api.kinoxii.redberryinternship.ge/api/movies/now-playing'),
          fetch('https://api.kinoxii.redberryinternship.ge/api/movies/coming-soon')
        ]);

        const nowData = await nowRes.json();
        const comingData = await comingRes.json();

        // მონაცემების სწორად ამოღება (ვამოწმებთ მასივია თუ { data: [...] })
        const extractList = (res) => {
          if (Array.isArray(res)) return res;
          if (res && Array.isArray(res.data)) return res.data;
          if (res && Array.isArray(res.movies)) return res.movies;
          return [];
        };

        setNowPlaying(extractList(nowData));
        setComingSoon(extractList(comingData));
      } catch (err) {
        console.error("ვერ მოხერხდა ფილმების წამოღება:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-gray-400 animate-pulse">იტვირთება ფილმები...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* 1. NOW PLAYING (მიმდინარე ფილმები) */}
        <section>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-6 uppercase text-gray-200">
            Now Playing
          </h2>

          {nowPlaying.length === 0 ? (
            <p className="text-gray-500 text-sm">მიმდინარე ფილმები არ მოიძებნა.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {nowPlaying.map((movie) => (
                <Link 
                  key={movie.id || movie._id} 
                  to={`/movies/${movie.id || movie._id}`}
                  className="group relative bg-[#121212] rounded-xl overflow-hidden border border-white/10 hover:border-red-600/50 transition duration-300 flex flex-col"
                >
                  <div className="relative aspect-[2/3] overflow-hidden bg-[#1a1a1a]">
                    <img 
                      src={movie.poster || movie.image || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800'} 
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-3 flex flex-col justify-between flex-grow space-y-2">
                    <h3 className="text-sm font-bold text-white truncate">{movie.title}</h3>
                    <span className="w-full py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition text-center block">
                      Buy Ticket
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* 2. COMING SOON (სამომავლო ფილმები) */}
        <section className="border-t border-white/10 pt-12">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-6 uppercase text-gray-200">
            Coming Soon...
          </h2>

          {comingSoon.length === 0 ? (
            <p className="text-gray-500 text-sm">სამომავლო ფილმები არ მოიძებნა.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {comingSoon.map((movie) => (
                <Link 
                  key={movie.id || movie._id} 
                  to={`/movies/${movie.id || movie._id}`}
                  className="group relative bg-[#121212] rounded-xl overflow-hidden border border-white/10 hover:border-red-600/50 transition duration-300 flex flex-col"
                >
                  <div className="relative aspect-[2/3] overflow-hidden bg-[#1a1a1a]">
                    <img 
                      src={movie.poster || movie.image || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800'} 
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-3 flex flex-col justify-between flex-grow space-y-2">
                    <h3 className="text-sm font-bold text-white truncate">{movie.title}</h3>
                    <span className="w-full py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition border border-white/10 text-center block">
                      Notify Me
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};