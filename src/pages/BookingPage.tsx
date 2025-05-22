
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import SeatSelector from '../components/SeatSelector';
import BookingConfirmation from '../components/BookingConfirmation';
import { movies, showtimes } from '../data/movies';
import { useBooking, Booking } from '../contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from "@/hooks/use-toast";

const BookingPage = () => {
  const { movieId, showtimeId } = useParams<{ movieId: string, showtimeId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    selectedMovie, 
    selectedShowtime, 
    selectedSeats,
    setSelectedMovie, 
    setSelectedShowtime,
    createBooking,
    resetBookingProcess
  } = useBooking();
  
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [newBooking, setNewBooking] = useState<Booking | null>(null);
  
  // Initialize booking data if navigated directly to this page
  useEffect(() => {
    if (!selectedMovie && movieId) {
      const movie = movies.find(m => m.id === movieId);
      if (movie) {
        setSelectedMovie(movie);
      } else {
        navigate('/');
        toast({
          title: "Movie not found",
          description: "The movie you're looking for doesn't exist.",
          variant: "destructive"
        });
      }
    }
    
    if (!selectedShowtime && showtimeId) {
      const showtime = showtimes.find(s => s.id === showtimeId);
      if (showtime) {
        setSelectedShowtime(showtime);
      } else {
        navigate('/');
        toast({
          title: "Showtime not found",
          description: "The showtime you're looking for doesn't exist.",
          variant: "destructive"
        });
      }
    }
  }, [movieId, showtimeId, selectedMovie, selectedShowtime, navigate, setSelectedMovie, setSelectedShowtime, toast]);
  
  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      toast({
        title: "No seats selected",
        description: "Please select at least one seat to continue.",
        variant: "destructive"
      });
      return;
    }
    
    const booking = createBooking();
    if (booking) {
      setNewBooking(booking);
      setConfirmDialogOpen(true);
    }
  };
  
  const handleCloseConfirmation = () => {
    setConfirmDialogOpen(false);
    resetBookingProcess();
    navigate('/bookings');
  };
  
  if (!selectedMovie || !selectedShowtime) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-8">
        <Button 
          variant="outline" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(`/movies/${selectedMovie.id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Movie
        </Button>
        
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl font-bold mb-1">{selectedMovie.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span>{selectedShowtime.date}</span>
              <span>•</span>
              <span>{selectedShowtime.time}</span>
              <span>•</span>
              <span>{selectedShowtime.hall}</span>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 flex justify-end">
            <Button 
              className="w-full md:w-auto"
              onClick={handleConfirmBooking}
              disabled={selectedSeats.length === 0}
            >
              Confirm Booking
            </Button>
          </div>
        </div>
        
        <SeatSelector />
      </div>
      
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {newBooking && <BookingConfirmation booking={newBooking} onClose={handleCloseConfirmation} />}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default BookingPage;
