import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 300,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const slideIn = (direction: 'left' | 'right' | 'up' | 'down' = 'left'): Variants => ({
  hidden: {
    x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
    y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
    opacity: 0,
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 300,
    },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 300,
    },
  },
};
