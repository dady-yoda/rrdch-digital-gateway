import React, { useState, Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Float, 
  ContactShadows, 
  Html,
  Text,
  MeshWobbleMaterial,
  PresentationControls
} from "@react-three/drei";
import * as THREE from "three";
import { 
  Layers, 
  Maximize2, 
  ExternalLink, 
  Info, 
  Navigation2, 
  Building2, 
  MapPin, 
  MousePointer2 
} from "lucide-react";
import "./CampusNavigator.css";

// --- Types ---
interface BuildingData {
  id: string;
  name: string;
  desc: string;
  pos: [number, number, number];
  color: string;
  highlights: string[];
  tourUrl?: string;
  type: "academic" | "facility" | "research";
}

// --- Data ---
const CAMPUS_DATA: BuildingData[] = [
  {
    id: "main-block",
    name: "RRDCH Main Academic Block",
    desc: "The heart of our institution, housing 9 primary dental departments, advanced simulation labs, and clinical suites.",
    pos: [0, 1.5, 0],
    color: "#546B41",
    type: "academic",
    highlights: ["Prosthodontics", "Oral Surgery", "Periodontology", "Endodontics"],
    tourUrl: "https://www.easytourz.com/BT-EmabedTour/all/2e6200684201ca03"
  },
  {
    id: "auditorium",
    name: "A.C.S Convention Centre",
    desc: "A world-class 500-seater auditorium used for international dental conferences and cultural galas.",
    pos: [4, 0.75, 2],
    color: "#1a3a3a",
    type: "facility",
    highlights: ["Centralized AC", "Hi-tech AV System", "Acoustically Perfect"],
    tourUrl: "https://www.easytourz.com/BT-EmabedTour/all/2e6200684201ca03"
  },
  {
    id: "library",
    name: "Digital Library & Info Center",
    desc: "24/7 accessible digital resource hub with over 10,000+ medical journals and global dental databases.",
    pos: [-4, 0.75, 1],
    color: "#2d4a53",
    type: "facility",
    highlights: ["E-Resources", "High-speed Wi-Fi", "Quiet Zones"],
    tourUrl: "https://www.easytourz.com/BT-EmabedTour/all/2e6200684201ca03"
  },
  {
    id: "sports",
    name: "Indoor & Outdoor Sports Arena",
    desc: "Comprehensive facilities including Basketball, Volleyball, and a state-of-the-art Gymnasium.",
    pos: [1, 0.3, 5],
    color: "#8b9d77",
    type: "facility",
    highlights: ["Gymnasium", "Basketball Court", "Volleyball"],
    tourUrl: "https://www.easytourz.com/BT-EmabedTour/all/2e6200684201ca03"
  },
  {
    id: "engineering",
    name: "RRCE Engineering Block",
    desc: "The neighboring RajaRajeswari College of Engineering, part of our multi-disciplinary campus ecosystem.",
    pos: [-5, 1, -4],
    color: "#64748b",
    type: "academic",
    highlights: ["Research Collaboration", "Shared Innovation Lab"],
    tourUrl: "https://www.easytourz.com/BT-EmabedTour/all/2e6200684201ca03"
  }
];

// --- 3D Components ---

const Building = ({ data, isSelected, onSelect }: { data: BuildingData, isSelected: boolean, onSelect: () => void }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Geometry dimensions based on type
  const dims: [number, number, number] = data.id === "main-block" ? [3.5, 3, 3] : [2, 1.5, 2];

  return (
    <Float 
      speed={hovered ? 2 : 1} 
      rotationIntensity={isSelected ? 0.5 : 0.2} 
      floatIntensity={hovered ? 0.5 : 0.2}
    >
      <group 
        position={data.pos} 
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Main structure */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={dims} />
          <meshStandardMaterial 
            color={isSelected ? "#7aa65a" : hovered ? "#6d8a54" : data.color} 
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>

        {/* Decorative Windows / Lines */}
        <mesh position={[0, 0, dims[2]/2 + 0.01]}>
          <planeGeometry args={[dims[0] * 0.8, dims[1] * 0.6]} />
          <meshStandardMaterial color="white" opacity={0.1} transparent />
        </mesh>

        {/* Hotspot / Label Pin */}
        <Html position={[0, dims[1]/2 + 0.5, 0]} center distanceFactor={10}>
          <div 
            className={`cn-pin ${isSelected ? 'active' : ''} ${hovered ? 'hover' : ''}`}
            style={{ 
              background: isSelected ? "#546B41" : "rgba(255,255,255,0.8)",
              color: isSelected ? "white" : "#546B41",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "10px",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition: "all 0.3s ease",
              opacity: hovered || isSelected ? 1 : 0.6
            }}
          >
            {data.name.split(" ")[0]}..
          </div>
        </Html>
      </group>
    </Float>
  );
};

