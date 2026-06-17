import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import LotusFlower from "../components/LotusFlower";
import FallingPetals from "../components/FallingPetals";
import CandleFlame from "../components/CandleFlame";
import GoldenSparkles from "../components/GoldenSparkles";
import buttonTexture from "../saba/button texture.jpg";

const OutroStep = () => {
  const [isDimmed, setIsDimmed] = useState(false);

  return (
    <div className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] flex flex-col items-center justify-center px-4 overflow-hidden z-10 select-none bg-gradient-to-b from-background via-cream-dark to-background transition-colors duration-1000">
      
      {/* Gentle falling petals for peaceful closing ambiance */}
      {!isDimmed && <FallingPetals />}

      {/* Ambient background glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <CandleFlame 
          className={`w-48 h-96 filter blur-3xl transition-opacity duration-[3000ms] ${
            isDimmed ? "opacity-0" : "opacity-15"
          }`} 
        />
      </div>

      <AnimatePresence mode="wait">
        {!isDimmed ? (
          <motion.div
            key="journal"
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-[90vw] max-w-[420px] bg-[#FCFAF2] border border-primary/20 shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden text-center z-10"
          >
            {/* Elegant Golden Sparkles drifting over the page */}
            <GoldenSparkles />

            {/* Subtle binder rings style top margin line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20" />
            <div className="absolute left-[35px] top-0 bottom-0 w-[1px] bg-red-400/15 pointer-events-none z-20" />


            {/* Content Container */}
            <div className="relative z-10 py-6 px-2 sm:px-4 flex flex-col items-center justify-center flex-1 my-auto">
              
              {/* Centered Glowing Lotus Flower */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  filter: [
                    "drop-shadow(0 0 3px rgba(212, 163, 89, 0.3))",
                    "drop-shadow(0 0 12px rgba(212, 163, 89, 0.6))",
                    "drop-shadow(0 0 3px rgba(212, 163, 89, 0.3))"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-6 flex justify-center text-primary"
              >
                <LotusFlower className="h-14 w-14" />
              </motion.div>

              {/* Short Heartfelt Closing Message */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="font-handwriting text-xl sm:text-2xl text-[#7a6656] leading-relaxed max-w-[300px] mx-auto italic font-semibold"
              >
                "Kuch safar bina kisi manzil ke bhi behad khoobsurat hote hain...
                <br /><br />
                Shukriya Saba, is saal ko mere liye sukoon aur muskurahat se bharne ke liye. Duaa hai ki tumhara aane wala har panna utna hi gentle ho, jitni tum ho."
              </motion.p>

              {/* Small Gold Divider */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex items-center justify-center my-6 gap-2 w-28 mx-auto"
              >
                <div className="h-[1px] bg-primary/30 flex-1" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50 rotate-45" />
                <div className="h-[1px] bg-primary/30 flex-1" />
              </motion.div>

              {/* Thank You For Reading Text */}
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1.2 }}
                className="font-display text-xs sm:text-sm tracking-[0.2em] text-primary/60 uppercase"
              >
                ✦ Thank You For Reading ✦
              </motion.h3>
            </div>

            {/* Blow out candle button for peaceful fade-out */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
              className="mt-6 mb-4 relative z-20 shrink-0"
            >
              <Button
                onClick={() => setIsDimmed(true)}
                className="btn-paper px-6 py-2 text-xs sm:text-sm shadow-md hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover' }}
              >
                Blow out the candle 🕯️
              </Button>
            </motion.div>

            {/* Small Elegant Footer (Signature & Date) */}
            <div className="border-t border-primary/10 pt-3 flex flex-col items-center justify-center relative z-10 shrink-0">
              <div className="w-full flex items-center justify-between px-2 text-[#7a6656]">
                <div className="text-left">
                  <span className="font-body text-[9px] text-muted-foreground/60 italic block">
                    Made for Saba
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground/50 tracking-wider">
                    10 Jan 2025 — 10 Jan 2026
                  </span>
                </div>
                
                <span className="font-signature text-2xl sm:text-3xl text-primary font-medium leading-none">
                  — Sahil
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Silent, emotional fade-out view */
          <motion.div
            key="dimmed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.0 }}
            className="flex flex-col items-center justify-center text-center z-10"
          >
            {/* Tiny fading candle ember */}
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: [1, 0.9, 0.8], opacity: 0 }}
              transition={{ duration: 3.5, ease: "easeOut" }}
              className="mb-8"
            >
              <CandleFlame size="sm" />
            </motion.div>

            {/* Final comforting words fading in slowly */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 1, 0.7] }}
              transition={{ duration: 4.5, times: [0, 0.3, 0.8, 1], ease: "easeInOut" }}
              className="font-handwriting text-2xl sm:text-3xl text-primary/75 italic leading-relaxed"
            >
              "Always in my prayers.
              <br />
              Khush raho hamesha, Saba. 🌸"
            </motion.p>

            {/* Reset option for navigation back */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              transition={{ delay: 6.0, duration: 1.5 }}
              onClick={() => setIsDimmed(false)}
              className="mt-16 text-[10px] font-display uppercase tracking-widest text-primary/60 hover:opacity-100 hover:text-primary transition-all duration-300 underline underline-offset-4"
            >
              ✦ open journal again ✦
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OutroStep;
