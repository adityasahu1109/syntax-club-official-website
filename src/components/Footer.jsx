import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-20 py-10 text-center border-t border-primary/5 bg-background-dark/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 text-white">
          <div className="bg-primary p-1.5 rounded-lg">
            <span className="material-symbols-outlined text-background-dark font-bold leading-none block">terminal</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Coding Club</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm font-medium">
          <Link className="hover:text-primary transition-colors" to="/about">About Us</Link>
          <Link className="hover:text-primary transition-colors" to="/events">Events</Link>
          <Link className="hover:text-primary transition-colors" to="/projects">Projects</Link>
          <Link className="hover:text-primary transition-colors" to="/contact">Contact</Link>
        </div>
        
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Coding Club - Building the Future, One Commit at a Time.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
