import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group, Mesh, Points } from 'three';

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}

const EclatSculpture: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const particles = useRef<Points>(null);
  const particlePositions = useMemo(() => {
    const values = new Float32Array(90 * 3);
    for (let index = 0; index < 90; index += 1) {
      const radius = 2.25 + ((index * 17) % 23) / 40;
      const angle = index * 2.39996;
      const vertical = ((index % 19) - 9) / 7;
      values[index * 3] = Math.cos(angle) * radius;
      values[index * 3 + 1] = vertical;
      values[index * 3 + 2] = Math.sin(angle) * radius;
    }
    return values;
  }, []);

  useFrame((state, delta) => {
    if (reducedMotion || !group.current || !core.current || !particles.current) return;
    group.current.rotation.y += delta * 0.09;
    group.current.rotation.x += (state.pointer.y * 0.08 - group.current.rotation.x) * 0.035;
    group.current.rotation.z += (state.pointer.x * 0.08 - group.current.rotation.z) * 0.035;
    core.current.rotation.x -= delta * 0.14;
    particles.current.rotation.y -= delta * 0.025;
  });

  return (
    <group ref={group} rotation={[0.16, -0.35, 0]}>
      <mesh ref={core} scale={1.18}>
        <icosahedronGeometry args={[1.1, 4]} />
        <meshPhysicalMaterial color="#d9bd81" roughness={0.08} metalness={0.16} transmission={0.68} thickness={1.4} transparent opacity={0.82} clearcoat={1} clearcoatRoughness={0.08} />
      </mesh>
      <mesh rotation={[Math.PI / 2.8, 0.3, 0]}>
        <torusGeometry args={[1.65, 0.025, 16, 180]} />
        <meshStandardMaterial color="#f8e8bd" emissive="#9b7130" emissiveIntensity={1.2} />
      </mesh>
      <mesh rotation={[0.4, Math.PI / 2.2, 0.5]}>
        <torusGeometry args={[1.88, 0.012, 12, 180]} />
        <meshStandardMaterial color="#ffffff" emissive="#bfa66e" emissiveIntensity={0.7} transparent opacity={0.7} />
      </mesh>
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#efdba7" size={0.026} transparent opacity={0.65} sizeAttenuation />
      </points>
    </group>
  );
};

const EclatScene: React.FC = () => {
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      dpr={[1, 1.5]}
      frameloop={reducedMotion ? 'demand' : 'always'}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={4.2} color="#f5dfad" />
      <pointLight position={[-3, -1, 3]} intensity={18} distance={8} color="#335f56" />
      <pointLight position={[2, -3, -2]} intensity={12} distance={7} color="#b17839" />
      <EclatSculpture reducedMotion={reducedMotion} />
    </Canvas>
  );
};

export default EclatScene;

