export const subsection = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

export const section = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delayChildren: 0,
      staggerChildren: 0.15,
    },
  },
};

export const sidebar = {
  closed: { width: 80 },
  open: {
    width: 225,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};
