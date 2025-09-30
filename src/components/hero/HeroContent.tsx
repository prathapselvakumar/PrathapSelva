import { RefObject, useEffect, useState } from 'react';

interface HeroContentProps {
  contentRef: RefObject<HTMLDivElement>;
}

export default function HeroContent({ contentRef }: HeroContentProps) {
  const [isBouncing, setIsBouncing] = useState(false);
  const greetings = [
    'Hi',        // English
    'Hola',      // Spanish
    'Salut',     // French
    'Hallo',     // German
    'Ciao',      // Italian
    'Olá',       // Portuguese
    'नमस्ते',    // Hindi
    '你好',        // Chinese (Mandarin)
    'こんにちは',  // Japanese
    'مرحبا'       // Arabic
  ];
  const [greetIndex, setGreetIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  // Typing animation: type, pause, delete, next greeting
  useEffect(() => {
    const fullText = greetings[greetIndex];
    const typingSpeed = isDeleting ? 55 : 95; // ms per char
    const pauseAtFull = 900; // ms pause when full word typed
    const pauseAtEmpty = 400; // ms pause before next word

    let timer: number;

    if (!isDeleting && charIndex < fullText.length) {
      timer = window.setTimeout(() => setCharIndex((c) => c + 1), typingSpeed);
    } else if (!isDeleting && charIndex === fullText.length) {
      timer = window.setTimeout(() => setIsDeleting(true), pauseAtFull);
    } else if (isDeleting && charIndex > 0) {
      timer = window.setTimeout(() => setCharIndex((c) => c - 1), typingSpeed);
    } else if (isDeleting && charIndex === 0) {
      timer = window.setTimeout(() => {
        setIsDeleting(false);
        setGreetIndex((idx) => (idx + 1) % greetings.length);
      }, pauseAtEmpty);
    }

    setDisplayText(fullText.slice(0, charIndex));

    return () => window.clearTimeout(timer);
  }, [charIndex, isDeleting, greetIndex, greetings]);

  const handleDownloadResume = () => {
    // Start bounce animation
    setIsBouncing(true);
    
    // Create and trigger download
    const link = document.createElement('a');
    link.href = '/Prathap Sevakumar-CV.pdf';
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
        {/* Typing multilingual greeting (no underline) */}
        <div className="mb-4 h-20" aria-live="polite">
          <div className="font-bold">
            <span
              key={`${greetIndex}-${charIndex}-${isDeleting ? 'del' : 'type'}`}
              className="inline-block transform transition-all duration-300 text-5xl md:text-6xl lg:text-7xl tracking-wide bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent"
              style={{ textShadow: '0 0 18px rgba(99,102,241,0.5), 0 0 30px rgba(59,130,246,0.35)' }}
            >
              {displayText}
              <span className="inline-block w-[2px] md:w-[3px] h-8 md:h-10 align-middle bg-blue-500/80 ml-1 animate-pulse" />
              {displayText && ','}
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