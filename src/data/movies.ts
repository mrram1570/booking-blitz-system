
export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string[];
  duration: number; // in minutes
  rating: number;
  poster: string;
  releaseDate: string;
}

export interface Showtime {
  id: string;
  movieId: string;
  date: string;
  time: string;
  hall: string;
  price: number;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Interstellar Journey",
    description: "A group of astronauts embarks on a journey through a wormhole in search of a new home for humanity.",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    duration: 169,
    rating: 4.8,
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1770&auto=format&fit=crop",
    releaseDate: "2025-05-07"
  },
  {
    id: "2",
    title: "Midnight Chronicles",
    description: "A detective must solve a series of mysterious crimes before time runs out.",
    genre: ["Thriller", "Mystery", "Crime"],
    duration: 128,
    rating: 4.5,
    poster: "https://images.unsplash.com/photo-1543536448-d209d2d13a1c?q=80&w=1770&auto=format&fit=crop",
    releaseDate: "2025-05-15"
  },
  {
    id: "3",
    title: "Eternal Sunshine",
    description: "Two former lovers erase each other from their memories, only to find they are drawn to each other again.",
    genre: ["Romance", "Drama", "Sci-Fi"],
    duration: 135,
    rating: 4.7,
    poster: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=1770&auto=format&fit=crop",
    releaseDate: "2025-05-01"
  },
  {
    id: "4",
    title: "The Lost Kingdom",
    description: "An adventurer searches for a lost civilization that holds the key to unlimited power.",
    genre: ["Adventure", "Fantasy", "Action"],
    duration: 145,
    rating: 4.3,
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1770&auto=format&fit=crop",
    releaseDate: "2025-05-20"
  },
  {
    id: "5",
    title: "City of Dreams",
    description: "A struggling musician tries to make it big in the city while dealing with personal demons.",
    genre: ["Drama", "Music"],
    duration: 122,
    rating: 4.6,
    poster: "https://images.unsplash.com/photo-1612036782180-6f0822045d55?q=80&w=1770&auto=format&fit=crop",
    releaseDate: "2025-05-12"
  },
  {
    id: "6",
    title: "The Final Stand",
    description: "Heroes from around the world unite for one last stand against an alien invasion.",
    genre: ["Action", "Sci-Fi"],
    duration: 152,
    rating: 4.4,
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1625&auto=format&fit=crop",
    releaseDate: "2025-05-28"
  }
];

export const showtimes: Showtime[] = [
  {
    id: "st1",
    movieId: "1",
    date: "2025-05-23",
    time: "14:30",
    hall: "Hall A",
    price: 12.99
  },
  {
    id: "st2",
    movieId: "1",
    date: "2025-05-23",
    time: "18:00",
    hall: "Hall B",
    price: 14.99
  },
  {
    id: "st3",
    movieId: "1",
    date: "2025-05-23",
    time: "21:30",
    hall: "Hall A",
    price: 14.99
  },
  {
    id: "st4",
    movieId: "2",
    date: "2025-05-23",
    time: "15:00",
    hall: "Hall C",
    price: 12.99
  },
  {
    id: "st5",
    movieId: "2",
    date: "2025-05-23",
    time: "19:30",
    hall: "Hall B",
    price: 14.99
  },
  {
    id: "st6",
    movieId: "3",
    date: "2025-05-23",
    time: "16:45",
    hall: "Hall D",
    price: 12.99
  },
  {
    id: "st7",
    movieId: "3",
    date: "2025-05-23",
    time: "20:15",
    hall: "Hall A",
    price: 14.99
  },
  {
    id: "st8",
    movieId: "4",
    date: "2025-05-23",
    time: "14:00",
    hall: "Hall B",
    price: 12.99
  },
  {
    id: "st9",
    movieId: "5",
    date: "2025-05-23",
    time: "17:30",
    hall: "Hall C",
    price: 12.99
  },
  {
    id: "st10",
    movieId: "6",
    date: "2025-05-23",
    time: "19:00",
    hall: "Hall D",
    price: 14.99
  }
];

// Generate a grid of seats (8 rows x 10 columns)
export const generateSeats = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seats = [];
  
  for (const row of rows) {
    for (let seat = 1; seat <= 10; seat++) {
      // Randomly mark some seats as taken (for demo purposes)
      const isTaken = Math.random() < 0.3;
      seats.push({
        id: `${row}${seat}`,
        row,
        number: seat,
        status: isTaken ? 'taken' : 'available'
      });
    }
  }
  
  return seats;
};
