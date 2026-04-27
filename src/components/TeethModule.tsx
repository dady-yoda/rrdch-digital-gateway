import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center, Environment, Html } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import teethModelUrl from "@/assets/human_mouth_optimized.glb?url";
import OralHealthQuiz from "./OralHealthQuiz";

const TOOTH_INFO: Record<string, { desc: string, detail: string }> = {
  "Upper Central Incisors": { desc: "Sharp, chisel-shaped front teeth.", detail: "Used primarily for cutting food." },
  "Lower Central Incisors": { desc: "Sharp, chisel-shaped front teeth.", detail: "Used primarily for cutting food." },
  "Upper Lateral Incisors": { desc: "Positioned next to the central incisors.", detail: "Help in cutting and tearing small pieces of food." },
  "Lower Lateral Incisors": { desc: "Positioned next to the central incisors.", detail: "Help in cutting and tearing small pieces of food." },
  "Upper Canines": { desc: "Pointed teeth used for tearing food.", detail: "Also known as cuspids, they are the longest teeth." },
  "Lower Canines": { desc: "Pointed teeth used for tearing food.", detail: "Also known as cuspids, they are the longest teeth." },
  "Upper Premolars": { desc: "Flat surface with ridges.", detail: "Transitional teeth for crushing and grinding." },
  "Lower Premolars": { desc: "Flat surface with ridges.", detail: "Transitional teeth for crushing and grinding." },
  "Upper Molars": { desc: "Large, flat teeth at the back of the mouth.", detail: "Primary function is to vigorously chew and grind." },
  "Lower Molars": { desc: "Large, flat teeth at the back of the mouth.", detail: "Primary function is to vigorously chew and grind." },
  "Tongue": { desc: "A strong muscular organ in the mouth.", detail: "Vital for chewing, swallowing, and speech." },
  "Upper Gums": { desc: "Soft tissue covering the upper jawbone.", detail: "Protects the roots of your upper teeth." },
  "Lower Gums": { desc: "Soft tissue covering the lower jawbone.", detail: "Protects the roots of your lower teeth." },
  "Oral Cavity": { desc: "The first section of the digestive tract.", detail: "Includes teeth, gums, tongue, and palate." }
};

const getToothDepartment = (name: string): { label: string, url: string } => {
  if (name.includes("Gums")) {
    return { label: "Periodontics", url: "/departments/periodontics" };
  } else if (name === "Tongue" || name === "Oral Cavity") {
    return { label: "Oral Medicine", url: "/departments/oral-medicine" };
  } else if (name.includes("Incisors") || name.includes("Canines") || name.includes("Premolars") || name.includes("Molars")) {
    return { label: "Conservative Dentistry", url: "/departments/conservative-dentistry" };
  }
  return { label: "Oral Surgery", url: "/departments/oral-surgery" };
};

/* ── 3D Model — Renders the detailed open mouth ── */
const TeethModel = ({ setHoveredTooth, setHoverPoint }: { setHoveredTooth: (name: string | null) => void, setHoverPoint: (pt: THREE.Vector3 | null) => void }) => {
  const gltf = useGLTF(teethModelUrl);
  const groupRef = useRef<THREE.Group>(null);
  const [modelLoaded, setModelLoaded] = useState(false);

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
        // (anything below the upper teeth and above the lower teeth), we classify it as the Tongue!
        const isInMouthGap = localPoint.y > -0.055 && localPoint.y < 0.025;
        
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
    
    setHoveredTooth(null);
    setHoverPoint(null);
    
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
  const [showQuiz, setShowQuiz] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleSetHoveredTooth = (name: string | null) => {
    if (name) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setHoveredTooth(name);
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredTooth(null);
      }, 500); // Increased grace period for longer travel distance
    }
  };

  const handleSetHoverPoint = (pt: THREE.Vector3 | null) => {
    if (pt) setHoverPoint(pt);
    // Let the timeout above handle clearing
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "transparent" }}>
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
          <TeethModel setHoveredTooth={handleSetHoveredTooth} setHoverPoint={handleSetHoverPoint} />
        </React.Suspense>

        {/* Anchored 3D HTML Card */}
        {hoveredTooth && hoverPoint && (() => {
          const info = TOOTH_INFO[hoveredTooth] || { desc: "Part of the dental anatomy.", detail: "Important for overall oral health." };
          const dept = getToothDepartment(hoveredTooth);
          return (
            <Html position={hoverPoint} zIndexRange={[100, 0]}>
              <div
                onMouseEnter={() => {
                  if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                }}
                onMouseLeave={() => {
                  hoverTimeoutRef.current = setTimeout(() => {
                    setHoveredTooth(null);
                  }, 500);
                }}
                style={{
                  transform: "translate3d(120px, -100px, 0)", // Pushed significantly further from the 3D model
                  background: "rgba(15, 23, 42, 0.95)",
                  color: "#fff",
                  padding: "16px",
                  borderRadius: "12px",
                  width: "250px",
                  pointerEvents: "auto",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  animation: "fadeIn 0.15s ease-out"
                }}
              >
                {/* The Arrow pointing left towards the 3D surface point */}
                <div style={{
                  position: "absolute",
                  left: "-8px",
                  top: "20px",
                  width: "0",
                  height: "0",
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  borderRight: "8px solid rgba(15, 23, 42, 0.95)",
                  pointerEvents: "none"
                }} />
                
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#a3e635", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px" }}>
                  {hoveredTooth}
                </h3>
                <div style={{ fontSize: "13px", color: "#f8fafc", lineHeight: "1.5" }}>
                  <p style={{ margin: "0 0 6px 0", fontWeight: "500" }}>{info.desc}</p>
                  <p style={{ margin: 0, color: "#cbd5e1" }}>{info.detail}</p>
                </div>
                
                {/* Department Redirect Button */}
                <button
                  onClick={() => navigate(dept.url)}
                  style={{
                    marginTop: "4px",
                    background: "rgba(84, 107, 65, 0.8)",
                    color: "#fff",
                    border: "1px solid rgba(163, 230, 53, 0.3)",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(109, 138, 85, 0.9)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(84, 107, 65, 0.8)";
                  }}
                >
                  <span>{dept.label} Dept</span>
                  <span style={{ fontSize: "14px" }}>→</span>
                </button>
              </div>
            </Html>
          );
        })()}
      </Canvas>

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
