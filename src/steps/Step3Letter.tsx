import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import FallingPetals from "../components/FallingPetals";
import LotusFlower from "../components/LotusFlower";
import CandleFlame from "../components/CandleFlame";
import { ArrowRight, ArrowLeft } from "lucide-react";
import letterPaper from "../saba/latter paper.webp";
import flower1_1 from "../saba/flower1 (1).png";
import flower4 from "../saba/flower4.png";
import buttonTexture from "../saba/button texture.jpg";

interface Step3Props {
  onNext: () => void;
  onPrev?: () => void;
}

const lines = [
  { text: "Agar tum padh rahe ho… thank you, Saba.", block: 0 },
  { text: "Aaj tumhara birthday hai.", block: 0 },
  { text: "Aur shayad ye kehna zaroori tha.", block: 0 },
  
  { text: "Main ye sab isliye nahi likh raha", block: 1 },
  { text: "kyunki mujhe kuch prove karna hai.", block: 1 },
  { text: "Ya tumse kuch expect karna hai.", block: 1 },
  
  { text: "Bas isliye...", block: 2 },
  { text: "Kyuki tumhare saath baat karna", block: 2 },
  { text: "kabhi bojh nahi laga.", block: 2 },
  
  { text: "Tumhaari baatein…", block: 3 },
  { text: "break jaisi thi.", block: 3 },
  
  { text: "Aur kabhi kabhi", block: 4 },
  { text: "sukoon ka sirf itna hi matlab hota hai.", block: 4, italic: true }
];

export default function Step3Letter({ onNext, onPrev }: Step3Props) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, when: "beforeChildren" },
    },
  };

  const [currentLineText, setCurrentLineText] = useState("");
  const [activeLineIdx, setActiveLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of the writing area during typewriter typing
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [activeLineIdx, currentLineText]);

  useEffect(() => {
    if (isTypingComplete) return;

    if (activeLineIdx >= lines.length) {
      setIsTypingComplete(true);
      return;
    }

    const currentLine = lines[activeLineIdx];
    const fullText = currentLine.text;

    if (charIdx < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentLineText(fullText.slice(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const nextLine = lines[activeLineIdx + 1];
      const isNewBlock = nextLine && nextLine.block !== currentLine.block;
      const pauseDuration = isNewBlock ? 1500 : 800;

      const pauseTimer = setTimeout(() => {
        setCurrentLineText("");
        setCharIdx(0);
        setActiveLineIdx((prev) => prev + 1);
      }, pauseDuration);

      return () => clearTimeout(pauseTimer);
    }
  }, [activeLineIdx, charIdx, isTypingComplete]);

  const handleCardClick = () => {
    if (!isTypingComplete) {
      setCurrentLineText("");
      setCharIdx(0);
      setActiveLineIdx(lines.length);
      setIsTypingComplete(true);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] flex flex-col items-center justify-center px-4 overflow-hidden z-10 select-none">
      <FallingPetals />
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <CandleFlame className="w-40 h-80 opacity-20 filter blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, y: -40, scale: 0.95 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-[92vw] max-w-[450px] h-[80vh] max-h-[580px] min-h-[460px] z-10 flex"
      >
        <div
          onClick={handleCardClick}
          className="w-full h-full bg-transparent border border-primary/20 shadow-2xl rounded-2xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden cursor-pointer"
        >
          <img src={flower1_1} alt="flower decoration 1" className="absolute top-4 left-2 w-16 h-16 pointer-events-none opacity-80" />
          <img src={flower4} alt="flower decoration 2" className="absolute top-1 right-[1px] w-44 h-44 object-contain pointer-events-none opacity-80" />

          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent z-20" />
          <div className="absolute left-[40px] sm:left-[55px] top-0 bottom-0 w-[1px] bg-red-400/25 pointer-events-none z-20" />

          <motion.div
            animate={{ opacity: [0.03, 0.06, 0.03], scale: [1.3, 1.35, 1.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
          >
            <LotusFlower className="scale-[1.6] opacity-10 filter blur-[2px]" />
          </motion.div>

          {/* Card Header */}
          <div className="text-center border-b border-primary/10 pb-3 z-10 shrink-0">
            <h1 className="font-display text-xl sm:text-2xl text-primary tracking-wide">
              Baatein Jo Dil Mein Hain
            </h1>
            <p className="font-body text-[11px] sm:text-xs text-muted-foreground/80 italic leading-relaxed max-w-[280px] mx-auto">
              "Kuch baatein kehna zaroori hota hai..."
            </p>
          </div>

          {/* Ruled Notebook Writing Area */}
          <div
            ref={scrollContainerRef}
            className="flex-1 flex flex-col justify-start pl-[38px] sm:pl-[52px] pr-2 z-10 overflow-y-auto py-3 text-left scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 29px, hsl(var(--primary) / 0.12) 29px, hsl(var(--primary) / 0.12) 30px)",
              backgroundAttachment: "local",
            }}
          >
            {(() => {
              const renderedElements = [];
              let lastBlockIdx = -1;

              for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const isVisible = i < activeLineIdx;
                const isCurrent = i === activeLineIdx && currentLineText;

                if (isVisible || isCurrent) {
                  // If we transitioned to a new block, insert a blank line for notebook alignment
                  if (lastBlockIdx !== -1 && line.block !== lastBlockIdx) {
                    renderedElements.push(
                      <p key={`spacer-${i}`} className="leading-[30px] m-0">&nbsp;</p>
                    );
                  }
                  
                  renderedElements.push(
                    <p
                      key={i}
                      className={`font-handwriting text-base sm:text-[17px] text-[#7a6656] leading-[30px] m-0 ${
                        isCurrent ? "typewriter-cursor" : ""
                      } ${line.italic ? "italic" : ""}`}
                    >
                      {isCurrent ? currentLineText : line.text}
                    </p>
                  );
                  
                  lastBlockIdx = line.block;
                }
              }
              return renderedElements;
            })()}
          </div>

          {/* Floral ornament */}
          <div className="flex justify-center mt-4 mb-2"></div>

          {/* Footer */}
          <div className="shrink-0 flex flex-col items-center justify-center border-t border-primary/10 pt-3 z-10 min-h-[90px]">
            {!isTypingComplete ? (
              <div className="text-[9px] font-display text-primary/45 tracking-widest uppercase animate-pulse pb-2">
                ✦ words forming ✦
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full flex flex-row items-center justify-between gap-3 pl-[38px] sm:pl-[52px] pr-2"
              >
                {/* Previous Button */}
                {onPrev && (
                  <Button
                    className="btn-paper flex-1 flex items-center justify-center gap-1.5 py-2 text-[#7a6656] font-bold"
                    style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPrev();
                    }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Pichla? ✨
                  </Button>
                )}
                {/* Next Button */}
                <Button
                  className="btn-paper flex-1 flex items-center justify-center gap-1.5 py-2 text-[#7a6656] font-bold"
                  style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                  }}
                >
                  Aage? ✨
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
