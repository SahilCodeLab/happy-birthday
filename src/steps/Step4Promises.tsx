import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import FloatingCandles from "../components/FloatingCandles";
import FallingPetals from "../components/FallingPetals";
import LotusFlower from "../components/LotusFlower";
import CandleFlame from "../components/CandleFlame";
import buttonTexture from "../saba/button texture.jpg";

// Import beautiful memory images
import img1 from "../saba/IMG-20250608-WA0000.jpg";
import img2 from "../saba/IMG-20250608-WA0001.jpg";
import img3 from "../saba/IMG-20250625-WA0000.jpg";
import img4 from "../saba/IMG-20250625-WA0001.jpg";
import img5 from "../saba/IMG-20250625-WA0002.jpg";
import img6 from "../saba/IMG-20251212-WA0000.jpg";
import img7 from "../saba/IMG-20251212-WA0001.jpg";
import img8 from "../saba/IMG-20251212-WA0002.jpg";

interface Step4Props {
  onNext: () => void;
  onPrev?: () => void;
}

const albumImages = [
  { src: img1, caption: "Saba... tumhaari smile sabse pyaari hai ✨", date: "8 June 2025" },
  { src: img2, caption: "Har ek lamha jo tumhare sath beeta... 💖", date: "8 June 2025" },
  { src: img3, caption: "Sukoon bhari baatein, aur dher saari yaadein 🌟", date: "25 June 2025" },
  { src: img4, caption: "Tumhari hansi jaise koi khoobsurat geet ho 🌸", date: "25 June 2025" },
  { src: img5, caption: "Saba, you bring warmth and light to everything 💕", date: "25 June 2025" },
  { src: img6, caption: "Ye pyaare pal hamesha dil ke paas rahenge 💫", date: "12 Dec 2025" },
  { src: img7, caption: "Tumhare chehre ki khushi hi sab kuch hai 🌹", date: "12 Dec 2025" },
  { src: img8, caption: "Always keeping these memories safe in my heart 🥰", date: "12 Dec 2025" },
];

