import { motion } from "framer-motion";

// Random number generator for variation
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Create 20 petals
const petals = Array.from({ length: 20 });

const FallingPetals = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((_, i) => {
        // Randomize properties for natural look
        const duration = random(45, 65); // much slower fall for a gentle feel
        const delay = random(0, 5); // short random delay
        const startX = random(0, 100); // percentage across screen
        const endXMovement = random(-20, 20); // gentle sway
        const size = random(12, 22);
        const color = i % 2 === 0 ? "bg-pink-300/40" : "bg-rose-400/30";

        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${color}`}
            style={{
              width: size,
              height: size * random(1.2, 1.8), // Slightly oval for petal shape
              left: `${startX}%`,
              top: -50,
              filter: "blur(1px)",
            }}
            animate={{
              y: ["0vh", "105vh"], // Fall straight down
              x: [0, endXMovement, 0], // Gentle sway side to side
              rotate: [0, random(180, 360)], // Spin gently
              opacity: [0, 0.8, 0], // Fade in and out for a soft feeling
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
};

export default FallingPetals;