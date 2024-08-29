export const FadeInFromLeft = (delay) => {
  return {
    initial: {
      opacity: 0,
      x: -50, // start from left
    },
    animate: {
      opacity: 1,
      x: 0, // end at original position
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

export const FadeInFromRight = (delay) => {
  return {
    initial: {
      opacity: 0,
      x: 50, // start from right
    },
    animate: {
      opacity: 1,
      x: 0, // end at original position
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

export const FadeInFromTop = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: -50, // start from top
    },
    animate: {
      opacity: 1,
      y: 0, // end at original position
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};
