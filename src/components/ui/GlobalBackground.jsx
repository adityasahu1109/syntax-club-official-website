import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HeroScene from './HeroScene';

const GlobalBackground = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    if (!isHome) {
      setScrollOpacity(0);
      return;
    }
    const handleScroll = () => {
      // Fade to 85% opacity across 600px of scroll
      const currentScroll = window.scrollY;
      const opacity = Math.min(currentScroll / 600, 0.45);
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-background-dark">
      {/* The continuous 3D background */}
      <HeroScene />

      {/* Base Home Gradients (always active under home) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${isHome ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/30 via-transparent to-background-dark" />
        <div className="absolute inset-0 mesh-gradient" />
      </div>

      {/* Dynamic homepage scroll dimming */}
      <div
        className="absolute inset-0 pointer-events-none bg-background-dark transition-opacity duration-75"
        style={{ opacity: isHome ? scrollOpacity : 0 }}
      />

      {/* Fogged Glass layer for inner pages */}
      <div
        className={`absolute inset-0 transition-all duration-1000 pointer-events-none ${isHome
          ? 'opacity-0 backdrop-blur-none bg-transparent'
          : 'opacity-100 backdrop-blur-3xl bg-[rgba(3,7,18,0.7)]'
          }`}
      />
    </div>
  );
};

export default GlobalBackground;