export default function Step4Promises({ onNext, onPrev }: Step4Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const handleNextCard = () => {
    setActiveIndex((prev) => (prev + 1) % albumImages.length);
  };

  const handlePrevCard = () => {
    setActiveIndex((prev) => (prev - 1 + albumImages.length) % albumImages.length);
  };

  const toggleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] flex flex-col items-center justify-between py-6 px-4 overflow-hidden z-10 select-none bg-gradient-to-b from-background via-cream-dark to-background">
      <FloatingCandles />
      <FallingPetals />

      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <CandleFlame className="w-40 h-80 opacity-15 filter blur-3xl" />
      </div>

      {/* Header Area */}
      <div className="text-center z-10 mt-2 shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-1">
            <LotusFlower className="h-10 w-10 text-primary opacity-80" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-primary tracking-widest uppercase">
            Saba's Journal
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted-foreground italic mt-1 max-w-[320px]">
            "Kuch haseen yaadein jo humare safar ko khoobsurat banati hain..."
          </p>
        </motion.div>
      </div>

      {/* 3D Carousel Area */}
      <div 
        className="w-full flex-1 flex items-center justify-center relative my-4 overflow-visible"
        style={{ perspective: "1200px" }}
      >
        <div className="relative w-full max-w-[90vw] sm:max-w-[420px] h-[340px] sm:h-[400px] flex items-center justify-center">
          {albumImages.map((image, index) => {
            const diff = index - activeIndex;
            const isActive = index === activeIndex;
            
            // Render only current, left, and right cards to save performance & prevent overflow
            const isVisible = Math.abs(diff) <= 1 || (activeIndex === 0 && index === albumImages.length - 1) || (activeIndex === albumImages.length - 1 && index === 0);
            
            if (!isVisible) return null;

            // Handle wrap-around diff for proper 3D positioning
            let calculatedDiff = diff;
            if (diff > 1) calculatedDiff = diff - albumImages.length;
            if (diff < -1) calculatedDiff = diff + albumImages.length;

            const scale = isActive ? 1.05 : 0.85;
            const rotateY = isActive ? 0 : calculatedDiff < 0 ? 35 : -35;
            const rotateZ = isActive ? 0 : calculatedDiff < 0 ? -4 : 4;
            const xOffset = calculatedDiff * 140; // Spacing between cards
            const zIndex = 50 - Math.abs(calculatedDiff) * 10;
            const opacity = isActive ? 1 : 0.6;

            return (
              <motion.div
                key={index}
                style={{
                  position: "absolute",
                  zIndex: zIndex,
                  transformStyle: "preserve-3d",
                }}
                initial={false}
                animate={{
                  x: xOffset,
                  scale: scale,
                  rotateY: rotateY,
                  rotateZ: rotateZ,
                  opacity: opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                }}
                whileHover={isActive ? {
                  scale: 1.08,
                  y: -8,
                  rotate: 0,
                  transition: { duration: 0.3 }
                } : {}}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 60) {
                    handlePrevCard();
                  } else if (info.offset.x < -60) {
                    handleNextCard();
                  }
                }}
                className="w-[280px] sm:w-[320px] h-[320px] sm:h-[370px] bg-[#FCFAF2] border-2 border-primary/20 rounded-xl p-4 flex flex-col justify-between cursor-grab active:cursor-grabbing shadow-[0_12px_28px_rgba(0,0,0,0.15)] relative overflow-hidden"
              >
                {/* Vintage tape top accent */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-primary/10 rotate-1 rounded backdrop-blur-sm pointer-events-none border-b border-primary/5" />

                {/* Date stamp */}
                <div className="absolute top-3 left-4 text-[9px] font-mono text-primary/60 tracking-wider">
                  {image.date}
                </div>

                {/* Heart overlay / like indicator */}
                <button
                  onClick={(e) => toggleLike(index, e)}
                  className="absolute top-3 right-4 z-20 transition-all duration-300 hover:scale-125 focus:outline-none"
                >
                  <Heart
                    className={`h-5 w-5 stroke-primary/55 transition-colors ${
                      liked[index] ? "fill-red-500 stroke-red-500 scale-110 drop-shadow-[0_2px_8px_rgba(239,68,68,0.5)]" : "text-primary/70"
                    }`}
                  />
                </button>

                {/* Interactive Heart Drawing effect when liked */}
                <AnimatePresence>
                  {liked[index] && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.8 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 pointer-events-none flex items-center justify-center z-10"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="bg-red-500/10 p-4 rounded-full border border-red-500/20"
                      >
                        <Heart className="h-16 w-16 fill-red-500 text-red-500 opacity-60 filter drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Premium Image Container */}
                <div className="w-full h-[190px] sm:h-[230px] rounded-lg overflow-hidden border border-primary/10 shadow-inner bg-cream mt-4 relative">
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    loading="eager"
                  />
                  
                  {/* Subtle paper grain texture overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-noise" />
                </div>

                {/* Caption text */}
                <div className="flex-1 flex flex-col justify-center items-center px-1 py-2 text-center">
                  <p className="font-handwriting text-[#7a6656] text-base sm:text-lg leading-relaxed m-0 italic font-medium">
                    {image.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Dot Indicator */}
      <div className="flex gap-2 z-10 mb-2 justify-center items-center shrink-0">
        {albumImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === activeIndex ? "w-4 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-primary/30 hover:bg-primary/50"
            }`}
          />
        ))}
      </div>

      {/* Step Navigation Footer */}
      <div className="w-full max-w-[420px] shrink-0 flex flex-col items-center space-y-3 z-10 pb-2 border-t border-primary/10 pt-3">
        <div className="flex w-full items-center justify-between px-2 gap-4">
          {onPrev && (
            <Button
              className="btn-paper flex-1 flex items-center justify-center gap-1.5 py-2"
              style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover' }}
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Pichla? 🌸
            </Button>
          )}

          <Button
            className="btn-paper flex-1 flex items-center justify-center gap-1.5 py-2"
            style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover' }}
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            Aage? ✨
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
