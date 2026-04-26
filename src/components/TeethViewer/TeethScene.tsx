import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Float, PerspectiveCamera, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { ALL_TEETH, ToothData, TOOTH_SIZES } from './teethData';

const BRAND_GREEN = '#546B41';
const HOVER_GREEN = '#849a62';
const PEARL_WHITE = '#F2F0EC';
const GUM_COLOR = '#5C1A2E';

interface ToothProps {
  data: ToothData;
  onHover: (name: string | null) => void;
}

const Tooth = ({ data, onHover }: ToothProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const size = TOOTH_SIZES[data.type];
  
  // Calculate position along arch
  const radiusX = 4.2;
  const radiusY = 5.2;
  const x = Math.cos(data.angle) * radiusX;
  const z = Math.sin(data.angle) * radiusY;
  const y = data.jaw === 'upper' ? 2.0 : -2.0;
  
  // Angle for orientation (pointing towards center)
  const lookAngle = data.angle + Math.PI / 2;

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Smooth hover animation
    const targetY = hovered ? (data.jaw === 'upper' ? 1.9 : -1.9) : y;
    const targetScale = hovered ? 1.2 : 1.0;
    
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, delta * 10);
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, delta * 10));
  });

  return (
    <group position={[x, y, z]} rotation={[0, -data.angle + Math.PI/2, 0]}>
      <RoundedBox
        ref={meshRef}
        args={[size.width, size.height, size.depth]}
        radius={0.15}
        smoothness={4}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(data.name);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <meshPhysicalMaterial
          color={hovered ? HOVER_GREEN : PEARL_WHITE}
          emissive={hovered ? HOVER_GREEN : '#000'}
          emissiveIntensity={hovered ? 0.5 : 0}
          roughness={0.05}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </RoundedBox>
      
      {/* Cusp for canines */}
      {data.type === 'canine' && (
        <mesh 
          position={[0, (data.jaw === 'upper' ? -size.height/2 : size.height/2), 0]}
          rotation={[data.jaw === 'upper' ? Math.PI : 0, 0, 0]}
        >
          <coneGeometry args={[size.width * 0.4, 0.4, 4]} />
          <meshPhysicalMaterial color={hovered ? HOVER_GREEN : PEARL_WHITE} roughness={0.1} />
        </mesh>
      )}

      {/* Point light on hover */}
      {hovered && (
        <pointLight position={[0, data.jaw === 'upper' ? 1 : -1, 1]} color={HOVER_GREEN} intensity={2} distance={5} />
      )}
    </group>
  );
};

const Arch = ({ jaw, onHover }: { jaw: 'upper' | 'lower'; onHover: (name: string | null) => void }) => {
  const teeth = useMemo(() => ALL_TEETH.filter(t => t.jaw === jaw), [jaw]);
  
  return (
    <group>
      {/* Gum Arch Visualization - Using a tube instead of torus for better control */}
      <mesh position={[0, jaw === 'upper' ? 1.8 : -1.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.2, 0.6, 16, 64, Math.PI * 1.3]} />
        <meshStandardMaterial color={GUM_COLOR} roughness={0.6} metalness={0.2} />
      </mesh>
      
      {teeth.map(tooth => (
        <Tooth key={tooth.id} data={tooth} onHover={onHover} />
      ))}
    </group>
  );
};

export const TeethScene = ({ onHover }: { onHover: (name: string | null) => void }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 4, 14]} fov={40} />
      <OrbitControls 
        enablePan={false} 
        minDistance={6} 
        maxDistance={25}
        autoRotate={true}
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[15, 15, 15]} angle={0.3} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-15, 10, -10]} color={BRAND_GREEN} intensity={1} />
      <pointLight position={[0, -10, 0]} intensity={0.5} />
      
      <group rotation={[0.2, 0, 0]}>
        <Arch jaw="upper" onHover={onHover} />
        <Arch jaw="lower" onHover={onHover} />
      </group>
      
      <ContactShadows 
        position={[0, -5, 0]} 
        opacity={0.6} 
        scale={25} 
        blur={2.5} 
        far={6} 
      />
      
      <Environment preset="night" />
    </>
  );
};
