
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur-md">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">CineBlitz</h3>
            <p className="text-muted-foreground">
              Book your movie tickets with ease and enjoy the best cinema experience.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/bookings" className="text-muted-foreground hover:text-primary transition-colors">My Bookings</Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: contact@cineblitz.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CineBlitz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