const CampusNavigator = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(CAMPUS_DATA[0]);
  const [currentFloor, setCurrentFloor] = useState("GF");

  return (
    <section className="cn-section" id="campus-tour">
      <div className="cn-container">
        <Canvas shadows gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[12, 12, 12]} fov={35} />
          <OrbitControls 
            enablePan={false} 
            maxPolarAngle={Math.PI / 2.1} 
            minDistance={10}
            maxDistance={25}
            makeDefault
          />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <Suspense fallback={null}>
            <group position={[0, -1, 0]}>
              {/* Floor / Ground */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#f0f4f8" roughness={1} />
              </mesh>

              {/* Grid Helper for that planner look */}
              <gridHelper args={[50, 50, "#cbd5e1", "#e2e8f0"]} position={[0, 0, 0]} />

              {/* Buildings */}
              {CAMPUS_DATA.map((b) => (
                <Building 
                  key={b.id} 
                  data={b} 
                  isSelected={selectedBuilding?.id === b.id}
                  onSelect={() => setSelectedBuilding(b)}
                />
              ))}

              <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.15} far={10} color="#000000" />
            </group>
            
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* UI OVERLAY */}
      <div className="cn-overlay">
        <div className="cn-glass-card cn-header">
          <h2>3D Campus Explorer</h2>
          <p>Navigate our state-of-the-art facilities</p>
        </div>

        <div className="cn-glass-card cn-floor-selector">
          <button 
            className={`cn-floor-btn ${currentFloor === "GF" ? 'active' : ''}`}
            onClick={() => setCurrentFloor("GF")}
          >
            <Layers className="w-4 h-4" /> Ground Floor
          </button>
          <button 
            className={`cn-floor-btn ${currentFloor === "F1" ? 'active' : ''}`}
            onClick={() => setCurrentFloor("F1")}
          >
            <Layers className="w-4 h-4" /> First Floor
          </button>
          <button 
            className={`cn-floor-btn ${currentFloor === "F2" ? 'active' : ''}`}
            onClick={() => setCurrentFloor("F2")}
          >
            <Layers className="w-4 h-4" /> Second Floor
          </button>
        </div>
      </div>

      {/* DETAIL PANEL */}
      <div className={`cn-detail-panel ${selectedBuilding ? 'visible' : ''}`}>
        {selectedBuilding && (
          <div className="cn-glass-card cn-detail-content">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                {selectedBuilding.type}
              </span>
              <Building2 className="w-4 h-4 text-primary/40" />
            </div>
            <h3>{selectedBuilding.name}</h3>
            <p className="cn-detail-desc">{selectedBuilding.desc}</p>
            
            <div className="cn-detail-highlights">
              {selectedBuilding.highlights.map(h => (
                <div key={h} className="cn-highlight-item">
                  <div className="cn-highlight-dot" />
                  {h}
                </div>
              ))}
            </div>

            <a 
              href={selectedBuilding.tourUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="cn-tour-btn"
            >
              Enter Virtual 360° Tour <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>

      {/* INTERACTION HINT */}
      <div className="cn-hint">
        <MousePointer2 className="cn-hint-icon" />
        <span>Drag to rotate • Scroll to zoom • Click buildings to explore</span>
      </div>
    </section>
  );
};

export default CampusNavigator;
