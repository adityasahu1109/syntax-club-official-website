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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      } else {
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-background-dark/70 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-2' 
          : 'bg-background-dark/40 backdrop-blur-xl border-transparent py-4'
      }`}
    >
      {/* Glassmorphism full-width container */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 xl:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5 w-auto shrink-0 mr-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={syntaxLogo}
              alt="SyntaX Logo"
              className="h-9 w-auto object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]"
            />
            <h1 className="text-xl font-black tracking-tight gradient-text-logo group-hover:opacity-80 transition-opacity">
              SyntaX
            </h1>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav ref={navRef} className="hidden lg:flex relative flex-1 items-center justify-center gap-1 flex-wrap">
          {links.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                ref={el => { if (el) linkRefs.current[link.path] = el; }}
                className={`relative text-[15px] font-bold whitespace-nowrap px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-primary bg-primary/10 shadow-[inset_0_0_12px_rgba(59,130,246,0.1)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Synhack Button */}
        <div className="hidden lg:flex w-auto shrink-0 ml-4 items-center justify-end">
          <Link
            to="/synhack"
            className="group relative px-6 py-2.5 font-bold text-white rounded-xl overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
          >
            {/* Glowing background gradient with animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-purple-600 animate-gradient bg-[length:200%_auto]" />
            <div className="absolute inset-[1px] bg-[#030712] rounded-xl z-[1] transition-opacity duration-300 group-hover:opacity-80" />
            
            {/* Border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-primary opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
            
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-wider text-sm bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent group-hover:text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              <span className="material-symbols-outlined text-[18px] text-cyan-400 group-hover:animate-pulse">rocket_launch</span>
              SYNHACK
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-xl">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden mt-2 max-w-7xl mx-auto rounded-2xl bg-[rgba(3,7,18,0.8)] backdrop-blur-2xl border border-white/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-400 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[600px] opacity-100 p-2' : 'max-h-0 opacity-0 p-0 border-transparent'
        }`}
      >
        <nav className="flex flex-col gap-0.5">
          {links.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[15px] font-bold w-full text-center py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/15'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="w-full text-center py-2 relative mt-2 border-t border-white/10 pt-4">
             <Link
                to="/synhack"
                className="inline-flex relative px-8 py-3 font-bold text-white rounded-xl overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-purple-600" />
                <span className="relative z-10 flex items-center gap-2 uppercase tracking-wider text-sm text-white drop-shadow-md">
                  <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                  REGISTER FOR SYNHACK
                </span>
              </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
