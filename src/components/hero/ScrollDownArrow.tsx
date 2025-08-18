
import { ArrowDown } from "lucide-react";

export default function ScrollDownArrow() {
  return (
    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce">
      <a 
        href="#about" 
        className="text-foreground/60 hover:text-primary transition-colors group"
        aria-label="Scroll down"
      >
        <ArrowDown size={24} className="group-hover:animate-bounce" />
      </a>
    </div>
  );
}
