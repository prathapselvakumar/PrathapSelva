import { useState, useEffect } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize theme - default to system
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    
    if (storedTheme && ["light", "dark", "system"].includes(storedTheme)) {
      setTheme(storedTheme);
    } else {
      // Default to system theme
      setTheme("system");
      localStorage.setItem("theme", "system");
    }
  }, []);

  // Apply theme to DOM
  useEffect(() => {
    const applyTheme = (themeToApply: "light" | "dark" | "system") => {
      // Remove existing theme classes
      document.documentElement.classList.remove("dark");
      
      if (themeToApply === "system") {
        // Use system preference
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (systemPrefersDark) {
          document.documentElement.classList.add("dark");
        }
      } else if (themeToApply === "dark") {
        document.documentElement.classList.add("dark");
      }
      // For light theme, we don't add any class (default)
    };

    if (mounted) {
      applyTheme(theme);
      localStorage.setItem("theme", theme);
    }

    // Listen for system theme changes when using system theme
    if (theme === "system" && mounted) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    // Cycle through: system -> light -> dark -> light
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    if (!mounted) {
      // Return a default icon during SSR/hydration
      return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    }

    if (theme === "system") {
      return <Monitor className="h-[1.2rem] w-[1.2rem]" />;
    } else if (theme === "light") {
      return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    } else {
      return <Moon className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  const getThemeLabel = () => {
    if (theme === "system") {
      const systemPrefersDark = mounted && window.matchMedia("(prefers-color-scheme: dark)").matches;
      return `System (${systemPrefersDark ? 'Dark' : 'Light'})`;
    }
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  return (
    <Button 
      onClick={toggleTheme} 
      variant="ghost" 
      size="icon" 
      className="rounded-full w-10 h-10 bg-secondary/50 text-foreground transition-all duration-200 hover:bg-secondary/80"
      aria-label={`Toggle theme (current: ${getThemeLabel()})`}
      title={`Current theme: ${getThemeLabel()}`}
    >
      {getIcon()}
    </Button>
  );
}

export default ThemeToggle;