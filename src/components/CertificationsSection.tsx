import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Document, Page, pdfjs } from "react-pdf";
import { Calendar, Award, ExternalLink } from "lucide-react";

// We'll set the worker at runtime using a Blob URL to avoid bundler path issues

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
    id: "python-flask",
    title: "Python And Flask Framework Complete Course For Beginners",
    issuer: "UDEMY",
    date: "2023",
    category: "Web Development",
    description: [
      "Comprehensive introduction to Python programming language",
      "Building web applications using Flask framework",
      "Hands-on projects for practical experience"
    ],
    skills: ["Python", "Flask", "Web Development", "Backend"],
    verificationUrl: "/Python%20And%20Flask%20Framework%20Complete%20Course%20For%20Beginners.pdf",
  },
  {
    id: "excel-basics",
    title: "Introduction to Microsoft Excel",
    issuer: "Coursera",
    date: "2023",
    category: "Productivity",
    description: [
      "Fundamentals of Microsoft Excel",
      "Data organization and analysis",
      "Basic formulas and functions"
    ],
    skills: ["Microsoft Excel", "Data Analysis", "Spreadsheets", "Productivity Tools"],
    verificationUrl: "/An%20Introduction%20to%20%20Excel.pdf",
  },
  {
    id: "javascript-ibm",
    title: "JavaScript Programming",
    issuer: "IBM",
    date: "2023",
    category: "Programming",
    description: [
      "Core JavaScript programming concepts",
      "Client-side web development",
      "Interactive web applications"
    ],
    skills: ["JavaScript", "Web Development", "Frontend"],
    verificationUrl: "/IBMCE%20CEJS1IN%20Certificate%20%EF%80%A7%20IBM.pdf",
  },
  {
    id: "prompt-engineering",
    title: "Introduction to Prompt Engineering for Generative AI",
    issuer: "LinkedIn Learning",
    date: "2023",
    category: "AI/ML",
    description: [
      "Fundamentals of prompt engineering",
      "Techniques for effective AI interactions",
      "Best practices for generative AI applications"
    ],
    skills: ["AI", "Prompt Engineering", "Generative AI", "Machine Learning"],
    verificationUrl: "/Introduction%20to%20Prompt%20Engineering.pdf",
  },
  {
    id: "numpy-pandas",
    title: "NumPy & Pandas in Python",
    issuer: "UDEMY",
    date: "2022",
    category: "Data Science",
    description: [
      "Data manipulation with NumPy and Pandas",
      "Data analysis techniques",
      "Practical applications and projects"
    ],
    skills: ["Python", "NumPy", "Pandas", "Data Analysis"],
    verificationUrl: "/Numpy%20Pandas%20in%20Python.pdf",
  },
  {
    id: "js-axix-intellects",
    title: "JavaScript Programming",
    issuer: "SRM AXIS Intellects",
    date: "2022",
    category: "Programming",
    description: [
      "JavaScript fundamentals",
      "Web development concepts",
      "Practical programming exercises"
    ],
    skills: ["JavaScript", "Web Development", "Programming"],
    verificationUrl: "/SRM%20Axis%20Java%20Script.pdf",
  },
  {
    id: "c-programming-scratch-to-master",
    title: "C Programming from Scratch to Master",
    issuer: "UDEMY",
    date: "2024",
    category: "Programming",
    description: [
      "C language fundamentals: variables, data types, control flow",
      "Pointers, arrays, strings, and memory management",
      "Functions, structures, files, and modular programming"
    ],
    skills: ["C", "Pointers", "Memory Management", "Problem Solving"],
    verificationUrl: "/C%20Programming%20Language.pdf",
  },
  {
    id: "basics-of-python-c-square",
    title: "Basics of Python",
    issuer: "C-SQUARE Info Solutions",
    date: "2023",
    category: "Programming",
    description: [
      "Core Python syntax and control structures",
      "Functions, modules, and file handling",
      "Hands-on practice with basic scripts"
    ],
    skills: ["Python", "Scripting", "Problem Solving"],
    verificationUrl: "/Basics%20of%20Python%20C-SQUARE.pdf",
  },
  {
    id: "power-bi-fundamentals",
    title: "Power BI Fundamentals",
    issuer: "Microsoft Power BI",
    date: "2023",
    category: "Data Science",
    description: [
      "Data import, modeling, and DAX basics",
      "Interactive dashboards and reports",
      "Publishing and sharing insights"
    ],
    skills: ["Power BI", "Data Modeling", "Dashboards"],
    verificationUrl: "/Power%20Bi%20.pdf",
  },
  {
    id: "srm-axis-ml-big-data",
    title: "Machine Learning and Big Data",
    issuer: "SRM AXIS",
    date: "2022",
    category: "AI/ML",
    description: [
      "ML fundamentals and workflows",
      "Introduction to big data concepts",
      "Practical applications and use cases"
    ],
    skills: ["Machine Learning", "Big Data", "Data Processing"],
    verificationUrl: "/SRM%20AXIS-%20Machine%20Learning%20and%20Big%20Data.pdf",
  },
  {
    id: "shah-1353-prathap-s",
    title: "SHAH - 1353 PRATHAP S",
    issuer: "SHAH",
    date: "2023",
    category: "Programming",
    description: [
      "Certification awarded to PRATHAP S",
      "Demonstrated competence as per SHAH program"
    ],
    skills: ["Problem Solving"],
    verificationUrl: "/SHAH%20-%201353%20PRATHAP%20S.pdf",
  },
];

