/** Smooth ease-out curve for layout fades (no color/design change). */
const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
      duration: 0.5,
      ease: easeOutExpo,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 32,
    rotateX: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 32,
      mass: 0.85,
      delay: 0.35,
    },
  },
};

export const contentVariants = {
  hidden: {
    opacity: 0,
    y: 32,
    rotateX: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 32,
      mass: 0.85,
      delay: 0.12,
    },
  },
};

/** Staggered children inside profile card (mobile); desktop uses zero stagger / no travel. */
export function userCardInnerVariants(isMobile: boolean) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isMobile ? 0.085 : 0,
        delayChildren: isMobile ? 0.08 : 0,
      },
    },
  };
}

export function userCardRowVariants(isMobile: boolean) {
  return {
    hidden: {
      opacity: isMobile ? 0 : 1,
      y: isMobile ? 18 : 0,
      scale: isMobile ? 0.98 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.5 : 0,
        ease: easeOutExpo,
      },
    },
  };
}

export function userCardAvatarVariants(isMobile: boolean) {
  return {
    hidden: {
      opacity: isMobile ? 0 : 1,
      scale: isMobile ? 0.92 : 1,
      y: isMobile ? 12 : 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.55 : 0,
        ease: easeOutExpo,
      },
    },
  };
}

