import { motion } from "framer-motion";
import CandleFlame from "./CandleFlame";

const FloatingCandles = () => {
  const candles = [
    { x: "10%", delay: 0, size: "sm" as const },
    { x: "25%", delay: 1, size: "md" as const },
    { x: "75%", delay: 0.5, size: "sm" as const },
    { x: "90%", delay: 1.5, size: "md" as const },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {candles.map((candle, i) => (
        <motion.div
          key={i}
          className="absolute bottom-10"
          style={{ left: candle.x }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: 0.6, 
            y: 0,
          }}
          transition={{ 
            delay: candle.delay + 0.5, 
            duration: 1.5,
            ease: "easeOut",
          }}
        >
          <motion.div
            animate={{
              y: [-5, 5, -5],
              rotate: [-1, 1, -1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <CandleFlame size={candle.size} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCandles;
