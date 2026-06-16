import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import FloatingCandles from "../components/FloatingCandles";
import FallingPetals from "../components/FallingPetals";
import LotusFlower from "../components/LotusFlower";
import CandleFlame from "../components/CandleFlame";
import ImageGallery from "../components/ImageGallery";

interface Step4Props {
  onNext: () => void;
}

const lines = [
  { text: "Agar kabhi tumhare dil ko bhi aisa hi lage…", block: 0 },
  { text: "Ke hum dono ek hi taraf dekh rahe hain, toh main intezaar nahi karunga.", block: 0 },
  { text: "Main saath chalne ko ready rahunga.", block: 0 },
  { text: "Jahan rukna ho… waha rukenge.", block: 1 },
  { text: "Jahan breathe chahiye ho… waha ruk jayenge.", block: 1 },
  { text: "Jahan pace slow ho… waha slow ho jayenge.", block: 1 }
];

const Step4Promises = ({ onNext }: Step4Props) => {
  const [visibleLines, setVisibleLines] = useState<string[][]>([[], []]);
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
      const allCompleted: string[][] = [[], []];
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
      <FloatingCandles />
      <FallingPetals />

      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <CandleFlame className="w-40 h-80 opacity-15 filter blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40, scale: 0.95 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-[92vw] max-w-full sm:max-w-[450px] max-h-[90vh] min-h-[460px] z-10 flex relative"
      >
        <div
          onClick={handleCardClick}
          className="w-full h-full bg-[#FCFAF2] border border-primary/20 shadow-2xl rounded-2xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden cursor-pointer"
        >
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
              Mera Compass
            </h1>
            <p className="font-body text-[11px] sm:text-xs text-muted-foreground/80 italic leading-relaxed max-w-[280px] mx-auto">
              "Hum dono ki apni raah..."
            </p>
          </div>
        <ImageGallery />

          {/* Ruled Notebook Writing Area */}
            <div
              className="flex-1 flex flex-col justify-start pl-[38px] sm:pl-[52px] pr-2 z-10 overflow-y-auto py-3 text-left"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 29px, hsl(var(--primary) / 0.12) 29px, hsl(var(--primary) / 0.12) 30px)',
                backgroundAttachment: 'local'
              }}
          >
            {/* Block 1 */}
            {visibleLines[0].length > 0 && (
              visibleLines[0].map((line, idx) => (
                <p key={idx} className="font-handwriting text-base sm:text-[17px] text-foreground/90 leading-[30px] m-0">
                  {line}
                </p>
              ))
            )}
            {activeLineIdx < lines.length && lines[activeLineIdx].block === 0 && currentLineText && (
              <p className="font-handwriting text-base sm:text-[17px] text-foreground leading-[30px] m-0 typewriter-cursor">
                {currentLineText}
              </p>
            )}

            {/* Spacer */}
            {(visibleLines[1].length > 0 || (activeLineIdx >= 3 && activeLineIdx < lines.length)) && (
              <p className="leading-[30px] m-0">&nbsp;</p>
            )}

            {/* Block 2 */}
            {visibleLines[1].length > 0 && (
              visibleLines[1].map((line, idx) => (
                <p key={idx} className="font-handwriting text-base sm:text-[17px] text-muted-foreground leading-[30px] m-0">
                  {line}
                </p>
              ))
            )}
            {activeLineIdx < lines.length && lines[activeLineIdx].block === 1 && currentLineText && (
              <p className="font-handwriting text-base sm:text-[17px] text-muted-foreground leading-[30px] m-0 typewriter-cursor">
                {currentLineText}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="shrink-0 flex flex-col items-center justify-center border-t border-primary/10 pt-3 z-10 min-h-[90px]">
            {!isTypingComplete ? (
              <div className="text-[9px] font-display text-primary/45 tracking-widest uppercase animate-pulse pb-2">
                ✦ plotting paths ✦
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full flex flex-col items-center space-y-3"
              >
                <div className="w-16 border-t border-primary/30 my-0.5" />

                <div className="text-center">
                  <p className="font-signature text-2xl sm:text-3xl text-primary font-medium leading-none">
                    "Tumhaari comfort,"
                  </p>
                  <p className="font-signature text-2xl sm:text-3xl text-primary font-medium leading-none">
                    "mere liye compass ban sakti hai."
                  </p>
                </div>

                <div className="pt-0.5 flex justify-center">
<Button
  onClick={(e) => {
    e.stopPropagation();
    onNext();
  }}
  className="btn-paper flex items-center gap-2"
>
  Ek last baat… ✨
  <ArrowRight className="h-4 w-4" />
</Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Step4Promises;
