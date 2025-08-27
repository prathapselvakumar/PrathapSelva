import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  type: string;
  technologies: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "Agro Analytics",
    description: "This module implements a SARIMA (Seasonal AutoRegressive Integrated Moving Average) model for time series forecasting of temperature data. The implementation includes data preprocessing, model training with configurable hyperparameters, and comprehensive evaluation using MAE and RMSE metrics. The solution features interactive visualization of training/testing splits, forecasted values, and 95% confidence intervals through a Streamlit-based web interface.",
    type: "NUS Intern",
    technologies: ["Python", "XGBoost",],
  },
  {
    id: 2,
    title: "Audio Search Engine",
    description: "This project analyzes audio by converting it into hash tokens, compares them with live input, and matches the results against the database.",
    type: "College Project",
    technologies: ["Python"],
  },
  {
    id: 3,
    title: "Snake Detection using Deep Learning",
    description: "The Snake Detection Project focuses on identifying snakes in real-time using computer vision and machine learning. The system processes live video or image input, detects the presence of snakes, and alerts users to potential danger. By leveraging deep learning models trained on a dataset of snake images, the project aims to enhance safety in rural and agricultural areas where snake encounters are common.",
    type: "College Project",
    technologies: ["Python", "TensorFlow", "Deep Learning"],
  },
  {
    id: 4,
    title: "Predictive Analytics Models",
    description: "Developed machine learning models for predictive analytics at Qentelli Solutions.",
    type: "ML/AI Project",
    technologies: ["Python", "Machine Learning", "Data Science"],
  },
];


export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const projectCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  // Handle mouse move effect on project cards for 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, ref: HTMLDivElement) => {
    const rect = ref.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    ref.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = (ref: HTMLDivElement) => {
    ref.style.transition = 'transform 0.5s ease';
    ref.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    
    setTimeout(() => {
      ref.style.transition = '';
    }, 500);
  };

  // Parallax effect for background elements
  const handleSectionScroll = () => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollPosition = window.scrollY;
    const sectionTop = rect.top + scrollPosition;
    const offset = scrollPosition - sectionTop;
    
    // Apply parallax to background elements
    const backgroundElements = sectionRef.current.querySelectorAll('.parallax-bg');
    backgroundElements.forEach((element, index) => {
      const speed = index % 2 === 0 ? 0.05 : 0.08;
      const yPos = offset * speed;
      (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
    });
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
    
    // Add scroll listener for parallax effect
    window.addEventListener('scroll', handleSectionScroll);
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('scroll', handleSectionScroll);
    };
  }, []);
  
  return (
    <section ref={sectionRef} id="projects" className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Liquid glass animated background elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-circuit-pattern opacity-5"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 liquid-morph-1 bg-gradient-to-br from-primary/5 to-accent/2 filter blur-3xl animate-liquid-pulse parallax-bg"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 liquid-morph-2 bg-gradient-to-tr from-accent/5 to-primary/2 filter blur-3xl animate-liquid-pulse delay-700 parallax-bg"></div>
        
        {/* Dynamic grid lines with parallax */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-horizontal-bounce parallax-bg"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-wave parallax-bg"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12 text-center">
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4",
            isVisible ? "animate-text-reveal" : "opacity-0"
          )}>
<span className="highlight-text">Projects</span>
          </h2>
          <p className={cn(
            "text-muted-foreground max-w-2xl mx-auto",
            isVisible ? "animate-text-reveal" : "opacity-0"
          )} style={{ animationDelay: "100ms" }}>
            Showcasing my technical projects and development work.
          </p>
        </div>
        
        {/* Projects Grid with enhanced 3D animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" ref={cardsRef}>
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              ref={el => projectCardRefs.current[index] = el}
              className={cn(
                "liquid-glass-card relative group overflow-hidden tilt-card",
                index % 2 === 0 ? "border-l-4 border-l-primary" : "border-l-4 border-l-accent",
                isVisible ? "animate-fade-in" : "opacity-0"
              )} 
              style={{ 
                animationDelay: `${index * 150}ms`,
                transition: 'transform 0.1s ease'
              }}
              onMouseMove={(e) => {
                const card = projectCardRefs.current[index];
                if (card) handleMouseMove(e, card);
              }}
              onMouseLeave={() => {
                const card = projectCardRefs.current[index];
                if (card) handleMouseLeave(card);
              }}
            >
              {/* Enhanced background animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-circuit-pattern opacity-0 group-hover:opacity-5 transition-opacity duration-700 -z-10"></div>
              
              {/* Tech connection animated lines */}
              <div className="absolute -bottom-3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 delay-200"></div>
              
              <CardHeader className="relative z-10">
                <CardTitle className="transition-transform duration-300 group-hover:-translate-y-1">{project.title}</CardTitle>
                <CardDescription className="transition-all duration-300 group-hover:text-primary">{project.type}</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-foreground/80 mb-4 transition-all duration-300 group-hover:text-foreground">{project.description}</p>
              </CardContent>
              <CardFooter className="relative z-10">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <Badge 
                      key={i} 
                      variant="secondary" 
                      className="transition-all duration-500 hover:bg-primary hover:text-primary-foreground"
                      style={{ 
                        transitionDelay: `${i * 50}ms`,
                        transform: `translateY(${isVisible ? '0' : '10px'})`,
                        opacity: isVisible ? 1 : 0
                      }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
      </div>
    </section>
  );
}