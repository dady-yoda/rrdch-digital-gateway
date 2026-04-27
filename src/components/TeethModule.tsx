import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center, Environment, Html } from "@react-three/drei";
import * as THREE from "three";
import teethModelUrl from "@/assets/human_mouth_optimized.glb?url";
import OralHealthQuiz from "./OralHealthQuiz";

/* ── 3D Model — Renders the detailed open mouth ── */
const TeethModel = ({ setHoveredTooth, setHoverPoint }: { setHoveredTooth: (name: string | null) => void, setHoverPoint: (pt: THREE.Vector3 | null) => void }) => {
  const gltf = useGLTF(teethModelUrl);
  const groupRef = useRef<THREE.Group>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!groupRef.current || !gltf.scene) return;

    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const m = child as THREE.Mesh;
        if (m.material) {
          m.material = (m.material as THREE.Material).clone();
        }
      }
    });

    setModelLoaded(true);
  }, [gltf]);

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    if (e.object.isMesh) {
      document.body.style.cursor = 'pointer';
      
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
      
      const matName = e.object.material?.name?.toLowerCase() || "";
      let displayName = "Oral Cavity";

      // Calculate invariant local coordinates (fixes rotation/scaling bugs)
      const localPoint = e.object.worldToLocal(e.point.clone());
      const biteY = -0.013; // Mathematically calculated center bite line of this specific GLB
      
      const isTeeth = e.object.name === "Object_1" || matName.includes("teeth");
      const isTongueMesh = e.object.name === "Object_2" || matName.includes("material"); 

      if (isTeeth) {
        const angle = Math.atan2(localPoint.x, localPoint.z) * (180 / Math.PI);
        const absAngle = Math.abs(angle);
        const isUpper = localPoint.y > biteY;
        
        let type = "";
        if (absAngle < 15) type = "Central Incisors";
        else if (absAngle < 35) type = "Lateral Incisors";
        else if (absAngle < 55) type = "Canines";
        else if (absAngle < 90) type = "Premolars";
        else type = "Molars";
        
        displayName = `${isUpper ? "Upper" : "Lower"} ${type}`;
        
      } else {
        // Gums and Oral Cavity (Object_0 or Object_2)
        // If it's the explicit tongue mesh, it's the tongue.
        // Additionally, as requested: if the cursor is physically between the upper and lower teeth
        // (Y is in the gap range), we classify the back of the throat/inner tissue as the Tongue!
        const isInMouthGap = localPoint.y > -0.035 && localPoint.y < 0.015;
        
        if (isTongueMesh || isInMouthGap) {
          displayName = "Tongue";
        } else {
          // If it's outside the gap, it's either Upper Gums or Lower Gums
          const isUpper = localPoint.y > biteY;
          displayName = isUpper ? "Upper Gums" : "Lower Gums";
        }
      }
      
      setHoveredTooth(displayName);
      setHoverPoint(e.point.clone());
      
      if (e.object.material && e.object.material.emissive) {
        e.object.userData.prevEmissive = e.object.material.emissive.clone();
        e.object.material.emissive.setHex(0x1a1a1a);
      }
    }
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
    
    // Add a delay so the user can comfortably move their mouse to the button!
    hoverTimeout.current = setTimeout(() => {
      setHoveredTooth(null);
      setHoverPoint(null);
    }, 400); // 400ms grace period
    
    if (e.object.isMesh && e.object.material && e.object.material.emissive && e.object.userData.prevEmissive) {
      e.object.material.emissive.copy(e.object.userData.prevEmissive);
    }
  };

  return (
    <group ref={groupRef}>
      {modelLoaded && (
        <Center>
          <primitive 
            object={gltf.scene} 
            onPointerOver={handlePointerOver} 
            onPointerOut={handlePointerOut} 
            // Scaled up by another 50% per request
            scale={[12.8, 12.8, 12.8]}
          />
        </Center>
      )}
    </group>
  );
};

// A beautiful loading indicator for the heavy 3D model
const Loader = () => {
  return (
    <Html center>
      <div style={{
        background: "rgba(255, 255, 255, 0.95)",
        color: "#333",
        padding: "16px 32px",
        borderRadius: "30px",
        fontSize: "16px",
        fontWeight: "bold",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backdropFilter: "blur(8px)",
        whiteSpace: "nowrap"
      }}>
        <div style={{ 
          width: "20px", height: "20px", 
          border: "3px solid #e2e8f0", 
          borderTopColor: "#546B41", 
          borderRadius: "50%", 
          animation: "spin 1s linear infinite" 
        }} />
        Loading 3D Anatomy...
      </div>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </Html>
  );
};

/* ── Main Export ── */
export default function TeethModule() {
  const [hoveredTooth, setHoveredTooth] = useState<string | null>(null);
  const [hoverPoint, setHoverPoint] = useState<THREE.Vector3 | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showQuiz, setShowQuiz] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      style={{ width: "100%", height: "100%", position: "relative", background: "transparent" }}
      onMouseMove={handleMouseMove}
    >
      <Canvas gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 7], fov: 45 }} style={{ background: "transparent" }}>
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          minDistance={1.5}
          maxDistance={25}
        />

        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, 5, -10]} intensity={0.5} />
        <pointLight position={[0, 0, 5]} intensity={1.0} distance={20} />
        <Environment preset="studio" />

        <React.Suspense fallback={<Loader />}>
          <TeethModel setHoveredTooth={setHoveredTooth} setHoverPoint={setHoverPoint} />
        </React.Suspense>
      </Canvas>

      {/* Clean, Simple Hover Tooltip */}
      {hoveredTooth && (
        <div
          style={{
            position: "fixed",
            left: mousePos.x + 15,
            top: mousePos.y + 15,
            background: "rgba(0, 0, 0, 0.85)",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: "600",
            pointerEvents: "none",
            zIndex: 100,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            backdropFilter: "blur(8px)",
            animation: "fadeIn 0.1s ease"
          }}
        >
          {hoveredTooth}
        </div>
      )}

      {/* Footer Controls & Actions */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          left: "0",
          right: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          pointerEvents: "none", // Let clicks pass through empty space
        }}
      >
        <span style={{ 
          background: "rgba(255,255,255,0.9)", 
          padding: "12px 24px", 
          borderRadius: "30px",
          color: "#222",
          fontSize: "14px",
          fontWeight: 600,
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          backdropFilter: "blur(8px)",
          pointerEvents: "auto",
        }}>
          Left Click + Drag to Rotate • Scroll to Zoom • Right Click to Pan
        </span>

        <button
          style={{
            background: "#546B41",
            color: "#fff",
            border: "none",
            padding: "12px 28px",
            borderRadius: "30px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 16px rgba(84, 107, 65, 0.4)",
            pointerEvents: "auto", // Ensure button is clickable
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#6d8a55";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#546B41";
            e.currentTarget.style.transform = "scale(1)";
          }}
          onClick={(e) => {
            e.stopPropagation();
            setShowQuiz(true);
          }}
        >
          Take a Quiz
        </button>
      </div>
      
      {showQuiz && <OralHealthQuiz onClose={() => setShowQuiz(false)} />}
    </div>
  );
}
