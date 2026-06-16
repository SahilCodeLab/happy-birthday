import { motion } from "framer-motion";

interface CandleFlameProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const CandleFlame = ({ size = "md", className = "" }: CandleFlameProps) => {
  const sizes = {
    sm: { width: 20, height: 35, candleHeight: 60 },
    md: { width: 30, height: 50, candleHeight: 100 },
    lg: { width: 45, height: 75, candleHeight: 150 },
  };

  const { width, height, candleHeight } = sizes[size];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Flame */}
      <div className="relative" style={{ width, height }}>
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-radial from-candle-glow/60 via-candle-glow/20 to-transparent"
          style={{ 
            width: width * 3, 
            height: height * 2,
            left: -width,
            top: -height * 0.3,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Main flame */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width,
            height,
            background: `linear-gradient(to top, 
              hsl(35, 90%, 55%) 0%, 
              hsl(30, 95%, 60%) 30%, 
              hsl(45, 100%, 70%) 60%, 
              hsl(50, 100%, 85%) 80%,
              transparent 100%)`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            filter: "blur(1px)",
          }}
          animate={{
            scaleY: [1, 1.08, 0.95, 1.03, 1],
            scaleX: [1, 0.95, 1.02, 0.98, 1],
            rotate: [0, 1, -1, 0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner flame (brighter core) */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: width * 0.5,
            height: height * 0.6,
            background: `linear-gradient(to top, 
              hsl(35, 80%, 50%) 0%,
              hsl(45, 100%, 80%) 50%, 
              hsl(55, 100%, 95%) 100%)`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            filter: "blur(0.5px)",
          }}
          animate={{
            scaleY: [1, 1.1, 0.9, 1.05, 1],
            scaleX: [1, 0.9, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Wick */}
      <div 
        className="bg-foreground/80 rounded-full"
        style={{ width: 2, height: 8 }}
      />

      {/* Candle body */}
      <div 
        className="rounded-t-sm rounded-b-lg"
        style={{ 
          width: width * 1.2, 
          height: candleHeight,
          background: `linear-gradient(to right, 
            hsl(35, 30%, 85%) 0%, 
            hsl(40, 35%, 92%) 30%, 
            hsl(35, 30%, 88%) 70%, 
            hsl(30, 25%, 80%) 100%)`,
          boxShadow: "inset -3px 0 10px rgba(0,0,0,0.1)",
        }}
      />

      {/* Candle holder */}
      <div 
        className="rounded-full"
        style={{
          width: width * 1.8,
          height: 8,
          background: `linear-gradient(to right, 
            hsl(var(--gold-dark)) 0%, 
            hsl(var(--gold)) 50%, 
            hsl(var(--gold-dark)) 100%)`,
        }}
      />
    </div>
  );
};

export default CandleFlame;
