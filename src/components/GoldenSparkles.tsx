import { motion } from "framer-motion";

const GoldenSparkles = () => {
  // Create 15 particles
  const sparkles = Array.from({ length: 15 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {sparkles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-200"
          style={{
            width: Math.random() * 3 + 1, // Tiny size
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 4px 1px rgba(253, 224, 71, 0.6)", // Glow
          }}
          animate={{
            y: [0, -30, 0], // Float up and down
            opacity: [0, 1, 0], // Blink
            scale: [0, 1.5, 0], // Grow and shrink
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default GoldenSparkles;