const categories = ["All", "AI/ML", "Programming", "Web Development", "Data Science", "Productivity"];

export default function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewUrl, setViewUrl] = useState<string | null>(null);
  const [viewTitle, setViewTitle] = useState<string>("");
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState<number>(1);
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [workerReady, setWorkerReady] = useState(false);

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

  // Measure container width when viewer opens and on resize
  useEffect(() => {
    if (!viewerOpen) return;
    const el = viewerContainerRef.current;
    if (!el) return;

    const measure = () => setContainerWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [viewerOpen]);

  // Initialize PDF.js worker from /public/pdf.worker.min.js as a Blob URL
  useEffect(() => {
    let canceled = false;
    let objectUrl: string | null = null;
    (async () => {
      try {
        setWorkerReady(false);
        const res = await fetch('/pdf.worker.min.js', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Worker HTTP ${res.status}`);
        const blob = await res.blob();
        objectUrl = URL.createObjectURL(blob);
        pdfjs.GlobalWorkerOptions.workerSrc = objectUrl as unknown as string;
        if (!canceled) setWorkerReady(true);
      } catch (e: any) {
        console.error('Failed to initialize pdf worker from /pdf.worker.min.js', e);
        setPdfError('Failed to initialize PDF worker. Ensure pdf.worker.min.js is in the public/ folder.');
      }
    })();
    return () => {
      canceled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  // Load PDF as ArrayBuffer to avoid browser PDF viewer and encoding pitfalls
  useEffect(() => {
    const load = async () => {
      if (!viewerOpen || !viewUrl) {
        setPdfData(null);
        setPdfError(null);
        return;
      }
      try {
        setPdfError(null);
        setPdfData(null);
        // Resolve URL robustly for Vite dev/prod and handle spaces/special chars
        const isAbsolute = /^(https?:)?\/\//i.test(viewUrl);
        let encodedPath = viewUrl;
        if (!isAbsolute) {
          const base = (import.meta as any).env?.BASE_URL || "/";
          // Remove leading slash to safely join with base
          const cleaned = viewUrl.replace(/^\//, "");
          const joined = new URL(base, window.location.origin).toString().replace(/\/$/, "/") + cleaned;
          encodedPath = encodeURI(joined);
        }
        const res = await fetch(encodedPath, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = await res.arrayBuffer();
        setPdfData(buf);
      } catch (err: any) {
        console.error('Failed to fetch PDF from', viewUrl, err);
        setPdfError('Failed to load PDF. Please verify the file path in public/ and filename encoding.');
      }
    };
    load();
  }, [viewerOpen, viewUrl]);

  const filteredCertifications = activeCategory === "All" 
    ? certifications 
    : certifications.filter(cert => {
        // Handle special characters in category names
        const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
        return normalize(cert.category) === normalize(activeCategory);
      });

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
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            // Normalize for comparison
            const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
            const isActive = normalize(activeCategory) === normalize(category);
            
            return (
              <div className="relative" key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border relative z-10 cursor-pointer",
                    isActive
                      ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/30 shadow-lg"
                      : "bg-background/50 hover:bg-accent/5 text-muted-foreground hover:text-foreground border-border/30"
                  )}
                >
                  {category}
                </button>
              </div>
            );
          })}
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
                  <Badge variant="outline" className="text-xs mb-2">
                    {cert.category}
                  </Badge>
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg leading-tight transition-transform duration-300 group-hover:-translate-y-1">
                    {cert.title}
                  </CardTitle>
                </div>
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
                
                <div className="mt-6 pt-4 border-t border-border flex justify-end">
                  <Button
                    size="sm"
                    className="whitespace-nowrap"
                    aria-label={`View certificate for ${cert.title}`}
                    onClick={() => {
                      const baseUrl = cert.verificationUrl || `/lovable-uploads/${cert.id}.pdf`;
                      const fitParam = 'zoom=page-width';
                      const viewerUrl = baseUrl.includes('#') ? `${baseUrl}&${fitParam}` : `${baseUrl}#${fitParam}`;
                      setViewUrl(viewerUrl);
                      setViewTitle(cert.title);
                      setViewerOpen(true);
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* In-page PDF Viewer */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-3xl w-[90vw] top-[60%] sm:top-[55%]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between w-full pr-10 gap-3">
              <span className="truncate max-w-[70%] sm:max-w-[75%] md:max-w-[80%]">
                {viewTitle || "Certificate"}
              </span>
            </DialogTitle>
          </DialogHeader>
          <div
            ref={viewerContainerRef}
            className="w-full h-[65vh] rounded-md overflow-hidden border border-border bg-background"
          >
            {viewUrl ? (
              <iframe
                src={viewUrl}
                className="w-full h-full"
                title={viewTitle || "Certificate"}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">No document available</div>
            )}
          </div>
          <div className="px-4 py-3 border-t border-border flex justify-end">
            {viewUrl && (
              <a
                href={viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-primary/80"
              >
                Open in new tab
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
