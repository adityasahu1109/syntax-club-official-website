import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';
import FloatingGeometry from './FloatingGeometry';

const ResponsiveScene = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Scale down 3D objects on mobile (screens < 768px width)
      setScale(window.innerWidth < 768 ? 0.5 : 1);
    };
    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <group scale={scale}>
      <ParticleField count={3000} />
      <FloatingGeometry />
    </group>
  );
};

const HeroScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 22], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Dramatic lighting */}
          <ambientLight intensity={0.15} />
          <pointLight position={[15, 12, 10]} intensity={1.2} color="#3B82F6" distance={60} />
          <pointLight position={[-15, -8, 8]} intensity={0.8} color="#8B5CF6" distance={50} />
          <pointLight position={[0, 15, -10]} intensity={0.5} color="#22D3EE" distance={40} />
          <pointLight position={[10, -10, 5]} intensity={0.4} color="#6366F1" distance={35} />

          {/* 3D Elements with responsive scaling */}
          <ResponsiveScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
