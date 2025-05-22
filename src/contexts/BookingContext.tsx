
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Movie, Showtime, generateSeats } from '../data/movies';
import { useToast } from "@/components/ui/use-toast";

interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'taken' | 'selected';
}

export interface Booking {
  id: string;
  movie: Movie;
  showtime: Showtime;
  seats: Seat[];
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
}

interface BookingContextType {
  selectedMovie: Movie | null;
  selectedShowtime: Showtime | null;
  seats: Seat[];
  selectedSeats: Seat[];
  bookings: Booking[];
  setSelectedMovie: (movie: Movie | null) => void;
  setSelectedShowtime: (showtime: Showtime | null) => void;
  toggleSeatSelection: (seat: Seat) => void;
  createBooking: () => void;
  cancelBooking: (bookingId: string) => void;
  resetBookingProcess: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem('bookings', JSON.stringify(bookings));
    }
  }, [bookings]);

  // Generate new seats when a showtime is selected
  useEffect(() => {
    if (selectedShowtime) {
      setSeats(generateSeats());
      setSelectedSeats([]);
    }
  }, [selectedShowtime]);

  const toggleSeatSelection = (seat: Seat) => {
    if (seat.status === 'taken') return;
    
    // If seat is already selected, remove it
    if (selectedSeats.some(s => s.id === seat.id)) {
      setSelectedSeats(prev => prev.filter(s => s.id !== seat.id));
      setSeats(prev => 
        prev.map(s => 
          s.id === seat.id ? { ...s, status: 'available' } : s
        )
      );
    } else {
      // Add seat to selected seats
      const updatedSeat = { ...seat, status: 'selected' };
      setSelectedSeats(prev => [...prev, updatedSeat]);
      setSeats(prev => 
        prev.map(s => 
          s.id === seat.id ? updatedSeat : s
        )
      );
    }
  };
  
  const createBooking = () => {
    if (!selectedMovie || !selectedShowtime || selectedSeats.length === 0) {
      toast({
        title: "Cannot complete booking",
        description: "Please select a movie, showtime, and at least one seat.",
        variant: "destructive"
      });
      return;
    }
    
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      movie: selectedMovie,
      showtime: selectedShowtime,
      seats: selectedSeats,
      totalPrice: selectedShowtime.price * selectedSeats.length,
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };
    
    setBookings(prev => [...prev, newBooking]);
    
    toast({
      title: "Booking Successful!",
      description: "Your tickets have been booked successfully.",
    });
    
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => 
      prev.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      )
    );
    
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    });
  };

  const resetBookingProcess = () => {
    setSelectedMovie(null);
    setSelectedShowtime(null);
    setSeats([]);
    setSelectedSeats([]);
  };

  return (
    <BookingContext.Provider value={{
      selectedMovie,
      selectedShowtime,
      seats,
      selectedSeats,
      bookings,
      setSelectedMovie,
      setSelectedShowtime,
      toggleSeatSelection,
      createBooking,
      cancelBooking,
      resetBookingProcess
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
