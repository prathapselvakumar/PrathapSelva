import { useState } from "react";
import { cn } from "@/lib/utils";

type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string[];
  achievements: string[];
  cgpa?: string;
};

const education: EducationItem[] = [
  {
    id: "msc-robotics",
    degree: "MSc Robotics",
    institution: "University of Manchester",
    period: "2025 - 2026",
    description: [
      "Advanced study in robotics systems, autonomous navigation, and intelligent control",
      "Research focus on AI-driven robotic applications and human-robot interaction",
      "Hands-on experience with cutting-edge robotics hardware and simulation environments",
      "Collaborative projects with industry partners and research institutions"
    ],
    achievements: ["Admitted to prestigious MSc program", "Research opportunities", "Industry collaborations"],
  },
  {
    id: "btech-cse",
    degree: "B.Tech in Computer Science and Engineering",
    institution: "SRM Institute of Science and Technology",
    period: "2021 - 2025",
    cgpa: "8.49",
    description: [
      "Comprehensive study of computer science fundamentals including algorithms, data structures, and software engineering",
      "Specialized coursework in artificial intelligence, machine learning, and robotics",
      "Hands-on experience with various programming languages and development frameworks",
      "Strong foundation that prepared for advanced robotics studies"
    ],
    achievements: ["CGPA: 8.49", "Dean's List Recognition", "Active participation in technical societies"],
  },
];

export default function EducationSection() {
  const [activeTab, setActiveTab] = useState(education[0].id);

  return (
    <section id="education" className="section-padding relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 liquid-morph-1 bg-gradient-to-br from-accent/5 to-primary/2 filter blur-3xl animate-liquid-flow"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 liquid-morph-2 bg-gradient-to-tr from-primary/5 to-accent/2 filter blur-3xl animate-liquid-flow"></div>
      
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Educational <span className="highlight-text">Background</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            My academic journey and educational achievements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tabs for larger screens */}
          <div className="hidden lg:flex lg:col-span-4 flex-col border-r border-border pr-4 space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="relative">
                <button
                  onClick={() => setActiveTab(edu.id)}
                  className={cn(
                    "w-full liquid-glass-card p-6 cursor-pointer transition-all duration-300 relative",
                    "hover:scale-[1.02] transform transition-transform duration-200",
                    activeTab === edu.id 
                      ? "border-l-4 border-l-accent bg-accent/5 shadow-md" 
                      : "border-l-4 border-l-transparent hover:border-l-primary hover:bg-primary/5"
                  )}
                >
                  <div className={cn(
                    "absolute left-0 top-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_3px_rgba(99,102,241,0.5)] transition-all duration-300",
                    activeTab === edu.id ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  )}></div>
                  <div className="pl-2">
                    <h3 className="font-semibold text-sm leading-tight">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{edu.institution}</p>
                    {edu.cgpa && (
                      <p className="text-xs text-primary mt-1">CGPA: {edu.cgpa}</p>
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
          
          {/* Tabbed content */}
          <div className="lg:col-span-8 lg:pl-6">
            {/* Mobile tabs */}
            <div className="lg:hidden mb-6 overflow-x-auto flex gap-2 pb-2">
              {education.map((edu) => (
                <button
                  key={edu.id}
                  onClick={() => setActiveTab(edu.id)}
                  className={cn(
                    "px-4 py-2 whitespace-nowrap text-sm rounded-full transition-colors",
                    activeTab === edu.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                >
                  {edu.degree.split(' ')[0]} {/* Show abbreviated version */}
                </button>
              ))}
            </div>
            
            {/* Content */}
            {education.map((edu) => (
              <div
                key={edu.id}
                className={cn(
                  "transition-all duration-300",
                  activeTab === edu.id ? "animate-fade-in" : "hidden"
                )}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-accent font-medium">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground mt-1">{edu.period}</p>
                  {edu.cgpa && (
                    <p className="text-sm text-primary mt-1 font-medium">CGPA: {edu.cgpa}</p>
                  )}
                </div>
                
                <div className="mb-8">
                  <h4 className="text-sm font-semibold mb-3">Description</h4>
                  <ul className="space-y-2">
                    {edu.description.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 p-4">
                      <h4 className="text-sm font-medium mb-3 text-foreground/80">Key Achievements</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map((achievement, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1.5 text-xs font-medium rounded-full border border-border/30 
                                     bg-background/40 backdrop-blur-sm hover:bg-background/60 
                                     transition-all duration-300 hover:shadow-sm text-foreground/90"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
