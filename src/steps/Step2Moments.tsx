import { useState, useEffect, useRef } from "react";
import { stopAllMusic } from "../musicController";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import CandleFlame from "../components/CandleFlame";
import FallingPetals from "../components/FallingPetals";
import LotusFlower from "../components/LotusFlower";
import "../index.css";

import flower1_1 from "../saba/flower1 (1).png";
import flower1_2 from "../saba/flower1 (2).png";

import flower4 from "../saba/flower4.png";
import flowerBtn from "../saba/flower1 (3).png";
import buttonTexture from "../saba/button texture.jpg";
interface Step2Props {
  onNext: () => void;
  onPrev?: () => void;
}

const lines = [
 // Block 1
{ text: "Aaj aapka birthday hai. 🌸", block: 0 },
{ text: "Aur shayad ye kehna zaroori hai... ❤️", block: 0 },
{ text: "Is poore saal me bohot kuch badla hoga.", block: 0 },
{ text: "Lekin ek cheez nahi badli.", block: 0 },
{ text: "Aapki jagah. 🤍", block: 0 },

// Block 2
{ text: "Kabhi hasi...", block: 1 },
{ text: "Kabhi random discussions...", block: 1 },
{ text: "Aur kabhi bas ek simple message.", block: 1 },

// Block 3
{ text: "Pata hi nahi chala...", block: 2 },
{ text: "kab aap itni khaas ban gayi. ❤️", block: 2 },
{ text: "Shayad aage jo likha hai...", block: 2 },
{ text: "wahi sab batayega. 🌸", block: 2 }

]

