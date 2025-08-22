
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = navigation.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-[9999] w-full transition-all duration-500 ease-out",
          scrolled
            ? "liquid-glass-nav py-3 shadow-lg backdrop-blur-xl"
            : "bg-transparent py-6"
        )}
        style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button - Hidden on desktop */}
              <div className="lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={cn(
                    "liquid-glass-button p-2 rounded-xl transition-all duration-300",
                    mobileMenuOpen ? "rotate-180 scale-110" : "hover:scale-105"
                  )}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>

              {/* Logo - Visible on all screen sizes */}
              <div className="flex-shrink-0 z-10">
                <a 
                  href="#home" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#home");
                  }}
                  className="group flex items-center space-x-2 text-xl md:text-2xl font-bold font-poppins transition-all duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <span className="highlight-text bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-liquid-flow">
                      Prathap
                    </span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>
                  <span className="text-foreground/90 group-hover:text-foreground transition-colors duration-300">
                    SK
                  </span>
                </a>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 ml-auto">
              <nav className="flex items-center space-x-1">
                {navigation.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 group",
                        isActive
                          ? "text-primary bg-primary/10 shadow-lg"
                          : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                      )}
                    >
                      <span className="relative z-10">{item.name}</span>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-xl animate-liquid-pulse"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Theme Toggle - Visible on all screens */}
            <div className="liquid-glass-card p-2 rounded-xl ml-4">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        
        {/* Mobile Menu Panel */}
        <div
          className={cn(
            "absolute top-0 left-0 h-full w-80 max-w-[85vw] liquid-glass transform transition-all duration-500 ease-out lg:hidden",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full pt-20 pb-6 px-6">
            {/* Mobile Navigation */}
            <nav className="flex-1 space-y-2">
              {navigation.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={cn(
                      "group flex items-center justify-between px-4 py-4 text-base font-medium rounded-xl transition-all duration-300",
                      isActive
                        ? "text-primary bg-primary/10 liquid-glass-card"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="animate-fade-in">{item.name}</span>
                    {isActive && (
                      <ChevronDown className="h-4 w-4 rotate-[-90deg] animate-liquid-pulse" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Mobile Footer */}
            <div className="pt-6 border-t border-border/20">
              <div className="text-center text-sm text-muted-foreground">
                <p className="font-medium">Prathap Selvakumar</p>
                <p className="mt-1">AI Enthusiast | Robotics | Software Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
