import { motion } from "framer-motion";

const Sparkle = ({ radius = 100, duration = 10, delay = 0, size = 6, color}) => {
  const randomX = Math.random() * window.innerWidth;
  const randomY = Math.random() * window.innerHeight;

  return (
    <motion.div
      style={{
        position: "absolute",
        width: radius * 2,
        height: radius * 2,
      }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "linear",
        delay,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: size,
          height: size,
          borderRadius: "50%",
          background:`${color}`,
          transform: `translateX(${radius}px)`,
          filter: "blur(1px)",
          opacity: 0.3,
        }}
      />
    </motion.div>
  );
};

export default Sparkle;