import { motion } from "framer-motion";

interface ChapterButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  delay?: number;
}

const ChapterButton = ({ children, onClick, className = "", delay = 0 }: ChapterButtonProps) => {
  return (
    <motion.button
      className={`btn-chapter ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default ChapterButton;
