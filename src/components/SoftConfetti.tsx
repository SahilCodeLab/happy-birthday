import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rotation: number;
}

const SoftConfetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      "hsl(35, 55%, 55%)", // gold
      "hsl(40, 60%, 75%)", // gold light
      "hsl(345, 45%, 35%)", // wine light
      "hsl(35, 50%, 70%)", // amber
      "hsl(30, 40%, 85%)", // cream
    ];

    const newPieces: ConfettiPiece[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 8 + Math.random() * 6,
      size: 4 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    }));

    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-full"
          style={{
            left: `${piece.x}%`,
            top: -20,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            opacity: 0.7,
          }}
          initial={{ 
            y: -50, 
            rotate: piece.rotation,
            opacity: 0,
          }}
          animate={{ 
            y: "110vh", 
            rotate: piece.rotation + 720,
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default SoftConfetti;
