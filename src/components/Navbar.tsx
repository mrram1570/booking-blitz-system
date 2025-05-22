
import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const isMobile = useIsMobile();
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <Ticket className="text-primary h-6 w-6" />
          <span className="font-bold text-lg">CineBlitz</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/bookings">
            {isMobile ? (
              <Button size="icon" variant="ghost">
                <Ticket className="h-5 w-5" />
              </Button>
            ) : (
              <Button variant="ghost" className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                <span>My Bookings</span>
              </Button>
            )}
          </Link>
          
          <Button variant="outline" size={isMobile ? "icon" : "default"}>
            <User className="h-5 w-5" />
            {!isMobile && <span className="ml-2">Account</span>}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
