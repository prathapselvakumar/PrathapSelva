import { RefObject, useState } from 'react';

interface HeroContentProps {
  contentRef: RefObject<HTMLDivElement>;
}

export default function HeroContent({ contentRef }: HeroContentProps) {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleDownloadResume = () => {
    // Start bounce animation
    setIsBouncing(true);
    
    // Create and trigger download
    const link = document.createElement('a');
    link.href = '/Prathap%20Selvakumar-CV.pdf';
    link.download = 'Prathap_Selvakumar_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Stop bounce animation after 1.5s
    setTimeout(() => {
      setIsBouncing(false);
    }, 1500);
  };


  return (
    <div ref={contentRef} className="w-full md:w-3/5 text-center md:text-left order-1 md:order-2 transition-transform duration-300">
      <div className="space-y-5 max-w-lg mx-auto md:mx-0">
        {/* Simple "Hi" greeting */}
        <div className="mb-4 h-16">
          <div className="text-3xl md:text-4xl font-bold text-primary animate-text-reveal">
            <span className="inline-block transform transition-all duration-500 text-4xl md:text-5xl">
              Hi,
            </span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold animate-text-reveal">
          I'm <span className="highlight-text">Prathap SelvaKumar</span>
        </h1>
        
        <h2 className="text-xl md:text-2xl font-medium text-muted-foreground animate-text-reveal" style={{ animationDelay: "150ms" }}>
          AI Enthusiast |  Robotics | Software Engineer
        </h2>
        
        <p className="text-lg text-foreground/80 animate-text-reveal" style={{ animationDelay: "300ms" }}>
         
Advancing intelligent medical systems that seamlessly integrate robotics and artificial intelligence to bridge the gap between clinical hardware and intelligent software.
        </p>
        
        <div className="pt-6 flex flex-row gap-4 justify-center md:justify-start stagger-fade-in">
          <button 
            onClick={handleDownloadResume}
            className={`liquid-glass-button group relative overflow-hidden tilt-card transition-transform duration-300 ${
              isBouncing ? 'animate-bounce' : 'hover:scale-105'
            }`}
            disabled={isBouncing}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></span>
            
            <div className="flex items-center relative z-10">
              <svg 
                className={`w-4 h-4 mr-2 transition-transform ${isBouncing ? 'animate-pulse' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              <span className="font-medium">
                {isBouncing ? 'Downloading...' : 'Download Resume'}
              </span>
            </div>
          </button>
          
          <a 
            href="https://www.linkedin.com/in/prathapselvakumar/"  
            className="liquid-glass-button group relative overflow-hidden tilt-card"
            target="_blank" 
          >
            <span className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/40 to-secondary/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></span>
            LinkedIn 
          </a>
        </div>
      </div>
    </div>
  );
}