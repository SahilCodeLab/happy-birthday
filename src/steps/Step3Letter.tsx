import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import FallingPetals from "../components/FallingPetals";
import LotusFlower from "../components/LotusFlower";
import CandleFlame from "../components/CandleFlame";
import { ArrowRight } from "lucide-react";
import letterPaper from "../saba/latter paper.webp";

interface Step3Props {
  onNext: () => void;
}

const lines = [
  { text: "Agar tum padh rahe ho… thank you, Saba.", block: 0 },
  { text: "Main ye sab isliye nahi bol raha kyunki mujhe kuch prove karna hai, ya tumse kuch expect karna hai.", block: 0 },
  { text: "Bas isliye, kyunki tumhare saath baat karna kabhi bojh nahi laga.", block: 1 },
  { text: "Tumhaari baatein… break jaisi thi.", block: 2 },
  { text: "Aur kabhi kabhi sukoon ka sirf itna hi matlab hota hai.", block: 2 },
];

export default function Step3Letter({ onNext }: Step3Props) {
  // Motion variants for container and each line
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, when: "beforeChildren" },
    },
  };

  const lineVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const [visibleLines, setVisibleLines] = useState<string[][]>([[], [], []]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [activeLineIdx, setActiveLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

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
        setVisibleLines((prev) => {
          const updated = [...prev];
          updated[currentLine.block] = [...updated[currentLine.block], fullText];
          return updated;
        });
        setCurrentLineText("");
        setCharIdx(0);
        setActiveLineIdx((prev) => prev + 1);
      }, pauseDuration);

      return () => clearTimeout(pauseTimer);
    }
  }, [activeLineIdx, charIdx, isTypingComplete]);

  const handleCardClick = () => {
    if (!isTypingComplete) {
      const allCompleted: string[][] = [[], [], []];
      lines.forEach((line) => {
        allCompleted[line.block].push(line.text);
      });
      setVisibleLines(allCompleted);
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
          className="w-full h-full bg-[#FCFAF2] border border-primary/20 shadow-2xl rounded-2xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden cursor-pointer"
        >
          <video src={flowerVideo} autoPlay muted loop className="absolute inset-0 w-full h-full object-cover pointer-events-none -z-10" />
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
            className="flex-1 flex flex-col justify-start pl-[38px] sm:pl-[52px] pr-2 z-10 overflow-hidden py-3 text-left"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 29px, hsl(var(--primary) / 0.12) 29px, hsl(var(--primary) / 0.12) 30px)",
              backgroundAttachment: "local",
            }}
          >
            {/* Block 1 */}
            {visibleLines[0].length > 0 &&
              visibleLines[0].map((line, idx) => (
                <motion.p
                  key={idx}
                  variants={lineVariant}
                  className="font-handwriting text-base sm:text-[17px] text-foreground/90 leading-[30px] m-0"
                >
                  {line}
                </motion.p>
              ))}
            {activeLineIdx < lines.length &&
              lines[activeLineIdx].block === 0 &&
              currentLineText && (
                <p className="font-handwriting text-base sm:text-[17px] text-foreground leading-[30px] m-0 typewriter-cursor">
                  {currentLineText}
                </p>
              )}

            {/* Spacer */}
            {(visibleLines[1].length > 0 ||
              (activeLineIdx >= 2 && activeLineIdx < lines.length)) && (
              <p className="leading-[30px] m-0">&nbsp;</p>
            )}

            {/* Block 2 */}
            {visibleLines[1].length > 0 &&
              visibleLines[1].map((line, idx) => (
                <motion.p
                  key={idx}
                  variants={lineVariant}
                  className="font-handwriting text-base sm:text-[17px] text-foreground/85 leading-[30px] m-0"
                >
                  {line}
                </motion.p>
              ))}
            {activeLineIdx < lines.length &&
              lines[activeLineIdx].block === 1 &&
              currentLineText && (
                <p className="font-handwriting text-base sm:text-[17px] text-foreground leading-[30px] m-0 typewriter-cursor">
                  {currentLineText}
                </p>
              )}

            {/* Spacer */}
            {(visibleLines[2].length > 0 ||
              (activeLineIdx >= 3 && activeLineIdx < lines.length)) && (
              <p className="leading-[30px] m-0">&nbsp;</p>
            )}

            {/* Block 3 */}
            {visibleLines[2].length > 0 &&
              visibleLines[2].map((line, idx) => (
                <motion.p
                  key={idx}
                  variants={lineVariant}
                  className="font-handwriting text-base sm:text-[17px] text-foreground/80 leading-[30px] m-0 italic"
                >
                  {line}
                </motion.p>
              ))}
            {activeLineIdx < lines.length &&
              lines[activeLineIdx].block === 2 &&
              currentLineText && (
                <motion.p
                  variants={lineVariant}
                  className="font-handwriting text-base sm:text-[17px] text-foreground leading-[30px] m-0 italic typewriter-cursor"
                >
                  {currentLineText}
                </motion.p>
              )}
          </div>

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
                className="w-full flex flex-col items-center space-y-3"
              >
                <div className="w-16 border-t border-primary/30 my-0.5" />
                <Button
                className="btn-paper flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
              >
                <ArrowRight className="inline-block w-4 h-4 mr-2" />
                Aage? ✨
              </Button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
