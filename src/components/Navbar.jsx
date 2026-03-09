import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Team', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Projects', path: '/projects' },
    { name: 'Achievements', path: '/milestones' },
    { name: 'Alumni', path: '/alumni' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Logo – left */}
        <div className="flex items-center gap-3 w-48 shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-primary/90 p-1.5 rounded-lg group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(6,245,249,0.3)]">
              <span className="material-symbols-outlined text-background-dark font-bold leading-none block text-[20px]">terminal</span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-white group-hover:text-primary transition-colors">SyntaX</h1>
          </Link>
        </div>

        {/* Nav links – centered */}
        <nav className="flex flex-1 items-center justify-center gap-5 flex-wrap">
          {links.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-primary border-b-2 border-primary pb-0.5'
                    : 'text-white/80 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Spacer to perfectly mirror logo width */}
        <div className="w-48 shrink-0" />
      </div>
    </header>
  );
};

export default Navbar;
