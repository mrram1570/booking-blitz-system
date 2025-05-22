
import React from 'react';
import { useBooking } from '../contexts/BookingContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SeatSelector: React.FC = () => {
  const { seats, selectedSeats, toggleSeatSelection, selectedShowtime } = useBooking();

  // Group seats by row
  const seatsByRow: Record<string, typeof seats> = {};
  seats.forEach(seat => {
    if (!seatsByRow[seat.row]) {
      seatsByRow[seat.row] = [];
    }
    seatsByRow[seat.row].push(seat);
  });

  return (
    <Card className="bg-card border-none">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-6">Select Your Seats</h3>
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-1/2 h-2 bg-primary/20 rounded-full mb-8"></div>
          <p className="text-muted-foreground text-sm">Screen</p>
        </div>
        
        <div className="flex flex-col items-center gap-3 mb-6">
          {Object.entries(seatsByRow).map(([row, rowSeats]) => (
            <div key={row} className="flex gap-2 items-center">
              <span className="w-6 text-center text-muted-foreground">{row}</span>
              <div className="flex gap-2">
                {rowSeats.map(seat => (
                  <button
                    key={seat.id}
                    className={`seat ${
                      seat.status === 'available' ? 'seat-available' : 
                      seat.status === 'selected' ? 'seat-selected' : 'seat-taken'
                    }`}
                    onClick={() => toggleSeatSelection(seat)}
                    disabled={seat.status === 'taken'}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>
              <span className="w-6 text-center text-muted-foreground">{row}</span>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="seat seat-available w-6 h-6"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="seat seat-selected w-6 h-6"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="seat seat-taken w-6 h-6"></div>
            <span className="text-sm">Taken</span>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-secondary/50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Selected Seats</p>
              <p className="font-medium">
                {selectedSeats.length > 0 
                  ? selectedSeats.map(seat => `${seat.row}${seat.number}`).join(', ')
                  : 'None selected'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Price</p>
              <p className="font-bold">
                ${selectedShowtime ? (selectedSeats.length * selectedShowtime.price).toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeatSelector;
