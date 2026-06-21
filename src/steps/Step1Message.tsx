import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import CandleFlame from "../components/CandleFlame";
import FallingPetals from "../components/FallingPetals";
import "../index.css";
import buttonTexture from "../saba/button texture.jpg";

interface Step1Props {
  onNext: () => void;
}

const messages = [
  "Ek normal sa din tha.",
  "Ek normal sa message bhi.",
  "Lekin kabhi kabhi...",
  "Kuch conversations expected se zyada der tak saath chalti hain.",
  "Ye unhi me se ek thi."
];

// January 2025 Calendar Grid starting from Monday (1st was Wednesday)
const calendarDays = [
  "", "", "1", "2", "3", "4", "5",
  "6", "7", "8", "9", "10", "11", "12",
  "13", "14", "15", "16", "17", "18", "19",
  "20", "21", "22", "23", "24", "25", "26",
  "27", "28", "29", "30", "31"
];

export default function Step1Message({ onNext }: Step1Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [lastEvadeTime, setLastEvadeTime] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0); // Completed typing message index
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentTyped, setCurrentTyped] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const handleEvade = (e: React.MouseEvent | React.TouchEvent) => {
    if (isBreaking) return;
    const now = Date.now();
    if (now - lastEvadeTime < 450) return; // Cooldown to prevent double-triggers

    if (attempts < 5) {
      e.preventDefault();
      // Jumps randomly within a reasonable range on mouse enter or touch start
      const randomX = (Math.random() - 0.5) * 160;
      const randomY = (Math.random() - 0.5) * 120;
      setOffset({ x: randomX, y: randomY });
      setAttempts((prev) => prev + 1);
      setLastEvadeTime(now);
    } else if (attempts === 5) {
      e.preventDefault();
      // Returns back to center on 6th touch attempt
      setOffset({ x: 0, y: 0 });
      setAttempts(6);
      setLastEvadeTime(now);
    }
  };

  const handleSealClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBreaking) return;
    const now = Date.now();
    if (attempts >= 6) {
      setIsBreaking(true);
      setTimeout(() => {
        setIsOpen(true);
      }, 700);
    } else if (attempts === 5) {
      if (now - lastEvadeTime < 450) return;
      setOffset({ x: 0, y: 0 });
      setAttempts(6);
      setLastEvadeTime(now);
    } else {
      if (now - lastEvadeTime < 450) return;
      const randomX = (Math.random() - 0.5) * 160;
      const randomY = (Math.random() - 0.5) * 120;
      setOffset({ x: randomX, y: randomY });
      setAttempts((prev) => prev + 1);
      setLastEvadeTime(now);
    }
  };

  // Typewriter animation logic
  useEffect(() => {
    if (!isOpen || isTypingComplete) return;

    if (visibleCount >= messages.length) {
      setIsTypingComplete(true);
      return;
    }

    const fullText = messages[visibleCount];

    if (currentCharIndex < fullText.length) {
      // Type characters one by one
      const timer = setTimeout(() => {
        setCurrentTyped(fullText.slice(0, currentCharIndex + 1));
        setCurrentCharIndex((prev) => prev + 1);
      }, 55); // Slow, emotional typewriter speed
      return () => clearTimeout(timer);
    } else {
      // Line finished: pause to allow reading, then push to completed list and start next line
      const pauseTimer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
        setCurrentTyped("");
        setCurrentCharIndex(0);
      }, 1400); // 1.4 seconds pause between sentences
      return () => clearTimeout(pauseTimer);
    }
  }, [isOpen, visibleCount, currentCharIndex, isTypingComplete]);

  // Skip feature: tap the card once to instantly complete all typewriter lines
  const handleCardClick = () => {
    if (!isOpen) return;
    if (!isTypingComplete) {
      setVisibleCount(messages.length);
      setCurrentTyped("");
      setCurrentCharIndex(0);
      setIsTypingComplete(true);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] flex flex-col items-center justify-center px-4 overflow-hidden z-10 select-none">
      {/* Background Petals */}
      <FallingPetals />

      {/* Warm Ambient Candle Background */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <CandleFlame className="w-32 h-64 opacity-25 filter blur-2xl" />
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* --- ENVELOPE (CLOSED) --- */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-[92vw] max-w-[380px] h-[65vh] max-h-[440px] min-h-[380px] z-10 flex"
          >
            <div className="relative w-full h-full p-6 sm:p-8 rounded-2xl bg-card/90 backdrop-blur-md border border-primary/20 shadow-2xl flex flex-col items-center justify-between text-center">
              {/* Decorative corners */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-primary/30" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-primary/30" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-primary/30" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-primary/30" />

              <div className="pt-4 space-y-2">
                <h2 className="font-display text-2xl sm:text-3xl text-primary tracking-wider mb-4">
                  10 January 2025
                </h2>
                <p className="font-body text-sm sm:text-base text-muted-foreground/90 italic">
                  Shayad tumhe yaad bhi na ho...<br/>Par mujhe aaj bhi yaad hai.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 pb-6">
                {!isBreaking ? (
                  <>
                    {/* Wax Seal Button (Heart Shaped) */}
                    <motion.button
                      animate={{ x: offset.x, y: offset.y }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={handleEvade}
                      onTouchStart={handleEvade}
                      onClick={handleSealClick}
                      className="w-20 h-20 flex items-center justify-center cursor-pointer relative z-30 focus:outline-none bg-transparent border-none shadow-none outline-none animate-[pulse_2.5s_infinite_ease-in-out]"
                    >
                      <div className="relative w-20 h-20 flex items-center justify-center select-none">
                        {/* Pulsing ring around the seal */}
                        {/* Removed pulsing ring for cleaner heart */}

                        {/* Wax Seal Heart SVG */}
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <defs>
                            <linearGradient id="waxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#e14c62" />
                              <stop offset="50%" stopColor="#a31d34" />
                              <stop offset="100%" stopColor="#630718" />
                            </linearGradient>
                            <radialGradient id="waxGlow" cx="50%" cy="40%" r="50%">
                              <stop offset="0%" stopColor="#ff859a" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#a31d34" stopOpacity="0" />
                            </radialGradient>

                            {/* 3D Wax Depth Filter matching user's custom CSS shadows */}
                            <filter id="waxDepth" x="-20%" y="-20%" width="140%" height="140%">
                              {/* Outer drop shadow (0 8px 20px rgba(120, 0, 30, 0.25)) */}
                              <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#78001e" flood-opacity="0.25" result="shadow" />
                              
                              {/* Offset and blur for top inset light highlight (inset 0 2px 4px rgba(255,255,255,0.25)) */}
                              <feOffset dx="0" dy="2" />
                              <feGaussianBlur stdDeviation="2" result="offset-blur-light" />
                              <feComposite operator="out" in="SourceGraphic" in2="offset-blur-light" result="inverse-light" />
                              <feFlood flood-color="white" flood-opacity="0.25" result="color-light" />
                              <feComposite operator="in" in="color-light" in2="inverse-light" result="shadow-light" />
                              
                              {/* Offset and blur for bottom inset dark shadow (inset 0 -3px 6px rgba(0,0,0,0.15)) */}
                              <feOffset dx="0" dy="-3" />
                              <feGaussianBlur stdDeviation="3" result="offset-blur-dark" />
                              <feComposite operator="out" in="SourceGraphic" in2="offset-blur-dark" result="inverse-dark" />
                              <feFlood flood-color="black" flood-opacity="0.15" result="color-dark" />
                              <feComposite operator="in" in="color-dark" in2="inverse-dark" result="shadow-dark" />
                              
                              {/* Combine layers */}
                              <feMerge>
                                <feMergeNode in="shadow" />
                                <feMergeNode in="SourceGraphic" />
                                <feMergeNode in="shadow-light" />
                                <feMergeNode in="shadow-dark" />
                              </feMerge>
                            </filter>
                          </defs>

                          {/* Melted outer wax heart base */}
                          <path 
                            d="M 50 15 C 25 -5, 5 10, 5 40 C 5 70, 30 82, 50 92 C 70 82, 95 70, 95 40 C 95 10, 75 -5, 50 15 Z" 
                            fill="url(#waxGrad)" 
                            filter="url(#waxDepth)"
                            stroke="rgba(255, 255, 255, 0.15)"
                            strokeWidth="1.5"
                          />

                          {/* Inner embossed heart */}
                          <path 
                            d="M 50 25 C 32 10, 16 22, 16 44 C 16 66, 36 76, 50 84 C 64 76, 84 66, 84 44 C 84 22, 68 10, 50 25 Z" 
                            fill="#a31d34" 
                            stroke="rgba(0,0,0,0.2)"
                            strokeWidth="1"
                          />
                          
                          {/* Highlight reflection */}
                          <path 
                            d="M 50 15 C 25 -5, 5 10, 5 40 C 5 50, 12 40, 20 35 C 30 28, 45 20, 50 15 Z" 
                            fill="url(#waxGlow)" 
                            pointerEvents="none"
                          />
                        </svg>

                        {/* Elegant Embossed Letter S */}
                        <span className="absolute inset-0 flex items-center justify-center font-signature text-3xl sm:text-4xl text-primary-foreground/90 font-bold select-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)] pt-1">
                          S
                        </span>
                      </div>
                    </motion.button>

                    <span className="text-xs sm:text-sm font-display text-secondary font-semibold opacity-95 tracking-[2px] uppercase animate-pulse min-h-[16px] text-center">
                      {attempts === 0 && "Tap to break the seal ✨"}
                      {attempts === 1 && "Arre... rukiye thoda 🤭"}
                      {attempts === 2 && "Haan, ab click kijiye 🌸"}
                      {attempts === 3 && "Oops... sorry 😅"}
                      {attempts === 4 && "Achha, ek baar aur kijiye ✨"}
                      {attempts === 5 && "Sorry... phir se bhaag gaya 🤭"}
                      {attempts >= 6 && "Achha, maaf kijiye... ab nahi karunga 🌷"}
                    </span>
                  </>
                ) : (
                  <>
                    {/* Crack / Break Animation container */}
                    <div className="relative w-20 h-20 flex items-center justify-center overflow-visible z-30 select-none">
                      {/* Left cracked half */}
                      <motion.div
                        initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                        animate={{ x: -60, y: 220, rotate: -55, opacity: 0 }}
                        transition={{ duration: 0.65, ease: [0.36, 0.07, 0.19, 0.97] }}
                        className="absolute w-20 h-20"
                        style={{ clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)" }}
                      >
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <defs>
                            <linearGradient id="waxGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#e14c62" />
                              <stop offset="50%" stopColor="#a31d34" />
                              <stop offset="100%" stopColor="#630718" />
                            </linearGradient>
                            
                            <filter id="waxDepthLeft" x="-20%" y="-20%" width="140%" height="140%">
                              <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#78001e" flood-opacity="0.25" result="shadow" />
                              <feOffset dx="0" dy="2" />
                              <feGaussianBlur stdDeviation="2" result="offset-blur-light" />
                              <feComposite operator="out" in="SourceGraphic" in2="offset-blur-light" result="inverse-light" />
                              <feFlood flood-color="white" flood-opacity="0.25" result="color-light" />
                              <feComposite operator="in" in="color-light" in2="inverse-light" result="shadow-light" />
                              <feOffset dx="0" dy="-3" />
                              <feGaussianBlur stdDeviation="3" result="offset-blur-dark" />
                              <feComposite operator="out" in="SourceGraphic" in2="offset-blur-dark" result="inverse-dark" />
                              <feFlood flood-color="black" flood-opacity="0.15" result="color-dark" />
                              <feComposite operator="in" in="color-dark" in2="inverse-dark" result="shadow-dark" />
                              <feMerge>
                                <feMergeNode in="shadow" />
                                <feMergeNode in="SourceGraphic" />
                                <feMergeNode in="shadow-light" />
                                <feMergeNode in="shadow-dark" />
                              </feMerge>
                            </filter>
                          </defs>
                          <path 
                            d="M 50 15 C 25 -5, 5 10, 5 40 C 5 70, 30 82, 50 92 C 70 82, 95 70, 95 40 C 95 10, 75 -5, 50 15 Z" 
                            fill="url(#waxGradLeft)" 
                            filter="url(#waxDepthLeft)"
                            stroke="rgba(255, 255, 255, 0.15)"
                            strokeWidth="1.5"
                          />
                          <path 
                            d="M 50 25 C 32 10, 16 22, 16 44 C 16 66, 36 76, 50 84 C 64 76, 84 66, 84 44 C 84 22, 68 10, 50 25 Z" 
                            fill="#a31d34" 
                            stroke="rgba(0,0,0,0.2)"
                            strokeWidth="1"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center font-signature text-3xl sm:text-4xl text-primary-foreground/90 font-bold pt-1">
                          S
                        </span>
                      </motion.div>

                      {/* Right cracked half */}
                      <motion.div
                        initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                        animate={{ x: 60, y: 220, rotate: 55, opacity: 0 }}
                        transition={{ duration: 0.65, ease: [0.36, 0.07, 0.19, 0.97] }}
                        className="absolute w-20 h-20"
                        style={{ clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)" }}
                      >
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <defs>
                            <linearGradient id="waxGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#e14c62" />
                              <stop offset="50%" stopColor="#a31d34" />
                              <stop offset="100%" stopColor="#630718" />
                            </linearGradient>
                            
                            <filter id="waxDepthRight" x="-20%" y="-20%" width="140%" height="140%">
                              <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#78001e" flood-opacity="0.25" result="shadow" />
                              <feOffset dx="0" dy="2" />
                              <feGaussianBlur stdDeviation="2" result="offset-blur-light" />
                              <feComposite operator="out" in="SourceGraphic" in2="offset-blur-light" result="inverse-light" />
                              <feFlood flood-color="white" flood-opacity="0.25" result="color-light" />
                              <feComposite operator="in" in="color-light" in2="inverse-light" result="shadow-light" />
                              <feOffset dx="0" dy="-3" />
                              <feGaussianBlur stdDeviation="3" result="offset-blur-dark" />
                              <feComposite operator="out" in="SourceGraphic" in2="offset-blur-dark" result="inverse-dark" />
                              <feFlood flood-color="black" flood-opacity="0.15" result="color-dark" />
                              <feComposite operator="in" in="color-dark" in2="inverse-dark" result="shadow-dark" />
                              <feMerge>
                                <feMergeNode in="shadow" />
                                <feMergeNode in="SourceGraphic" />
                                <feMergeNode in="shadow-light" />
                                <feMergeNode in="shadow-dark" />
                              </feMerge>
                            </filter>
                          </defs>
                          <path 
                            d="M 50 15 C 25 -5, 5 10, 5 40 C 5 70, 30 82, 50 92 C 70 82, 95 70, 95 40 C 95 10, 75 -5, 50 15 Z" 
                            fill="url(#waxGradRight)" 
                            filter="url(#waxDepthRight)"
                            stroke="rgba(255, 255, 255, 0.15)"
                            strokeWidth="1.5"
                          />
                          <path 
                            d="M 50 25 C 32 10, 16 22, 16 44 C 16 66, 36 76, 50 84 C 64 76, 84 66, 84 44 C 84 22, 68 10, 50 25 Z" 
                            fill="#a31d34" 
                            stroke="rgba(0,0,0,0.2)"
                            strokeWidth="1"
                          />
                        </svg>
                      </motion.div>
                    </div>

                    <span className="text-[16px] font-display text-primary-foreground font-bold tracking-[2px] uppercase animate-pulse min-h-[16px] text-center drop-shadow-lg">
                      Breaking Seal... 🌷
                    </span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          /* --- MEMORY CARD (OPENED) --- */
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.1 }}
            className="w-[92vw] max-w-[620px] h-[75vh] max-h-[480px] min-h-[420px] z-10 flex"
          >
            <div
              onClick={handleCardClick}
              className="w-full h-full bg-card/95 backdrop-blur-md border border-primary/20 shadow-2xl rounded-2xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/30"
            >
              {/* Top border decoration */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              {/* Page Title & Subtitle */}
              <div className="text-center border-b border-primary/10 pb-3 shrink-0">
                <h1 className="font-display text-xl sm:text-2xl text-primary tracking-wide">
                  10 January 2025
                </h1>
                <p className="font-body text-sm sm:text-base text-muted-foreground/90 italic">
                  Shayad tumhe yaad bhi na ho...<br/>Par mujhe aaj bhi yaad hai.
                </p>
              </div>

              {/* Side-by-Side Content Layout */}
              <div className="flex-1 grid grid-cols-5 gap-4 sm:gap-6 items-center overflow-hidden py-3">
                
                {/* Left Side: Polaroid Calendar */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                  animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="col-span-2 flex flex-col items-center justify-center w-full max-w-[155px] bg-white/60 p-2.5 rounded-lg border border-primary/10 shadow-md mx-auto"
                >
                  <div className="text-center font-display text-[10px] sm:text-[11px] text-primary font-semibold mb-1">
                    January 2025
                  </div>
                  
                  <div className="grid grid-cols-7 gap-y-0.5 gap-x-1 text-[7.5px] sm:text-[8px] text-center font-body w-full">
                    {/* Weekday labels */}
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, idx) => (
                      <span key={idx} className="font-semibold text-muted-foreground/80 text-[6.5px]">{d}</span>
                    ))}
                    
                    {/* Calendar grid */}
                    {calendarDays.map((day, idx) => (
                      <div key={idx} className="relative h-4 flex items-center justify-center">
                        {day === "10" ? (
                          <div className="relative z-10 font-bold text-secondary text-[8.5px] sm:text-[9px] flex items-center justify-center">
                            {day}
                            {/* Gold animated heart around 10 */}
                            <svg className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none" viewBox="0 0 32 32">
                              <motion.path
                                d="M 16 9 C 13 4, 5 4, 5 12 C 5 18, 11 22, 16 26 C 21 22, 27 18, 27 12 C 27 4, 19 4, 16 9 Z"
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 0.9, duration: 1.5, ease: "easeInOut" }}
                              />
                            </svg>
                          </div>
                        ) : (
                          <span className="text-foreground/80">{day}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <span className="font-signature text-lg sm:text-xl text-primary mt-3 rotate-[-3deg] block">
                    The Start...
                  </span>
                </motion.div>

                {/* Right Side: Typewriter Lines */}
                <div className="col-span-3 flex flex-col justify-center h-full pr-1 overflow-hidden">
                  <div className="space-y-1.5 sm:space-y-2 select-text">
                    {/* Completed lines */}
                    {messages.slice(0, visibleCount).map((msg, idx) => (
                      <p
                        key={idx}
                        className="font-body text-xs sm:text-sm text-foreground/90 leading-relaxed text-left"
                      >
                        {msg}
                      </p>
                    ))}

                    {/* Active typing line with cursor */}
                    {visibleCount < messages.length && currentTyped && (
                      <p className="font-body text-xs sm:text-sm text-foreground leading-relaxed typewriter-cursor text-left">
                        {currentTyped}
                      </p>
                    )}
                  </div>
                </div>

              </div>

              {/* Bottom Golden Divider, Quote, and Rounded Button */}
              <div className="shrink-0 flex flex-col items-center justify-center border-t border-primary/10 pt-3 min-h-[80px]">
                {!isTypingComplete ? (
                  /* Soft indicator during typing (no buttons) */
                  <div className="text-[9px] font-display text-primary/45 tracking-widest uppercase animate-pulse pb-2">
                    ✦ discovery in progress ✦
                  </div>
                ) : (
                  /* Revealed Content once complete */
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full flex flex-col items-center space-y-3"
                  >
                    {/* Golden divider */}
                    <div className="w-16 border-t border-primary/30 my-0.5" />

                    {/* Poetic quote */}


                    {/* Premium rounded navigation button */}
                    <div className="pt-0.5 flex justify-center">
                      <Button
                        className="btn-paper flex items-center gap-2 text-[#7a6656] font-bold bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'transparent' }}
                        onClick={(e) => {
                          e.stopPropagation(); // Avoid triggering container click
                          onNext();
                        }}
                      >
                        Aage Chalein? ✨ <ArrowRight size={16} />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
