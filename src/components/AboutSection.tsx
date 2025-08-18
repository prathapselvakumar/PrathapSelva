
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Liquid glass background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 liquid-morph-1 bg-gradient-to-br from-primary/10 to-accent/5 filter blur-3xl animate-liquid-flow"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 liquid-morph-2 bg-gradient-to-tr from-accent/10 to-primary/5 filter blur-3xl animate-liquid-flow"></div>
      
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            About <span className="highlight-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Get to know more about my background, education, and career goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Bio Section */}
          <Card className={cn(
            "liquid-glass-card card-hover animate-fade-in",
            "border-l-4 border-l-primary"
          )}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Personal Bio</h3>
              <p className="mb-4 text-foreground/80">
               I am Prathap Selvakumar, a Software Engineer with a deep passion for the intersection of robotics and artificial intelligence. 
              </p>
              <p className="text-foreground/80">
              With a strong foundation in computer science and hands-on industry experience, I aspire to contribute to the development of intelligent robotic systems that enhance automation, improve precision, and drive innovation across various industries
              </p>
            </CardContent>
          </Card>
          
          {/* Career Goals */}
          <Card className={cn(
            "liquid-glass-card card-hover animate-fade-in animation-delay-100",
            "border-l-4 border-l-accent"
          )}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Career Goals</h3>
              <p className="text-foreground/80">
             I am actively pursuing opportunities for higher education abroad to deepen my expertise in the fields of Artificial Intelligence and Robotics. My ultimate goal is to contribute to groundbreaking research and development that leads to intelligent robotic systems capable of solving real-world challenges, driving innovation, and improving the quality of life across diverse domains.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
