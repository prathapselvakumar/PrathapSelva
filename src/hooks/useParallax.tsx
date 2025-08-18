
import { useEffect, useState } from 'react';

type ParallaxOptions = {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  reverse?: boolean;
  transition?: boolean;
};

export const useParallax = (
  ref: React.RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) => {
  const { speed = 0.1, direction = 'up', reverse = false, transition = true } = options;
  const [offset, setOffset] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!ref.current) return;
    
    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;
      
      // Calculate scroll position relative to the element
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the element is in view (0 to 1)
      const viewFactor = 1 - (elementTop / (windowHeight + elementHeight));
      
      // Only calculate parallax when element is in view
      if (viewFactor > 0 && viewFactor < 1) {
        const newOffset = viewFactor * 100 * speed * (reverse ? -1 : 1);
        setOffset(newOffset);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Calculate initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, speed, reverse]);
  
  const getStyle = () => {
    const transform = getTransform();
    return {
      transform,
      transition: transition ? 'transform 0.3s ease-out' : 'none'
    };
  };
  
  const getTransform = () => {
    let baseTransform = '';
    switch (direction) {
      case 'up': baseTransform = `translateY(-${offset}px)`; break;
      case 'down': baseTransform = `translateY(${offset}px)`; break;
      case 'left': baseTransform = `translateX(-${offset}px)`; break;
      case 'right': baseTransform = `translateX(${offset}px)`; break;
      default: baseTransform = `translateY(-${offset}px)`;
    }
    return baseTransform;
  };
  
  return { style: getStyle(), offset, mouseOffset };
};

export default useParallax;
