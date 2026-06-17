import { useMemo } from "react";
import { motion } from "framer-motion";

// Random number generator for variation
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Create 20 petals
const PETAL_COUNT = 20;

const FallingPetals = () => {
  const petalsData = useMemo(() => {
    return Array.from({ length: PETAL_COUNT }).map((_, i) => {
      const duration = random(45, 65); // much slower fall for a gentle feel
      const delay = random(0, 5); // short random delay
      const startX = random(0, 100); // percentage across screen
      const endXMovement = random(-20, 20); // gentle sway
      const size = random(12, 22);
      const color = i % 2 === 0 ? "bg-pink-300/40" : "bg-rose-400/30";
      const heightMultiplier = random(1.2, 1.8);
      const rotateMax = random(180, 360);

      return {
        duration,
        delay,
        startX,
        endXMovement,
        size,
        color,
        heightMultiplier,
        rotateMax,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petalsData.map((petal, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${petal.color}`}
          style={{
            width: petal.size,
            height: petal.size * petal.heightMultiplier, // Slightly oval for petal shape
            left: `${petal.startX}%`,
            top: -50,
            filter: "blur(1px)",
          }}
          animate={{
            y: ["0vh", "105vh"], // Fall straight down
            x: [0, petal.endXMovement, 0], // Gentle sway side to side
            rotate: [0, petal.rotateMax], // Spin gently
            opacity: [0, 0.8, 0], // Fade in and out for a soft feeling
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default FallingPetals;