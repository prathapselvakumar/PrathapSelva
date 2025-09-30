
import { useRef } from "react";
import useParallax from "@/hooks/useParallax";
import useMouseParallax from "@/hooks/useMouseParallax";
import BackgroundEffects from "./hero/BackgroundEffects";
import ProfileImage from "./hero/ProfileImage";
import HeroContent from "./hero/HeroContent";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Generate parallax transforms
  const bgParallax = useParallax(bgLayerRef, { speed: 0.05, direction: 'up' });
  const contentParallax = useParallax(contentRef, { speed: 0.03, direction: 'down', reverse: true });
  const imageParallax = useParallax(imageRef, { speed: 0.08, direction: 'up' });
  
  // Mouse parallax effect
  useMouseParallax(sectionRef, {
    refs: [
      { ref: bgLayerRef, factor: 10 },
      { ref: contentRef, factor: 15, direction: 'reverse' },
      { ref: imageRef, factor: 25 }
    ]
  });
  
  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden liquid-glass-hero pt-32 flex items-center justify-center"
    >
      {/* Background effects with parallax */}
      <BackgroundEffects bgLayerRef={bgLayerRef} />
      
      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 max-w-6xl mx-auto">
          {/* Profile image with parallax */}
          <ProfileImage imageRef={imageRef} />
          
          {/* Hero content with parallax */}
          <HeroContent contentRef={contentRef} />
        </div>
      </div>
      
      
    </section>
  );
}
