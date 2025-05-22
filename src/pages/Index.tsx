
import React, { useState } from 'react';
import Layout from '../components/Layout';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  
  // Extract all unique genres
  const allGenres = Array.from(new Set(movies.flatMap(movie => movie.genre)));
  
  // Filter movies based on search query and selected genre
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre ? movie.genre.includes(selectedGenre) : true;
    return matchesSearch && matchesGenre;
  });

  return (
    <Layout>
      <section className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Now Showing</h1>
            <p className="text-muted-foreground mt-1">Book your favorite movie</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search movies..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={selectedGenre === null ? "default" : "outline"}
            onClick={() => setSelectedGenre(null)}
            className="rounded-full"
            size="sm"
          >
            All
          </Button>
          {allGenres.map(genre => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              onClick={() => setSelectedGenre(genre)}
              className="rounded-full"
              size="sm"
            >
              {genre}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        {filteredMovies.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="text-xl font-medium">No movies found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Index;
