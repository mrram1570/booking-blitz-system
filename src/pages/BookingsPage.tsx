
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useBooking, Booking } from '../contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, parseISO } from 'date-fns';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Calendar, Clock, MapPin, Ticket, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BookingCard: React.FC<{ booking: Booking, onCancel: () => void }> = ({ booking, onCancel }) => {
  const isCancelled = booking.status === 'cancelled';
  
  return (
    <Card className={`relative overflow-hidden ${isCancelled ? 'opacity-60' : ''}`}>
      {isCancelled && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-destructive/80 text-destructive-foreground px-3 py-1 rounded transform -rotate-12 text-lg font-bold">
            Cancelled
          </div>
        </div>
      )}
      
      <CardContent className={`p-5 ${isCancelled ? 'blur-[1px]' : ''}`}>
        <div className="flex gap-4">
          <div className="w-16 h-24 rounded overflow-hidden hidden sm:block">
            <img 
              src={booking.movie.poster} 
              alt={booking.movie.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{booking.movie.title}</h3>
              <Badge variant={isCancelled ? "destructive" : "outline"} className="ml-2">
                {isCancelled ? "Cancelled" : "Confirmed"}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 mt-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{format(new Date(booking.showtime.date), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{booking.showtime.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{booking.showtime.hall}</span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {booking.seats.map(seat => `${seat.row}${seat.number}`).join(', ')}
                </span>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t flex justify-between items-center">
              <div className="text-sm">
                <span className="text-muted-foreground">Booked on: </span>
                <span>{format(parseISO(booking.bookingDate), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">${booking.totalPrice.toFixed(2)}</span>
                
                {!isCancelled && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to cancel this booking? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No, Keep It</AlertDialogCancel>
                        <AlertDialogAction onClick={onCancel}>
                          Yes, Cancel Booking
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BookingsPage = () => {
  const { bookings, cancelBooking } = useBooking();
  
  const confirmedBookings = bookings.filter(booking => booking.status === 'confirmed');
  const cancelledBookings = bookings.filter(booking => booking.status === 'cancelled');
  
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground mb-6">View and manage your movie bookings</p>
        
        <Tabs defaultValue="confirmed">
          <TabsList className="mb-6">
            <TabsTrigger value="confirmed">
              Active Bookings ({confirmedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledBookings.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="confirmed">
            {confirmedBookings.length > 0 ? (
              <div className="space-y-4">
                {confirmedBookings.map(booking => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    onCancel={() => cancelBooking(booking.id)} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Ticket className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">No Active Bookings</h3>
                <p className="text-muted-foreground mt-1">You don't have any active bookings</p>
                <Link to="/">
                  <Button className="mt-4">Book a Movie</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="cancelled">
            {cancelledBookings.length > 0 ? (
              <div className="space-y-4">
                {cancelledBookings.map(booking => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    onCancel={() => {}} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto h-12 w-12 rounded-full border-2 border-muted flex items-center justify-center mb-4">
                  <X className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium">No Cancelled Bookings</h3>
                <p className="text-muted-foreground mt-1">You don't have any cancelled bookings</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BookingsPage;
