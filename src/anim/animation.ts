export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 25,
      duration: 0.9,
      delay: 0.6,
    },
  },
};

export const contentVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 25,
      duration: 0.5,
      delay: 0.2,
    },
  },
};

