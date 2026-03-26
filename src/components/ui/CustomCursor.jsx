import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on mobile/touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Dispatch custom event for 3D scene to pick up
      window.dispatchEvent(new CustomEvent('cursor-move', {
        detail: {
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
          clientX: e.clientX,
          clientY: e.clientY,
        }
      }));
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Smooth animation loop
    let animFrame;
    const animate = () => {
      // Cursor dot follows immediately
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.3;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.3;

      // Ring follows with lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px) translate(-50%, -50%) scale(${isClicking ? 0.6 : 1})`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${isClicking && !isHovering ? 0.8 : 1})`;
      }

      animFrame = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    animFrame = requestAnimationFrame(animate);

    // Add cursor:none to body with media query safeguard
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = `
      @media (hover: hover) and (pointer: fine) {
        *, *::before, *::after { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animFrame);
      document.body.style.cursor = '';
      const el = document.getElementById('custom-cursor-style');
      if (el) el.remove();
    };
  }, [isHovering, isClicking]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Inner dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform' }}
      >
        <div className={`w-3 h-3 rounded-full transition-all duration-200 ${
          isHovering ? 'scale-0 opacity-0' : 'bg-white'
        }`} />
      </div>

      {/* Outer element: ring normally, crosshair on hover */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ willChange: 'transform' }}
      >
        {/* Default ring (hidden on hover) */}
        <div className={`rounded-full border transition-all duration-300 ${
          isHovering
            ? 'w-0 h-0 opacity-0'
            : 'w-10 h-10 border-white/20'
        }`} />

        {/* Sharp FPS-style Crosshair (visible on hover) */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isHovering ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}>
          {/* Top segment */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[1.5px] h-3 bg-white shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          {/* Bottom segment */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[1.5px] h-3 bg-white shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          {/* Left segment */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-3 h-[1.5px] bg-white shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          {/* Right segment */}
          <div className="absolute top-1/2 left-1 -translate-y-1/2 w-3 h-[1.5px] bg-white shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          
          {/* Center tiny dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_12px_rgba(34,211,238,1)]" />
        </div>

        {/* Subtle glow trail (always present, brighter on hover) */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl transition-all duration-500 ${
          isHovering
            ? 'w-16 h-16 bg-primary/20'
            : 'w-8 h-8 bg-primary/0'
        }`} />
      </div>
    </>
  );
};

export default CustomCursor;
