import { motion } from "framer-motion";

interface PromiseCardProps {
  promise: string;
  index: number;
}

const PromiseCard = ({ promise, index }: PromiseCardProps) => {
  return (
    <motion.div
      className="card-candle p-6 text-center"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.3,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
        animate={{
          boxShadow: [
            "0 0 20px hsl(var(--candle-glow) / 0.3)",
            "0 0 40px hsl(var(--candle-glow) / 0.5)",
            "0 0 20px hsl(var(--candle-glow) / 0.3)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="text-primary font-display text-xl">{index + 1}</span>
      </motion.div>
      
      <p className="font-display text-lg md:text-xl text-foreground leading-relaxed">
        {promise}
      </p>
    </motion.div>
  );
};

export default PromiseCard;
