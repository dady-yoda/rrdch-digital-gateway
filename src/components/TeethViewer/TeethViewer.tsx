import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { X } from 'lucide-react';
import { TeethScene } from './TeethScene';
import './TeethViewer.css';

interface TeethViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeethViewer = ({ isOpen, onClose }: TeethViewerProps) => {
  const [hoveredTooth, setHoveredTooth] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="teeth-viewer-overlay" onClick={onClose}>
      <div className="teeth-viewer-modal" onClick={(e) => e.stopPropagation()}>
        <div className="teeth-viewer-header">
          <h4 className="teeth-viewer-title">Anatomy Guide</h4>
          <h2 className="teeth-viewer-subtitle">Interactive Dental Viewer</h2>
        </div>

        <button className="teeth-viewer-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="teeth-viewer-canvas">
          <Canvas shadows dpr={[1, 2]}>
            <Suspense fallback={null}>
              <TeethScene onHover={setHoveredTooth} />
              <EffectComposer>
                <Bloom luminanceThreshold={1} intensity={1.5} levels={9} mipmapBlur />
              </EffectComposer>
            </Suspense>
          </Canvas>
          
          <div className="teeth-loading-hint">
            <Suspense fallback={<div className="teeth-loading">Loading 3D Model...</div>}>
              <div />
            </Suspense>
          </div>
        </div>

        {hoveredTooth && (
          <div 
            className="teeth-tooltip"
            style={{ 
              left: mousePos.x, 
              top: mousePos.y,
              opacity: 1
            }}
          >
            {hoveredTooth}
          </div>
        )}

        <div className="teeth-hint">Drag to rotate • Scroll to zoom • Hover to identify</div>
      </div>
    </div>
  );
};
