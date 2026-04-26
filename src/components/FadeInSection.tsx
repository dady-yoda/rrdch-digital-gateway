import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  useThreeD?: boolean;
  threshold?: number;
}

/**
 * A professional, high-end scroll reveal component.
 * Uses GSAP for smooth, buttery transitions and optional 3D perspective shifts.
 */
const FadeInSection = ({ 
  children, 
  className = "", 
  delay = 0, 
  direction = "up", 
  distance = 40,
  useThreeD = true,
}: FadeInSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Calculate initial positions
    const x = direction === "left" ? distance : direction === "right" ? -distance : 0;
    const y = direction === "up" ? distance : direction === "down" ? -distance : 0;

    // Create the animation
    const anim = gsap.fromTo(el, 
      { 
        opacity: 0, 
        x: x,
        y: y, 
        rotateX: useThreeD && direction === "up" ? 10 : 0, // Subtle 3D tilt
        scale: 0.97, // Slight scale up feel
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1.4,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%", // Trigger slightly before it enters fully
          toggleActions: "play none none none", // Play once
        }
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, [direction, distance, delay, useThreeD]);

  return (
    <div 
      ref={ref} 
      className={className} 
      style={{ 
        perspective: useThreeD ? "1200px" : "none", 
        transformStyle: "preserve-3d",
        willChange: "transform, opacity" 
      }}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
