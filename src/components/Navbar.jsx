import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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

  // Move the indicator whenever the route changes
  useEffect(() => {
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

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Logo — left, fixed width so nav stays centred */}
        <div className="flex items-center gap-3 w-48 shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-primary/90 p-1.5 rounded-lg group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(6,245,249,0.3)]">
              <span className="material-symbols-outlined text-background-dark font-bold leading-none block text-[20px]">terminal</span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-white group-hover:text-primary transition-colors">SyntaX</h1>
          </Link>
        </div>

        {/* Nav links — centred, with sliding underline indicator */}
        <nav ref={navRef} className="relative flex flex-1 items-center justify-center gap-5 flex-wrap">
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

          {/* Sliding underline */}
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

        {/* Spacer mirrors logo width */}
        <div className="w-48 shrink-0" />
      </div>
    </header>
  );
};

export default Navbar;
