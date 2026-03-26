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
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 py-2.5">
      {/* Glassmorphism navbar container */}
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-5 py-2.5 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(3,7,18,0.65)] backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.03)]'
            : 'bg-[rgba(3,7,18,0.4)] backdrop-blur-xl border border-white/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.2)]'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 w-44 shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={syntaxLogo}
              alt="SyntaX Logo"
              className="h-8 w-auto object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]"
            />
            <h1 className="text-lg font-black tracking-tight gradient-text-logo group-hover:opacity-80 transition-opacity">
              SyntaX
            </h1>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav ref={navRef} className="hidden lg:flex relative flex-1 items-center justify-center gap-0.5 flex-wrap">
          {links.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                ref={el => { if (el) linkRefs.current[link.path] = el; }}
                className={`relative text-[13px] font-medium whitespace-nowrap px-3.5 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-primary bg-primary/10 shadow-[inset_0_0_12px_rgba(59,130,246,0.1)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
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

        {/* Mirror spacer */}
        <div className="hidden lg:block w-44 shrink-0" />

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
                className={`text-sm font-semibold w-full text-center py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/15'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
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
