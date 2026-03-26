import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = ({ count = 3500 }) => {
  const mesh = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Listen for cursor-move events from CustomCursor
  useEffect(() => {
    const handler = (e) => {
      mouseRef.current.x = e.detail.x;
      mouseRef.current.y = e.detail.y;
    };
    window.addEventListener('cursor-move', handler);
    return () => window.removeEventListener('cursor-move', handler);
  }, []);

  const [positions, originalPositions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorPalette = [
      new THREE.Color('#3B82F6'),
      new THREE.Color('#60A5FA'),
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#A78BFA'),
      new THREE.Color('#22D3EE'),
      new THREE.Color('#0450DB'),
      new THREE.Color('#8331D8'),
      new THREE.Color('#6366F1'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute in a larger ellipsoidal volume
      const radius = 5 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta) * 1.5; // wider horizontally
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.8; // flatter vertically
      const z = radius * Math.cos(phi);

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 0.12 + 0.02;
    }

    return [positions, originalPositions, colors, sizes];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Slow base rotation
    mesh.current.rotation.y = time * 0.02 + mx * 0.3;
    mesh.current.rotation.x = Math.sin(time * 0.015) * 0.08 + my * 0.15;

    const pos = mesh.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      // Mouse influence: particles push away from cursor projection
      const mouseWorld = new THREE.Vector3(mx * 20, my * 12, 0);
      const particlePos = new THREE.Vector3(ox, oy, oz);
      const dist = particlePos.distanceTo(mouseWorld);
      const influence = Math.max(0, 1 - dist / 18) * 3.5;

      const pushDir = particlePos.clone().sub(mouseWorld).normalize();

      // Organic floating motion
      const wave1 = Math.sin(time * 0.4 + ox * 0.15) * 0.5;
      const wave2 = Math.cos(time * 0.3 + oy * 0.12) * 0.4;
      const wave3 = Math.sin(time * 0.5 + oz * 0.1) * 0.3;

      pos[i3] = ox + wave1 + pushDir.x * influence;
      pos[i3 + 1] = oy + wave2 + pushDir.y * influence;
      pos[i3 + 2] = oz + wave3 + pushDir.z * influence;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleField;
