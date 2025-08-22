
import { RefObject } from 'react';

interface ProfileImageProps {
  imageRef: RefObject<HTMLDivElement>;
}

export default function ProfileImage({ imageRef }: ProfileImageProps) {
  return (
    <div ref={imageRef} className="w-full md:w-2/5 flex justify-center order-2 md:order-1 transition-transform duration-300">
      <div className="relative group hover-3d">
        {/* Digital ring animation with enhanced effects */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-accent opacity-30 animate-spin-slow"></div>
        <div className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/20 animate-spin-reverse-slow"></div>
        <div className="absolute -inset-8 rounded-full border border-dashed border-accent/10 animate-spin-slow" style={{ animationDuration: "25s" }}></div>
        
        {/* Profile image with enhanced 3D effects */}
        <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl relative z-10 animate-float bg-black/20 backdrop-blur-sm tilt-card">
          <img 
            src="/lovable-uploads/f310618d-1d9a-43cd-a706-95c8d5c71355.png" 
            alt="Prathap Selva Kumar" 
            className="w-full h-full object-cover"
          />
          
          {/* Floating tech particles */}
          <div className="absolute -right-4 -top-2 w-8 h-8 bg-primary/80 rounded-full flex items-center justify-center text-white text-xs font-bold animate-float-vertical" style={{ animationDelay: "0.5s" }}>AI</div>
          <div className="absolute -left-2 bottom-10 w-10 h-10 bg-accent/80 rounded-full flex items-center justify-center text-white text-xs font-bold animate-float-vertical" style={{ animationDelay: "1.5s" }}>ML</div>
          <div className="absolute right-10 -bottom-4 w-9 h-9 bg-primary/70 rounded-full flex items-center justify-center text-white text-xs font-bold animate-float-vertical" style={{ animationDelay: "2.5s" }}>IoT</div>
        </div>
        
        {/* Enhanced circular highlight effect */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-accent opacity-30 blur group-hover:opacity-70 transition-all duration-1000 group-hover:blur-xl"></div>
      </div>
    </div>
  );
}
