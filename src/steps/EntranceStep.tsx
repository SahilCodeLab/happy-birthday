import { motion } from "framer-motion";
import CandleFlame from "../components/CandleFlame";
import TypewriterText from "../components/TypewriterText";
import { Button } from "../components/ui/button";
import buttonTexture from "../saba/button texture.jpg";
import FallingPetals from "../components/FallingPetals";
import SoftConfetti from "../components/SoftConfetti";
import GoldenSparkles from "../components/GoldenSparkles";
import FloatingBalloons from "../components/FloatingBalloons";
import lotusImage from "../saba/download.png";

interface EntranceStepProps {
  onNext: () => void;
}

const EntranceStep = ({ onNext }: EntranceStepProps) => {
  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center px-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      {/* --- BACKGROUND CELEBRATION ELEMENTS --- */}

      {/* 1. Falling Petals Animation */}
      <FallingPetals />

      {/* 2. Soft Confetti */}
      <SoftConfetti />

      {/* 3. Floating Glassmorphic Balloons */}
      <FloatingBalloons />

      {/* 4. Ambient Glow */}
      <motion.div
        className="lotus-ambient"
        animate={{ opacity: [0.12, 0.18, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full max-w-xl h-full py-8 sm:py-12">

        {/* TEXT SECTION */}
        <motion.div
          className="text-center z-20 flex flex-col items-center mb-[-20px] sm:mb-[-35px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <h1 className="heading-primary text-4xl sm:text-5xl md:text-6xl mb-6 sm:mb-8">
            <TypewriterText text="23 June 2026" speed={80} delay={500} />
          </h1>

          <div className="flex flex-col items-center space-y-3 relative">
            
            {/* Calligraphic Highlighted Plaque */}
            <motion.div
              className="py-4 px-8 my-1 rounded-2xl bg-[#FCFAF2]/80 border border-primary/30 backdrop-blur-md relative overflow-hidden shadow-2xl inline-block"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            >
              {/* Decorative gold corners */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-primary/40" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/40" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-primary/40" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-primary/40" />

              {/* Twinkling gold sparkles within the plaque */}
              <GoldenSparkles />
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none animate-pulse" />
              
              <h2 className="font-signature text-5xl sm:text-6xl md:text-7xl text-primary drop-shadow-md select-none px-2 py-0.5 tracking-normal leading-normal"
                  style={{ textShadow: "0 2px 8px hsl(var(--gold) / 0.3)" }}>
                Happy Birthday, Saba.
              </h2>
            </motion.div>

            <p className="font-body text-xs sm:text-sm md:text-base text-foreground/90 italic max-w-xs sm:max-w-md"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              Aaj aap ka birthday hai. 🫶💗 <br></br>
              Aur is baar 
              mere paas aap ke liye kuch khaas hai.
              <motion.hr className="divider-gold mt-4 mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.6 }} />
            </p>
          </div>
        </motion.div>

        {/* CANDLES & LOTUS SECTION */}
        <div className="flex items-end justify-center gap-2 sm:gap-6 md:gap-10 w-full px-2 relative my-auto">

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="pb-2 sm:pb-4 scale-75 sm:scale-100 origin-bottom shrink-0"
          >
            <CandleFlame size="lg" />
          </motion.div>

          <div className="relative z-10 flex items-center justify-center shrink-0">
            {/* Soft pink glow behind the custom image */}
            <motion.div
              className="absolute bg-pink-500/25 blur-3xl rounded-full w-32 h-32 sm:w-56 sm:h-56"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Upright slow rotation sway (never turns upside down) */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                scale: 1.1, 
                y: 0,
                rotate: [-8, 8, -8]
              }}
              transition={{ 
                opacity: { duration: 1.5, delay: 0.8 },
                scale: { duration: 1.5, delay: 0.8, type: "spring", bounce: 0.3 },
                y: { duration: 1.5, delay: 0.8, type: "spring", bounce: 0.3 },
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <img
                src={lotusImage}
                alt="Lotus"
                className="w-[170px] h-[130px] sm:w-[320px] sm:h-[260px] object-contain drop-shadow-2xl mb-[-15px] sm:mb-[-25px]"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="pb-2 sm:pb-4 scale-75 sm:scale-100 origin-bottom shrink-0"
          >
            <CandleFlame size="lg" />
          </motion.div>

        </div>

        {/* BUTTON */}
        <div className="z-30">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.5, ease: "easeOut" }}
          >
            <Button
              className="btn-paper flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-6 text-[#7a6656] font-bold text-base sm:text-lg min-w-[200px] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'transparent' }}
              onClick={onNext}
            >
             For You, Saba... 🌸
            </Button>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

export default EntranceStep;