export default function Step2Moments({ onNext, onPrev }: Step2Props) {
  const [visibleLines, setVisibleLines] = useState<string[][]>([[], [], []]); // Store lines by block
  const [currentLineText, setCurrentLineText] = useState("");
  const [activeLineIdx, setActiveLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom during typing
  useEffect(() => {
    if (!isTypingComplete && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [visibleLines, currentLineText, isTypingComplete]);

  // Stop music on mount
  useEffect(() => {
    void stopAllMusic();
  }, []);

  // Typewriter reveal logic
  useEffect(() => {
    if (isTypingComplete) return;

    if (activeLineIdx >= lines.length) {
      setIsTypingComplete(true);
      return;
    }

    const currentLine = lines[activeLineIdx];
    const fullText = currentLine.text;

    if (charIdx < fullText.length) {
      // Type next character
      const timer = setTimeout(() => {
        setCurrentLineText(fullText.slice(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 55); // Slow, emotional handwriting reveal pace
      return () => clearTimeout(timer);
    } else {
      // Finished line: pause, push to block layout, and transition
      const nextLine = lines[activeLineIdx + 1];
      const isNewBlock = nextLine && nextLine.block !== currentLine.block;
      const pauseDuration = isNewBlock ? 1800 : 900; // Pause longer between diary blocks

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

  // Skip feature: tap the card once to show all text blocks instantly
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
      {/* Background Petals */}
      <FallingPetals />

      {/* Subtle Warm Background Ambient Glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <CandleFlame className="w-40 h-80 opacity-20 filter blur-3xl" />
      </div>

      {/* Ruled Notebook Memory Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40, scale: 0.95 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-[92vw] max-w-[450px] h-[80vh] max-h-[580px] min-h-[460px] z-10 flex"
      >
        <div
          onClick={handleCardClick}
          className="w-full h-full bg-transparent border border-primary/20 shadow-2xl rounded-2xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden cursor-pointer"
        >

          <img src={flower1_1} alt="flower decoration 1" className="absolute top-4 left-2 w-16 h-16 pointer-events-none opacity-80" />
          <img src={flower4} alt="flower decoration 2" className="absolute top-[-22px] right-[-22px] w-32 h-32 transform rotate-[-deg] pointer-events-none opacity-80 z-0" />


          {/* Subtle gold ribbon border on top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent z-20" />

          {/* Red Notebook Margin Line */}
          <div className="absolute left-[40px] sm:left-[55px] top-0 bottom-0 w-[1px] bg-red-400/25 pointer-events-none z-20" />

          {/* Lotus Glow Pulse Background Aura (Subtle watermark behind ruled lines) */}
          <motion.div
            animate={{ opacity: [0.03, 0.06, 0.03], scale: [1.3, 1.35, 1.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
          >
            <LotusFlower className="scale-[1.6] opacity-10 filter blur-[2px]" />
          </motion.div>

          {/* Card Header (Fixed height, unruled) */}
          <div className="text-center border-b border-primary/10 pt-4 pb-3 z-20 shrink-0 max-w-[200px] sm:max-w-[250px] mx-auto relative">
            <h1 className="font-display text-xl sm:text-2xl text-primary tracking-wide leading-snug">
              Jahan Sab Shuru Hua...
            </h1>
            <p className="font-body text-[11px] sm:text-xs text-muted-foreground/80 italic leading-relaxed mt-1">
              "Ek normal sa message. <br/>
Ek yaadgaar safar ki shuruaat."
            </p>
          </div>

          {/* Ruled Notebook Writing Area */}
          <div
            ref={scrollContainerRef}
            className="flex-1 flex flex-col justify-start pl-[38px] sm:pl-[52px] pr-2 z-10 overflow-y-auto py-3 text-left fade-up"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 29px, hsl(var(--primary) / 0.12) 29px, hsl(var(--primary) / 0.12) 30px)',
              backgroundAttachment: 'local'
            }}
          >
            {/* Block 1 */}
            {visibleLines[0].length > 0 &&
              visibleLines[0].map((line, idx) => (
                <p
                  key={idx}
                  className="font-handwriting text-[18px] sm:text-[20px] text-[#7a6656] leading-[30px] m-0"
                >
                  {line}
                </p>
              ))}
            {activeLineIdx < lines.length && lines[activeLineIdx].block === 0 && currentLineText && (
              <p className="font-handwriting text-[18px] sm:text-[20px] text-[#7a6656] leading-[30px] m-0 typewriter-cursor">
                {currentLineText}
              </p>
            )}

            {/* Notebook Spacer between Block 1 and 2 */}
            {(visibleLines[1].length > 0 || (activeLineIdx >= 5 && activeLineIdx < lines.length)) && (
              <p className="leading-[30px] m-0">&nbsp;</p>
            )}

            {/* Block 2 */}
            {visibleLines[1].length > 0 &&
              visibleLines[1].map((line, idx) => (
                <p
                  key={idx}
                  className="font-handwriting text-[18px] sm:text-[20px] text-[#7a6656] leading-[30px] m-0"
                >
                  {line}
                </p>
              ))}
            {activeLineIdx < lines.length && lines[activeLineIdx].block === 1 && currentLineText && (
              <p className="font-handwriting text-[18px] sm:text-[20px] text-[#7a6656] leading-[30px] m-0 typewriter-cursor">
                {currentLineText}
              </p>
            )}

            {/* Notebook Spacer between Block 2 and 3 */}
            {(visibleLines[2].length > 0 || (activeLineIdx >= 7 && activeLineIdx < lines.length)) && (
              <p className="leading-[30px] m-0">&nbsp;</p>
            )}

            {/* Block 3 */}
            {visibleLines[2].length > 0 &&
              visibleLines[2].map((line, idx) => (
                <p
                  key={idx}
                  className="font-handwriting text-[18px] sm:text-[20px] text-[#7a6656] leading-[30px] m-0"
                >
                  {line}
                </p>
              ))}
            {activeLineIdx < lines.length && lines[activeLineIdx].block === 2 && currentLineText && (
              <p className="font-handwriting text-[18px] sm:text-[23px] text-[#7a6656] leading-[30px] m-0 typewriter-cursor">
                {currentLineText}
              </p>
            )}

          </div>

          {/* Fade in Quote & Button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex flex-col items-center space-y-3"
          >
            {/* Gold divider */}
            <div className="w-16 border-t border-primary/30 my-0.5" />

            {/* Navigation Rounded Buttons */}
            <div className="pt-0.5 flex justify-center items-center w-full gap-3 px-2">
              {onPrev && (
                <Button
                  className="btn-paper flex-1 max-w-[140px] flex items-center justify-center gap-1.5 py-1.5 text-[#7a6656] font-bold bg-cover bg-center bg-no-repeat text-sm whitespace-nowrap"
                  style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'transparent' }}
                  onClick={(e) => {
                    e.stopPropagation(); // Stop parent click
                    onPrev();
                  }}
                >
                  <ArrowLeft size={15} />
                  <span>Piche 🌸</span>
                </Button>
              )}
              <Button
                className="btn-paper flex-1 max-w-[160px] flex items-center justify-center gap-1.5 py-1.5 text-[#7a6656] font-bold bg-cover bg-center bg-no-repeat text-sm whitespace-nowrap"
                style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'transparent' }}
                onClick={(e) => {
                  e.stopPropagation(); // Stop parent click
                  onNext();
                }}
              >
                <img src={flowerBtn} alt="flower button" className="w-4 h-4" />
                <span>Aur Phir... 🌷</span>
                <ArrowRight size={15} />
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
