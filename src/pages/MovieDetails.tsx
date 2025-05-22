
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ShowtimeSelector from '../components/ShowtimeSelector';
import { movies, showtimes } from '../data/movies';
import { useBooking } from '../contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setSelectedMovie, setSelectedShowtime } = useBooking();
  
  const movie = movies.find(m => m.id === id);
  
  // Filter showtimes for this movie
  const movieShowtimes = showtimes.filter(s => s.movieId === id);
  
  if (!movie) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-bold">Movie Not Found</h2>
          <p className="text-muted-foreground mt-2">The movie you're looking for doesn't exist.</p>
          <Button className="mt-4" onClick={() => navigate('/')}>
            Go Back to Home
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleShowtimeSelect = (showtime: typeof showtimes[0]) => {
    setSelectedMovie(movie);
    setSelectedShowtime(showtime);
    navigate(`/booking/${movie.id}/${showtime.id}`);
  };
  
  return (
    <Layout>
      <div className="relative">
        {/* Hero Section with Movie Poster */}
        <div className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={movie.poster} 
              alt={movie.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/50"></div>
          </div>
          
          <div className="container relative h-full flex items-end pb-12">
            <Button 
              variant="outline" 
              size="icon"
              className="absolute top-8 left-4 md:left-8"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-32 md:w-48 aspect-[2/3] rounded-lg overflow-hidden shadow-xl hidden md:block">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
                <div className="flex items-center gap-4 text-sm mb-4">
                  <span className="bg-primary/20 text-primary px-2 py-1 rounded">
                    {movie.rating.toFixed(1)}/5.0
                  </span>
                  <span>{movie.duration} min</span>
                  <span>{movie.genre.join(', ')}</span>
                </div>
                <p className="text-muted-foreground max-w-2xl">{movie.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Showtimes Section */}
        <section className="container py-8">
          <ShowtimeSelector 
            movie={movie} 
            showtimes={movieShowtimes}
            onSelect={handleShowtimeSelect}
          />
        </section>
      </div>
    </Layout>
  );
};

export default MovieDetails;
