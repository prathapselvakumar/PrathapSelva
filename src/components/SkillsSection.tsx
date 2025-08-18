
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

// Skill categories
const skills = [
  {
    category: "Programming Languages",
    items: [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "HTML/CSS", level: 88 },
      { name: "C++", level: 80 },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "React.js", level: 92 },
      { name: "Node.js", level: 87 },
      { name: "NumPy", level: 85 },
      { name: "PyTorch", level: 82 },
    ],
  },
  {
    category: "Areas of Expertise",
    items: [
      { name: "Deep Learning", level: 90 },
      { name: "AI/ML Models", level: 88 },
      { name: "Web Development", level: 92 },
      { name: "Data Analysis", level: 85 },
    ],
  },
  {
    category: "Tools & Technologies",
    items: [
      { name: "Git", level: 90 },
      { name: "AWS", level: 85 },
      { name: "Docker", level: 82 },
      { name: "Database Systems", level: 86 },
    ],
  },
];


export default function SkillsSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle mouse move effect on cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = skillRefs.current[index];
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation and perspective
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    // Apply the transform with a slight delay for smoothness
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = (index: number) => {
    const card = skillRefs.current[index];
    if (!card) return;
    
    // Reset the transform with a transition for smoothness
    card.style.transition = 'transform 0.5s ease';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    
    // Remove transition after animation to avoid affecting mousemove
    setTimeout(() => {
      if (card) card.style.transition = '';
    }, 500);
  };
  
  // Intersection observer to trigger animations when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section ref={sectionRef} id="skills" className="section-padding relative overflow-hidden">
      {/* Liquid glass background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-circuit-pattern opacity-5"></div>
        <div className="absolute top-40 right-20 w-72 h-72 liquid-morph-1 bg-gradient-to-br from-primary/5 to-accent/2 filter blur-3xl animate-liquid-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 liquid-morph-2 bg-gradient-to-tr from-accent/5 to-primary/2 filter blur-3xl animate-liquid-pulse delay-700"></div>
        
        {/* Animated digital grid lines with parallax effect */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-[pulse_4s_ease-in-out_infinite] animate-horizontal-bounce"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-[pulse_5s_ease-in-out_infinite] animate-wave"></div>
        
        {/* Floating tech particles */}
        <div className="absolute top-20 right-1/4 w-5 h-5 bg-primary/30 rounded-full animate-float-vertical" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute bottom-40 left-1/3 w-4 h-4 bg-accent/30 rounded-full animate-float-vertical" style={{ animationDelay: "3s" }}></div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 
            className={cn(
              "text-3xl md:text-4xl font-bold mb-4",
              isVisible ? "animate-text-reveal" : "opacity-0"
            )}
          >
            Technical <span className="highlight-text">Skills</span>
          </h2>
          <p 
            className={cn(
              "text-muted-foreground max-w-2xl mx-auto",
              isVisible ? "animate-text-reveal" : "opacity-0"
            )} 
            style={{ animationDelay: "100ms" }}
          >
            The technologies, languages, and tools I work with.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skills.map((skillCategory, index) => (
            <div 
              key={skillCategory.category}
              ref={el => skillRefs.current[index] = el}
              className={cn(
                "liquid-glass-card card-hover group tilt-card",
                index % 2 === 0 ? "border-t-4 border-t-primary" : "border-t-4 border-t-accent",
                isVisible ? "animate-fade-in" : "opacity-0"
              )}
              style={{ 
                animationDelay: `${index * 150}ms`,
                transition: 'transform 0.1s ease',
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onMouseEnter={() => setHovered(skillCategory.category)}
              onMouseOut={() => setHovered(null)}
            >
              {/* Enhanced animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Floating accent elements that appear on hover */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-bl-3xl scale-0 group-hover:scale-100 transition-transform duration-500 origin-top-right"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-tr-3xl scale-0 group-hover:scale-100 transition-transform duration-500 origin-bottom-left delay-100"></div>
              
              <h3 className="text-xl font-bold mb-6 px-6 pt-6 relative z-10">{skillCategory.category}</h3>
              
              <div className="px-6 pb-6 space-y-4 relative z-10">
                {skillCategory.items.map((skill, idx) => (
                  <div 
                    key={skill.name} 
                    className={cn(
                      "transform transition-all duration-500 hover:scale-105",
                      isVisible ? "animate-fade-in" : "opacity-0"
                    )}
                    style={{ animationDelay: `${index * 150 + idx * 100 + 200}ms` }}
                  >
                    <div className="flex items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                      <div 
  className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full relative"
  style={{ 
    width: isVisible ? `${skill.level}%` : "0%",
    transition: 'width 1.5s ease-in-out',
    transitionDelay: `${idx * 200}ms`,
  }}
>

                        {/* Enhanced loading animation pulse effect */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div 
                            className="h-full w-20 bg-white/20 skew-x-30 animate-[slide-in-right_2s_ease-in-out_infinite]"
                            style={{ animationDelay: `${index * 0.5 + idx * 0.2}s` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Enhanced hover effect indicators */}
              <div 
                className={cn(
                  "absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  hovered === skillCategory.category ? "animate-pulse-slow" : ""
                )}
              ></div>
              <div 
                className={cn(
                  "absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-accent to-primary rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100",
                  hovered === skillCategory.category ? "animate-pulse-slow" : ""
                )}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
