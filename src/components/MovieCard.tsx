
import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../data/movies';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`}>
      <Card className="movie-card h-full overflow-hidden border-0 bg-transparent">
        <CardContent className="p-0 h-full">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
            <img 
              src={movie.poster} 
              alt={movie.title}
              className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <h3 className="text-white font-bold text-lg truncate">{movie.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-primary/20 text-primary border-primary">
                  {movie.rating.toFixed(1)}
                </Badge>
                <span className="text-cinema-muted text-sm">{movie.duration} min</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
