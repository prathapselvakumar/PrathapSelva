import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, ExternalLink } from "lucide-react";

type CertificationItem = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string[];
  skills: string[];
  credentialId?: string;
  verificationUrl?: string;
  category: string;
};

const certifications: CertificationItem[] = [
  {
    id: "big-data-deep-learning",
    title: "Big Data Analytics Using Deep Learning",
    issuer: "National University of Singapore",
    date: "2023",
    category: "AI/ML",
    description: [
      "Advanced techniques in deep learning for big data processing and analysis",
      "Hands-on experience with neural networks and large-scale data processing",
      "Implementation of deep learning models for real-world data analytics challenges"
    ],
    skills: ["Deep Learning", "Big Data", "Python", "TensorFlow", "Data Analytics"],
  },
  {
    id: "aws-sagemaker",
    title: "AWS Certified – SageMaker",
    issuer: "Amazon Web Services",
    date: "2023",
    category: "Cloud/ML",
    description: [
      "Comprehensive understanding of AWS SageMaker for machine learning workflows",
      "Experience in building, training, and deploying ML models on AWS cloud",
      "Knowledge of MLOps practices and automated ML pipelines"
    ],
    skills: ["AWS SageMaker", "Cloud Computing", "MLOps", "Machine Learning", "Model Deployment"],
  },
  {
    id: "python-programming",
    title: "Python for Data Science and AI",
    issuer: "IBM",
    date: "2023",
    category: "Programming",
    description: [
      "Comprehensive Python programming for data science applications",
      "Libraries and frameworks for AI and machine learning development",
      "Data manipulation, analysis, and visualization techniques"
    ],
    skills: ["Python", "Data Science", "Pandas", "NumPy", "Matplotlib", "AI Development"],
  },
  {
    id: "react-development",
    title: "React.js Development Certification",
    issuer: "Meta",
    date: "2024",
    category: "Web Development",
    description: [
      "Modern React.js development patterns and best practices",
      "Component architecture and state management",
      "Building scalable and performant web applications"
    ],
    skills: ["React.js", "JavaScript", "Frontend Development", "Component Design", "State Management"],
  },
];

const categories = ["All", "AI/ML", "Cloud/ML", "Programming", "Web Development"];

export default function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredCertifications = activeCategory === "All" 
    ? certifications 
    : certifications.filter(cert => cert.category === activeCategory);

  const handleMouseMove = (e: React.MouseEvent, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 80; // Further reduced from /30 to /80
    const rotateY = (centerX - x) / 80; // Further reduced from /30 to /80

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(1px)`; // Further reduced translateZ from 3px to 1px
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <section id="certifications" className="section-padding relative overflow-hidden" ref={sectionRef}>
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 liquid-morph-1 bg-gradient-to-br from-primary/5 to-accent/2 filter blur-3xl animate-liquid-flow"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 liquid-morph-2 bg-gradient-to-tr from-accent/5 to-primary/2 filter blur-3xl animate-liquid-flow"></div>
      
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4",
            isVisible ? "animate-text-reveal" : "opacity-0"
          )}>
            Professional <span className="highlight-text">Certifications</span>
          </h2>
          <p className={cn(
            "text-muted-foreground max-w-2xl mx-auto",
            isVisible ? "animate-text-reveal" : "opacity-0"
          )} style={{ animationDelay: "100ms" }}>
            Industry-recognized certifications demonstrating expertise across various technologies and domains.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCertifications.map((cert, index) => (
            <Card 
              key={cert.id}
              ref={el => cardRefs.current[index] = el}
              className={cn(
                "liquid-glass-card card-hover group tilt-card",
                "border-l-4 border-l-accent",
                isVisible ? "animate-fade-in" : "opacity-0"
              )}
              style={{ 
                animationDelay: `${index * 150}ms`,
                transition: 'transform 0.1s ease'
              }}
              onMouseMove={(e) => {
                const card = cardRefs.current[index];
                if (card) handleMouseMove(e, card);
              }}
              onMouseLeave={() => {
                const card = cardRefs.current[index];
                if (card) handleMouseLeave(card);
              }}
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Floating accent elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-bl-3xl scale-0 group-hover:scale-100 transition-transform duration-500 origin-top-right"></div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="mb-2">
                    {cert.category}
                  </Badge>
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <CardTitle className="text-lg leading-tight transition-transform duration-300 group-hover:-translate-y-1">
                  {cert.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <span className="font-medium text-accent">{cert.issuer}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Key Learning Areas</h4>
                  <ul className="space-y-1 text-sm text-foreground/80">
                    {cert.description.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-accent mr-2 text-xs">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-2">Skills Acquired</h4>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {cert.verificationUrl && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <a 
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Verify Credential
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
