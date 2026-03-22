import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import syntaxLogo from '../assets/syntax_logo.png';

const links = [
  { name: 'Home',         path: '/' },
  { name: 'Team',         path: '/about' },
  { name: 'Events',       path: '/events' },
  { name: 'Projects',     path: '/projects' },
  { name: 'Achievements', path: '/milestones' },
  { name: 'Alumni',       path: '/alumni' },
  { name: 'Blogs',        path: '/blogs' },
  { name: 'Contact',      path: '/contact' },
];

const Navbar = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Move the indicator whenever the route changes (desktop only)
  useEffect(() => {
    // Hide sliding indicator on mobile widths (< 1024px)
    if (window.innerWidth < 1024) return;
    
    const activeLink = linkRefs.current[location.pathname];
    const nav = navRef.current;
    if (!activeLink || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    setIndicatorStyle({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      opacity: 1,
    });
  }, [location.pathname]);

  // Handle window resize to recalculate indicator
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      } else {
        // Trigger generic re-render calculation by dispatching a fake resize event if needed
        // but simple toggle is enough for react
        const activeLink = linkRefs.current[location.pathname];
        const nav = navRef.current;
        if (!activeLink || !nav) return;

        const navRect = nav.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        setIndicatorStyle({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
          opacity: 1,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo — left */}
        <div className="flex items-center gap-3 w-48 shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={syntaxLogo} alt="SyntaX Logo" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_10px_rgba(6,245,249,0.3)]" />
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-[#0450db] to-[#8331d8] bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">SyntaX</h1>
          </Link>
        </div>

        {/* Desktop Nav links — centred */}
        <nav ref={navRef} className="hidden lg:flex relative flex-1 items-center justify-center gap-5 flex-wrap">
          {links.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                ref={el => { if (el) linkRefs.current[link.path] = el; }}
                className={`text-sm font-semibold whitespace-nowrap transition-colors pb-1 ${
                  isActive ? 'text-primary' : 'text-white/80 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Sliding underline (Desktop only) */}
          <span
            className="absolute bottom-0 h-[2px] bg-primary rounded-full pointer-events-none"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              opacity: indicatorStyle.opacity,
              transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s',
            }}
          />
        </nav>

        {/* Mirror spacer for desktop central alignment */}
        <div className="hidden lg:block w-48 shrink-0" />

        {/* Mobile Hamburger Menu Button */}
        <button 
          className="lg:hidden p-2 text-white hover:text-primary transition-colors focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-background-dark/95 backdrop-blur-xl border-b border-primary/20 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col items-center py-6 px-6 gap-4">
          {links.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-lg font-bold w-full text-center py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-slate-300 hover:text-primary hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
