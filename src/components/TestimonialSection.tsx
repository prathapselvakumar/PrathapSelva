import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  category: string;
};

const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Dr. B Aarthi",
    role: "Assistant Professor and Faculty Advisor",
    company: "SRM Institute of Science and Technology",
    category: "Academic",
    content: "Prathap was one of the most promising students in my Advanced Algorithms class. His analytical thinking and problem-solving approach set him apart. He consistently demonstrated deep understanding and creativity in his projects.",
   
  },
  {
    id: "testimonial-2",
    name: "Mrs. Sridevi S",
    role: "Assistant Professor",
    company: "SRM Institute of Science and Technology",
    category: "Academic",
    content: "As Prathap's thesis advisor, I was impressed by his dedication and innovative thinking. His research on machine learning applications showed remarkable depth and practical relevance.",
    
  },
  {
    id: "testimonial-3",
    name: "Faritha Banu",
    role: "Head of Department - CSE",
    company: "SRM Institute of Science and Technology",
    category: "Academic",
    content: "Prathap's enthusiasm for learning and his ability to grasp complex concepts quickly made him stand out. His project on algorithm optimization was exceptional.",
    
  },
  {
    id: "testimonial-4",
    name: "Mohan Raj",
    role: "Senior IOS Developer",
    company: "C-Square Info Solutions",
    category: "Professional",
    content: "Working with Prathap was a great experience. His problem-solving skills and attention to detail helped us deliver the project ahead of schedule. Highly recommended for any development role.",
    avatar: "/Mohan Raj.jpeg"
  },
  {
    id: "testimonial-5",
    name: "Vijay Kanna",
    role: "Software Developer",
    company: "C-Square Info Solutions",
    category: "Professional",
    content: "Prathap's technical expertise and collaborative approach made a significant impact on our team. He consistently delivered high-quality work and was always willing to help teammates.",
    
  },
  {
    id: "testimonial-6",
    name: "Aneeze",
    role: "Senior Android Developer",
    company: "C-Square Info Solutions",
    category: "Professional",
    content: "Exceptional developer with a keen eye for detail. Prathap's ability to understand complex requirements and translate them into efficient code is impressive. A valuable asset to any team.",
    
  }
];

const categories = ["All", "Academic", "Professional"];

export default function TestimonialSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const filteredTestimonials = activeCategory === "All" 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.category === activeCategory);

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
    <section id="testimonials" className="section-padding relative overflow-hidden" ref={sectionRef}>
      {/* Subtle background decoration */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Words from <span className="highlight-text">Mentors & Peer</span>
          </h2>
          <p className={cn(
            "text-lg text-muted-foreground mt-4",
            isVisible ? "animate-fade-in-up delay-100" : "opacity-0"
          )}>
            Here's what colleagues and mentors have to say about working with me.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-border/30",
                activeCategory === category
                  ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/30 shadow-lg"
                  : "bg-background/50 hover:bg-accent/5 text-muted-foreground hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              ref={el => cardRefs.current[index] = el}
              className={cn(
                "h-full transition-all duration-300 ease-out",
                isVisible ? `animate-fade-in-up delay-${100 + (index * 100)}` : "opacity-0"
              )}
              onMouseMove={(e) => cardRefs.current[index] && handleMouseMove(e, cardRefs.current[index]!)}
              onMouseLeave={() => cardRefs.current[index] && handleMouseLeave(cardRefs.current[index]!)}
            >
              <Card className="h-full flex flex-col liquid-glass-card overflow-hidden group transition-all duration-300">
                <CardContent className="p-6 flex-1 flex flex-col relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20 bg-muted/50 flex items-center justify-center">
                      {testimonial.avatar ? (
                        <img 
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 text-foreground font-medium text-lg">
                          {testimonial.name
                            .split(' ')
                            .map(word => word[0])
                            .join('')
                            .toUpperCase()}
                        </div>
                      )}
                      {testimonial.avatar && (
                        <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 text-foreground font-medium text-lg">
                          {testimonial.name
                            .split(' ')
                            .map(word => word[0])
                            .join('')
                            .toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground font-medium">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-muted-foreground/80">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative pl-6 mt-4 flex-1">
                    <Quote className="absolute left-0 top-0.5 w-5 h-5 text-primary/50 transition-transform duration-300 group-hover:scale-110" />
                    <p className="text-foreground/90 text-sm leading-relaxed">{testimonial.content}</p>
                  </div>
                </CardContent>
                
                <div className="px-6 pb-6 pt-2 mt-auto">
                  <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent w-full my-2"></div>
                  <div className="flex justify-end">
                    <Badge variant="outline" className="text-xs">
                      {testimonial.category}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
