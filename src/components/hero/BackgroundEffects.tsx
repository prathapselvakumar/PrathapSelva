
import { RefObject } from 'react';

interface BackgroundEffectsProps {
  bgLayerRef: RefObject<HTMLDivElement>;
}

export default function BackgroundEffects({ bgLayerRef }: BackgroundEffectsProps) {
  return (
    <div ref={bgLayerRef} className="absolute inset-0 overflow-hidden transition-transform duration-300">
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl animate-pulse-slow delay-700"></div>
      
      {/* Digital circuit lines with enhanced animations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-[pulse_4s_ease-in-out_infinite] animate-horizontal-bounce"></div>
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-[pulse_5s_ease-in-out_infinite] animate-wave"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-[pulse_6s_ease-in-out_infinite] animate-horizontal-bounce" style={{ animationDelay: "2s" }}></div>
      </div>
      
      {/* Enhanced animated particles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-ping"></div>
      <div className="absolute bottom-40 right-20 w-2 h-2 bg-accent rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-primary/50 rounded-full animate-float-vertical" style={{ animationDelay: "1.5s" }}></div>
      <div className="absolute bottom-1/4 left-1/5 w-3 h-3 bg-accent/50 rounded-full animate-float-vertical" style={{ animationDelay: "3s" }}></div>
    </div>
  );
}
