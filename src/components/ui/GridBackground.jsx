const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Mesh gradient orbs */}
      <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-neon-blue/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-neon-purple/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] rounded-full bg-neon-cyan/3 blur-[80px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
};

export default GridBackground;
