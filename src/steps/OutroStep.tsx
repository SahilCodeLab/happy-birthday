import { motion } from "framer-motion";
import CandleFlame from "../components/CandleFlame";

const OutroStep = () => {
  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center px-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute"
        style={{
          width: 400,
          height: 400,
          background: `radial-gradient(ellipse at center, hsl(var(--candle-glow) / 0.15), transparent 70%)`,
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="text-center relative z-10">
        {/* Small candle */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <CandleFlame size="sm" />
        </motion.div>

        {/* Neon signature */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h2 className="font-signature text-6xl md:text-8xl text-primary neon-signature">
            — Sahil
          </h2>
        </motion.div>

        {/* Small note */}
        <motion.p
          className="font-body text-sm text-muted-foreground/60 max-w-xs mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Made for Saba.
          <br />
          From care, not demand.
        </motion.p>

        {/* Anniversary note */}
        <motion.div
          className="mt-12 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p className="font-display text-lg text-primary/60">
            10 January 2025 — 10 January 2026
          </p>
          <p className="font-body text-sm text-muted-foreground/50 italic">
            One year of knowing you.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OutroStep;
