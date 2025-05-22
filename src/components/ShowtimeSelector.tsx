
import React from 'react';
import { Movie, Showtime } from '../data/movies';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

interface ShowtimeSelectorProps {
  movie: Movie;
  showtimes: Showtime[];
  onSelect: (showtime: Showtime) => void;
}

const ShowtimeSelector: React.FC<ShowtimeSelectorProps> = ({ movie, showtimes, onSelect }) => {
  const [date, setDate] = React.useState<Date>(new Date());

  // Filter showtimes for the selected date
  const filteredShowtimes = showtimes.filter(
    showtime => showtime.date === format(date, 'yyyy-MM-dd')
  );

  // Group showtimes by hall
  const showtimesByHall: Record<string, Showtime[]> = {};
  filteredShowtimes.forEach(showtime => {
    if (!showtimesByHall[showtime.hall]) {
      showtimesByHall[showtime.hall] = [];
    }
    showtimesByHall[showtime.hall].push(showtime);
  });

  return (
    <Card className="bg-card border-none">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">Select a Showtime</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Pick a Date</h4>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="border rounded-md"
              disabled={(date) => {
                // Disable past dates
                return date < new Date(new Date().setHours(0, 0, 0, 0));
              }}
            />
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Available Times</h4>
            
            {Object.keys(showtimesByHall).length > 0 ? (
              <Tabs defaultValue={Object.keys(showtimesByHall)[0]}>
                <TabsList className="grid grid-cols-4 mb-4">
                  {Object.keys(showtimesByHall).map(hall => (
                    <TabsTrigger key={hall} value={hall}>
                      {hall}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {Object.entries(showtimesByHall).map(([hall, times]) => (
                  <TabsContent key={hall} value={hall} className="mt-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {times.map(showtime => (
                        <Button
                          key={showtime.id}
                          variant="outline"
                          onClick={() => onSelect(showtime)}
                          className="hover:bg-primary hover:text-primary-foreground"
                        >
                          {showtime.time}
                          <span className="text-xs ml-1 text-muted-foreground">
                            ${showtime.price}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 border rounded-lg border-dashed">
                <p className="text-muted-foreground">No showtimes available for this date</p>
                <p className="text-xs text-muted-foreground">Please select another date</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShowtimeSelector;
