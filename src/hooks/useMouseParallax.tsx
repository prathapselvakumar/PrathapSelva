
import { useEffect, useState, RefObject } from 'react';

interface UseMouseParallaxOptions {
  enabled?: boolean;
  refs: Array<{
    ref: RefObject<HTMLDivElement>;
    factor: number;
    direction?: 'normal' | 'reverse';
  }>;
}

export default function useMouseParallax(
  containerRef: RefObject<HTMLDivElement>,
  options: UseMouseParallaxOptions
) {
  const { enabled = true, refs } = options;
  const [mouseMoveEnabled, setMouseMoveEnabled] = useState(enabled);
  
  useEffect(() => {
    if (!mouseMoveEnabled) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Calculate mouse position relative to the section
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate offsets based on distance from center (-1 to 1 range)
      const xOffset = ((x / rect.width) - 0.5) * 2;
      const yOffset = ((y / rect.height) - 0.5) * 2;
      
      // Apply the transform to various elements
      refs.forEach(({ ref, factor, direction = 'normal' }) => {
        if (ref.current) {
          const directionMultiplier = direction === 'reverse' ? -1 : 1;
          const currentTransform = ref.current.style.transform || '';
          const baseTransform = currentTransform.split(') translate(')[0] || '';
          const translateX = xOffset * factor * directionMultiplier;
          const translateY = yOffset * factor * directionMultiplier;
          
          ref.current.style.transform = `${baseTransform ? baseTransform + ') ' : ''}translate(${translateX}px, ${translateY}px)`;
        }
      });
    };

    // Disable mouse parallax on mobile devices
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      setMouseMoveEnabled(false);
      return;
    }

    containerRef.current?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseMoveEnabled, refs, containerRef]);
  
  return { mouseMoveEnabled };
}
