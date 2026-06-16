import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Balloon {
  id: number;
  x: number;
  delay: number;
  duration: number;
  scale: number;
  color: string;
  swayDistance: number;
  swayDuration: number;
}

const BalloonColors = [
  "linear-gradient(135deg, rgba(212, 175, 55, 0.45), rgba(243, 229, 171, 0.3))", // Gold
  "linear-gradient(135deg, rgba(251, 191, 36, 0.4), rgba(254, 243, 199, 0.25))", // Amber Gold
  "linear-gradient(135deg, rgba(142, 28, 62, 0.35), rgba(224, 131, 150, 0.2))", // Wine
  "linear-gradient(135deg, rgba(244, 63, 94, 0.35), rgba(253, 244, 245, 0.2))", // Rose Pink
];

export default function FloatingBalloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    // Generate 12 balloons with randomized characteristics
    const items = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90, // horizontal range (percentage)
      delay: Math.random() * 4, // delay start
      duration: 10 + Math.random() * 7, // duration to float up (seconds)
      scale: 0.7 + Math.random() * 0.6, // sizes
      color: BalloonColors[i % BalloonColors.length],
      swayDistance: 25 + Math.random() * 30, // horizontal sway pixels
      swayDuration: 3 + Math.random() * 3, // sway speed
    }));
    setBalloons(items);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[2]">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute bottom-[-200px]"
          style={{
            left: `${b.x}%`,
            scale: b.scale,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: "-125vh",
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            y: {
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {/* Balloon shape wrapper with horizontal sway */}
          <motion.div
            animate={{
              x: [-b.swayDistance, b.swayDistance, -b.swayDistance],
              rotate: [-4, 4, -4],
            }}
            transition={{
              duration: b.swayDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center relative"
          >
            {/* Balloon Body */}
            <div
              className="w-16 h-20 rounded-[50%_50%_50%_50%/_40%_40%_60%_60%] shadow-[inset_-6px_-8px_12px_rgba(0,0,0,0.1),_0_8px_16px_rgba(0,0,0,0.08)] relative"
              style={{ background: b.color }}
            >
              {/* Shine highlight spot */}
              <div className="absolute top-[12%] left-[18%] w-4 h-6 bg-white/20 rounded-[50%_50%_50%_50%/_40%_40%_60%_60%] rotate-[-15deg] blur-[0.5px]" />
            </div>

            {/* Tie / Knot */}
            <div 
              className="w-3 h-2 bg-primary/20 mt-[-1px] rounded-b-sm border-t border-black/5"
              style={{
                clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
                background: b.color.replace("0.45", "0.6").replace("0.4", "0.5").replace("0.35", "0.5")
              }}
            />

            {/* String (Wavy SVG) */}
            <svg
              className="w-4 h-16 opacity-40 overflow-visible"
              viewBox="0 0 20 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            >
              <path
                d="M 10,0 C 18,20 2,40 10,60 C 18,70 12,80 10,80"
                className="text-primary/70"
              />
            </svg>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
