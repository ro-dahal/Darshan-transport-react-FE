export const ABOUT_CORE_VALUES_GRID_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const ABOUT_CORE_VALUES_CARD_VARIANTS = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};
