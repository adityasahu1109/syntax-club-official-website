import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingGeometry = () => {
  const groupRef = useRef();
  const torusRef = useRef();
  const icosaRef = useRef();
  const octaRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const dodecaRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => {
      mouseRef.current.x = e.detail.x;
      mouseRef.current.y = e.detail.y;
    };
    window.addEventListener('cursor-move', handler);
    return () => window.removeEventListener('cursor-move', handler);
  }, []);

  const torusMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#3B82F6',
    emissive: '#3B82F6',
    emissiveIntensity: 0.5,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  }), []);

  const icosaMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8B5CF6',
    emissive: '#8B5CF6',
    emissiveIntensity: 0.5,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }), []);

  const octaMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#22D3EE',
    emissive: '#22D3EE',
    emissiveIntensity: 0.6,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  }), []);

  const ring1Mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0450DB',
    emissive: '#0450DB',
    emissiveIntensity: 0.3,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
  }), []);

  const ring2Mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8331D8',
    emissive: '#8331D8',
    emissiveIntensity: 0.35,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
  }), []);

  const dodecaMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#6366F1',
    emissive: '#6366F1',
    emissiveIntensity: 0.4,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Entire group tilts subtly with mouse
    if (groupRef.current) {
      groupRef.current.rotation.y += (mx * 0.15 - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (my * 0.1 - groupRef.current.rotation.x) * 0.03;
    }

    // Torus knot – large, top right
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.12 + my * 0.3;
      torusRef.current.rotation.y = t * 0.18 + mx * 0.2;
      torusRef.current.position.y = Math.sin(t * 0.25) * 2.5;
      torusRef.current.position.x = 12 + Math.cos(t * 0.15) * 1.5;
    }

    // Icosahedron – large, left side
    if (icosaRef.current) {
      icosaRef.current.rotation.x = t * 0.08 + mx * 0.15;
      icosaRef.current.rotation.z = t * 0.12;
      icosaRef.current.position.y = Math.cos(t * 0.2) * 2 + 4;
      icosaRef.current.position.x = -13 + Math.sin(t * 0.12) * 1.2;
    }

    // Octahedron – medium, bottom
    if (octaRef.current) {
      octaRef.current.rotation.y = t * 0.15 + mx * 0.25;
      octaRef.current.rotation.z = t * 0.08;
      octaRef.current.position.y = Math.sin(t * 0.3 + 1) * 1.8 - 4;
      octaRef.current.position.x = 5 + Math.cos(t * 0.2) * 2;
    }

    // Ring 1 – big, far back
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.06 + my * 0.2;
      ringRef1.current.rotation.y = t * 0.1 + mx * 0.1;
      ringRef1.current.position.y = Math.cos(t * 0.15) * 1.5;
    }

    // Ring 2 – inner orbit
    if (ringRef2.current) {
      ringRef2.current.rotation.x = Math.PI / 3 + t * 0.07;
      ringRef2.current.rotation.z = t * 0.09;
      ringRef2.current.position.y = Math.sin(t * 0.18) * 2;
    }

    // Dodecahedron – top left
    if (dodecaRef.current) {
      dodecaRef.current.rotation.x = t * 0.1;
      dodecaRef.current.rotation.y = t * 0.14 + mx * 0.2;
      dodecaRef.current.position.y = Math.sin(t * 0.22 + 2) * 2.5 + 2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Large Torus Knot – top right */}
      <mesh ref={torusRef} position={[12, 2, -8]} material={torusMat}>
        <torusKnotGeometry args={[3.5, 0.8, 128, 20]} />
      </mesh>

      {/* Large Icosahedron – left */}
      <mesh ref={icosaRef} position={[-13, 4, -6]} material={icosaMat}>
        <icosahedronGeometry args={[4, 1]} />
      </mesh>

      {/* Octahedron – bottom right */}
      <mesh ref={octaRef} position={[5, -4, -8]} material={octaMat}>
        <octahedronGeometry args={[3, 0]} />
      </mesh>

      {/* Large Ring – far back center */}
      <mesh ref={ringRef1} position={[0, 0, -15]} material={ring1Mat}>
        <torusGeometry args={[8, 0.15, 24, 120]} />
      </mesh>

      {/* Smaller Ring – mid-ground */}
      <mesh ref={ringRef2} position={[-6, -2, -5]} material={ring2Mat}>
        <torusGeometry args={[4, 0.1, 16, 80]} />
      </mesh>

      {/* Dodecahedron – top left */}
      <mesh ref={dodecaRef} position={[-8, 6, -10]} material={dodecaMat}>
        <dodecahedronGeometry args={[2.5, 0]} />
      </mesh>
    </group>
  );
};

export default FloatingGeometry;
