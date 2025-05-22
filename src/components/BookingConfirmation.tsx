
import React from 'react';
import { Booking } from '../contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { format } from 'date-fns';
import { CheckCircle, Ticket, Calendar, Clock, MapPin, QrCode } from 'lucide-react';

interface BookingConfirmationProps {
  booking: Booking;
  onClose: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ booking, onClose }) => {
  // Generate a simple QR code-like representation for demo purposes
  const bookingInfo = `Movie: ${booking.movie.title}, Date: ${booking.showtime.date}, Time: ${booking.showtime.time}, Seats: ${booking.seats.map(seat => `${seat.row}${seat.number}`).join(', ')}`;

  return (
    <Card className="border-primary/20">
      <CardContent className="p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
          <p className="text-muted-foreground text-center mt-1">
            Your tickets have been booked successfully
          </p>
        </div>
        
        <div className="rounded-lg overflow-hidden mb-6">
          <div className="bg-card p-4 border-b">
            <h3 className="font-bold text-xl">{booking.movie.title}</h3>
            <div className="flex items-center gap-1 text-muted-foreground mt-1">
              <span>{booking.movie.duration} min</span>
              <span className="mx-1">•</span>
              <span>{booking.movie.genre.join(', ')}</span>
            </div>
          </div>
          
          <div className="bg-background p-4 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{format(new Date(booking.showtime.date), 'MMMM d, yyyy')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{booking.showtime.time}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Hall</p>
                  <p className="font-medium">{booking.showtime.hall}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Ticket className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Seats</p>
                  <p className="font-medium">
                    {booking.seats.map(seat => `${seat.row}${seat.number}`).join(', ')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* QR Code Section */}
            <div className="flex justify-center my-4">
              <div className="border-2 p-2 rounded-md">
                <div className="flex flex-col items-center">
                  <QrCode className="w-32 h-32 text-primary" />
                  <p className="text-xs text-muted-foreground mt-2">Scan for ticket details</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-dashed pt-4 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Booking ID</span>
                <span className="font-mono">{booking.id.split('-')[1]}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-bold">${booking.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button>
          <Ticket className="mr-2 h-4 w-4" />
          View My Bookings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingConfirmation;
