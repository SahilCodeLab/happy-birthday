import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FloatingCandles from "../components/FloatingCandles";
import FallingPetals from "../components/FallingPetals";
import CandleFlame from "../components/CandleFlame";
import buttonTexture from "../saba/button texture.jpg";
import { stopAllMusic } from "../musicController";

interface Step3_5Props {
  onNext: () => void;
  onPrev?: () => void;
}

export default function Step3_5Flower({ onNext, onPrev }: Step3_5Props) {
  const [accepted, setAccepted] = useState(false);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [lastEvadeTime, setLastEvadeTime] = useState(0);

  useEffect(() => {
    void stopAllMusic();
  }, []);

  const handleNoEvade = (e: React.MouseEvent | React.TouchEvent) => {
    const isClick = e.type === "click";
    const now = Date.now();
    // Do not throttle if it is a click event, so it always flees instantly when clicked
    if (!isClick && now - lastEvadeTime < 150) return; 

    e.preventDefault();

    // Determine random coordinates constrained to stay strictly within card boundaries
    // X range [-140, 20], Y range [-120, 20]
    let randomX = Math.random() * 160 - 140;
    let randomY = Math.random() * 140 - 120;

    // Ensure it moves by at least 50px from current spot for a significant jump
    if (Math.abs(randomX - noOffset.x) < 50) {
      randomX = randomX < noOffset.x ? randomX - 35 : randomX + 35;
    }
    if (Math.abs(randomY - noOffset.y) < 50) {
      randomY = randomY < noOffset.y ? randomY - 35 : randomY + 35;
    }

    // Clamp coordinates after adjusting offset distance to prevent going off-card
    randomX = Math.max(-140, Math.min(20, randomX));
    randomY = Math.max(-120, Math.min(20, randomY));

    setNoOffset({ x: randomX, y: randomY });
    setLastEvadeTime(now);
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  return (
    <div className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] flex flex-col items-center justify-between py-4 sm:py-6 px-4 overflow-hidden z-10 select-none bg-gradient-to-b from-background via-cream-dark to-background">
      <FloatingCandles />
      <FallingPetals />

      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <CandleFlame className="w-40 h-80 opacity-15 filter blur-3xl" />
      </div>

      {/* Title Header */}
      <div className="text-center z-10 mt-2 shrink-0">
        <motion.div
          key={accepted ? "accepted-header" : "ask-header"}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-xl sm:text-2xl text-primary tracking-wide">
            {accepted ? "One More Thing... 🌸" : "Before We Start... 🌹"}
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted-foreground italic mt-0.5 max-w-[280px] sm:max-w-[340px] leading-tight">
            {accepted ? "Journal shuru karne se pehle." : '"Ek phool aapke liye."'}
          </p>
        </motion.div>
      </div>

      {/* Main Content Card Area */}
      <div className="w-full flex-1 flex items-center justify-center relative my-2 overflow-visible">
        <AnimatePresence mode="wait">
          {!accepted ? (
            /* --- STATE 1: ASK --- */
            <motion.div
              key="ask-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-[90vw] max-w-[350px] bg-[#FCFAF2] border-2 border-primary/20 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between shadow-[0_12px_28px_rgba(0,0,0,0.15)] relative overflow-hidden"
            >
              <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-16 h-4 bg-primary/10 rotate-1 rounded backdrop-blur-sm pointer-events-none border-b border-primary/5" />
              
              {/* Image Frame */}
              <div className="w-full rounded-lg overflow-hidden border border-primary/10 shadow-inner bg-cream relative aspect-square max-h-[220px] sm:max-h-[240px] flex justify-center items-center">
                <img
                  src="https://media.tenor.com/b6RK49IXUTMAAAAC/bubu-dubu-sseeyall.gif"
                  alt="Bubu holding flowers"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="eager"
                />
              </div>

              {/* Text Question */}
              <div className="text-center my-3">
                <h3 className="font-handwriting text-2xl sm:text-3xl text-[#7a6656] font-semibold mt-1">
                  Will you accept this flower? 🌹
                </h3>
              </div>

              {/* Yes & No Buttons Grid */}
              <div className="w-full flex justify-center items-center gap-6 mt-2 relative min-h-[60px]">
                {/* Yes Button */}
                <Button
                  className="btn-paper flex items-center justify-center px-6 py-2 text-[#7a6656] font-bold text-base bg-cover bg-center bg-no-repeat shadow-md hover:scale-105 active:scale-95 transition-transform"
                  style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'transparent' }}
                  onClick={handleYesClick}
                >
                  Yes! 💖
                </Button>

                {/* Runaway No Button Container */}
                <div className="relative w-24 h-12 flex items-center justify-center overflow-visible">
                  <motion.button
                    animate={{ x: noOffset.x, y: noOffset.y }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    onMouseEnter={handleNoEvade}
                    onTouchStart={handleNoEvade}
                    onClick={handleNoEvade}
                    className="absolute px-6 py-2.5 border border-primary/20 rounded-xl bg-[#FAF7F2] text-[#7a6656] font-body font-bold text-sm shadow-md cursor-pointer hover:bg-[#F5EFE6] transition-colors duration-200 focus:outline-none hover:scale-105"
                    style={{ willChange: "transform" }}
                  >
                    No 😢
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* --- STATE 2: ACCEPTED --- */
            <motion.div
              key="accepted-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, type: "spring", damping: 25 }}
              className="w-[90vw] max-w-[350px] bg-[#FCFAF2] border-2 border-primary/20 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between shadow-[0_12px_28px_rgba(0,0,0,0.15)] relative overflow-hidden"
            >
              <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-16 h-4 bg-primary/10 rotate-1 rounded backdrop-blur-sm pointer-events-none border-b border-primary/5" />

              {/* Giving Flowers GIF */}
              <div className="w-full rounded-lg overflow-hidden border border-primary/10 shadow-inner bg-cream relative aspect-[1.18] max-h-[220px] sm:max-h-[240px] flex justify-center items-center">
                <img
                  src="https://media.tenor.com/0cNM_9li440AAAAC/dudu-giving-flowers-bubu-flowers.gif"
                  alt="Dudu giving flowers"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="eager"
                />
              </div>

              {/* Response Message */}
              <div className="text-center my-4">
                <h3 className="font-handwriting text-2xl sm:text-3xl text-secondary font-semibold mt-1">
                  Thank you for accepting. ✨
                </h3>
                <p className="font-body text-xs sm:text-sm text-muted-foreground mt-2 italic leading-relaxed">
                  Ab jo aage hai... <br />
                  wo sirf aapke liye hai. 💐                </p>
              </div>

              {/* Next Step Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="w-full flex justify-center mt-1"
              >
                <Button
                  className="btn-paper w-full flex items-center justify-center gap-2 py-2 text-[#7a6656] font-bold text-base bg-cover bg-center bg-no-repeat shadow-md hover:scale-105 active:scale-95 transition-transform"
                  style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'transparent' }}
                  onClick={onNext}
                >
                  Open The Journal ✨
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation (only visible when onPrev is passed) */}
      {onPrev && (
        <div className="w-full max-w-[350px] shrink-0 flex flex-col items-center z-10 pb-2 pt-2 border-t border-primary/10">
          <Button
            variant="ghost"
            className="flex items-center gap-1.5 py-1 text-[#7a6656]/70 hover:text-[#7a6656] text-xs hover:bg-primary/5 rounded-lg"
            onClick={onPrev}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Letter phir se padhna hai? 🌸
          </Button>
        </div>
      )}
    </div>
  );
}
