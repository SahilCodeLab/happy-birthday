import { motion } from "framer-motion";
import ChapterButton from "../components/ChapterButton";
import SoftConfetti from "../components/SoftConfetti";
import FloatingBalloons from "../components/FloatingBalloons";
import GoldenSparkles from "../components/GoldenSparkles";
import FallingPetals from "../components/FallingPetals";
import LotusFlower from "../components/LotusFlower";
import CandleFlame from "../components/CandleFlame";

interface Step5Props {
  onNext: () => void;
}

const Step5Wish = ({ onNext }: Step5Props) => {
  const whatsappNumber = "919876543210"; // Replace with actual number
  const whatsappMessage = encodeURIComponent("Hey Sahil... ✨");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const wishWords = [
    "Peace.",
    "Clarity.",
    "Affection.",
    "Healing.",
    "Sukoon.",
    "Unrush."
  ];

  return (
    <div className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] flex flex-col items-center justify-center px-4 overflow-hidden z-10 select-none">
      {/* Background Celebration */}
      <FallingPetals />
      <SoftConfetti />
      <FloatingBalloons />

      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <CandleFlame className="w-40 h-80 opacity-15 filter blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40, scale: 0.95 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-[92vw] max-w-[450px] h-[80vh] max-h-[580px] min-h-[460px] z-10 flex relative"
      >
        <div className="w-full h-full bg-[#FCFAF2] border border-primary/20 shadow-2xl rounded-2xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent z-20" />
          <div className="absolute left-[40px] sm:left-[55px] top-0 bottom-0 w-[1px] bg-red-400/25 pointer-events-none z-20" />

          <motion.div
            animate={{ opacity: [0.03, 0.06, 0.03], scale: [1.3, 1.35, 1.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
          >
            <LotusFlower className="scale-[1.6] opacity-10 filter blur-[2px]" />
          </motion.div>

          {/* Card Header (Calligraphic plaque) */}
          <div className="text-center border-b border-primary/10 pb-2.5 z-10 shrink-0 flex flex-col items-center">
            <motion.div
              className="py-1 px-4 rounded-xl bg-primary/5 border border-primary/25 backdrop-blur-sm relative overflow-hidden mb-1"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <GoldenSparkles />
              <h2 className="font-signature text-2xl sm:text-3xl text-primary tracking-wide">
                Happy Birthday, Saba.
              </h2>
            </motion.div>
            <p className="font-body text-[10px] sm:text-xs text-muted-foreground/85 italic">
              "Mera 2026 ka wish, tumhare liye..."
            </p>
          </div>

          {/* Ruled Notebook Writing Area */}
          <div 
            className="flex-1 flex flex-col justify-start pl-[38px] sm:pl-[52px] pr-2 z-10 overflow-hidden py-3.5 text-left"
            style={{ 
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 29px, hsl(var(--primary) / 0.12) 29px, hsl(var(--primary) / 0.12) 30px)',
              backgroundAttachment: 'local'
            }}
          >
            {/* Wish words in handwriting on lines */}
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 leading-[30px] m-0">
              {wishWords.map((word, index) => (
                <motion.span
                  key={index}
                  className="font-handwriting text-base sm:text-[17px] text-foreground/90 font-medium"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6 + (index * 0.25),
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Special line */}
            <motion.p 
              className="font-handwriting text-base sm:text-[17px] text-primary font-semibold leading-[30px] m-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.6 }}
            >
              Jo tum deserve karti ho.
            </motion.p>

            <p className="leading-[30px] m-0">&nbsp;</p>

            {/* Message lines */}
            <motion.p 
              className="font-handwriting text-sm sm:text-base text-foreground/80 leading-[30px] m-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.8 }}
            >
              2026 tumhare liye gentle rahe.
            </motion.p>
            <motion.p 
              className="font-handwriting text-sm sm:text-base text-muted-foreground/75 leading-[30px] m-0 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.4, duration: 0.8 }}
            >
              Aur agar kabhi zindagi allow kare…
            </motion.p>
            <motion.p 
              className="font-handwriting text-sm sm:text-base text-muted-foreground/75 leading-[30px] m-0 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.0, duration: 0.8 }}
            >
              toh hum dono ek nayi line likh sakte hain.
            </motion.p>
          </div>

          {/* Footer containing Reply, Signature and Skip */}
          <div className="shrink-0 flex flex-col items-center justify-center border-t border-primary/10 pt-3 z-10 min-h-[110px]">
            {/* Signature & Subtext */}
            <div className="flex items-center justify-between w-full px-2 mb-2">
              <motion.span 
                className="font-body text-[10px] sm:text-xs text-muted-foreground/60 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.6 }}
              >
                Not as pressure. Possibility.
              </motion.span>

              <motion.span 
                className="font-signature text-3xl sm:text-4xl text-primary neon-signature"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.8 }}
              >
                — Sahil
              </motion.span>
            </div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col items-center space-y-1.5 w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.2, duration: 0.6 }}
            >
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-chapter py-2 px-8 text-sm sm:text-base shadow-md inline-block scale-95 hover:scale-100 transition-all duration-300"
              >
                Reply? ✨
              </a>

              <button
                onClick={onNext}
                className="font-display text-xs text-muted-foreground/75 hover:text-foreground transition-colors underline underline-offset-2"
              >
                or continue...
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Step5Wish;
