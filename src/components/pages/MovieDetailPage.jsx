import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.kinoxii.redberryinternship.ge/api/movies/${id}`);
        const data = await response.json();
        
        
        const movieData = data.data || data;
        setMovie(movieData);
      } catch (err) {
        console.error("Failed to fetch movie details", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  // აუცილებლად უნდა ჰქონდეს return, რომ ჩატვირთვისას ეს ბლოკი გამოჩნდეს
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">იტვირთება დეტალები...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center space-y-4">
        <p className="text-gray-400">ფილმი ვერ მოიძებნა</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-red-600 rounded-xl text-white text-xs font-medium"
        >
          უკან დაბრუნება
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 px-4 md:px-8 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* უკან დაბრუნების ღილაკი */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-medium transition flex items-center space-x-2"
        >
          <span>← უკან დაბრუნება</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-[#121212] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
          {/* ფილმის პოსტერი */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg h-96 bg-[#1a1a1a]">
              <img 
                src={movie.poster || movie.image || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1000&auto=format&fit=crop&q=80'} 
                alt={movie.title} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* ფილმის ინფო */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-red-600/20 border border-red-500/30 text-red-500 text-xs font-semibold rounded-full">
                  {movie.genre || (movie.genres && movie.genres[0]?.name) || 'Action / Drama'}
                </span>
                <span className="text-xs text-gray-400">წელი: {movie.release_year || movie.year || '2026'}</span>
                <span className="text-xs text-gray-400">ხანგრძლივობა: {movie.duration || '2h'}</span>
                <span className="text-xs text-yellow-500 font-bold">★ {movie.rating || 'N/A'}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{movie.title}</h1>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                {movie.description || movie.summary || 'აღწერა არ მოიძებნა.'}
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
              <button className="px-6 py-3.5 bg-red-600 hover:bg-red-700 font-bold text-sm rounded-xl shadow-lg shadow-red-600/30 transition">
                ყურება / ჩართვა
              </button>
              <button className="px-6 py-3.5 bg-white/10 hover:bg-white/20 font-bold text-sm rounded-xl transition border border-white/10">
                ფავორიტებში დამატება
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};