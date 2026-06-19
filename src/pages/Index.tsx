import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AudioPlayer, { AudioPlayerHandle } from "../components/AudioPlayer";
import EntranceStep from "../steps/EntranceStep";
import Step1Message from "../steps/Step1Message";
import Step2Moments from "../steps/Step2Moments";
import Step3Letter from "../steps/Step3Letter";
import Step4Promises from "../steps/Step4Promises";
import OutroStep from "../steps/OutroStep";

// Import all images to preload them
import lotusImage from "../saba/download.png";
import letterPaper from "../saba/latter paper.webp";
import flower1_1 from "../saba/flower1 (1).png";
import flower1_2 from "../saba/flower1 (2).png";
import flowerBtn from "../saba/flower1 (3).png";
import flower4 from "../saba/flower4.png";
import buttonTexture from "../saba/button texture.jpg";

import img1 from "../saba/IMG-20250608-WA0000.jpg";
import img2 from "../saba/IMG-20250608-WA0001.jpg";
import img3 from "../saba/IMG-20250625-WA0000.jpg";
import img4 from "../saba/IMG-20250625-WA0001.jpg";
import img5 from "../saba/IMG-20250625-WA0002.jpg";
import img6 from "../saba/IMG-20251212-WA0000.jpg";
import img7 from "../saba/IMG-20251212-WA0001.jpg";
import img8 from "../saba/IMG-20251212-WA0002.jpg";

import { Button } from "../components/ui/button";
import { Lock } from "lucide-react";
import FallingPetals from "../components/FallingPetals";

// Inner Preloader Component
const Preloader = ({ progress }: { progress: number }) => {
  const loadingMessages = [
    "Placing roses in the journal... 🌸",
    "Lighting the gentle candles... 🕯️",
    "Tuning the background music... 🎵",
    "Unfolding the sweet memories... ✨",
  ];
  const messageIdx = Math.min(Math.floor(progress / 25), loadingMessages.length - 1);

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] flex flex-col justify-center items-center z-50 bg-[#F7F3EE]">
      {/* Background texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <FallingPetals />
      
      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Pulsing Lotus */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            rotate: [-2, 2, -2]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <img src={lotusImage} alt="Lotus" className="w-40 h-32 object-contain filter drop-shadow-2xl" />
        </motion.div>

        {/* Title */}
        <h2 className="font-signature text-5xl text-primary mb-3">Saba's Journal</h2>
        <p className="font-display text-sm tracking-[0.15em] text-muted-foreground/80 uppercase mb-8">
          Loading Sweet Memories
        </p>

        {/* Vintage Progress bar */}
        <div className="w-64 h-2 bg-[#7a6656]/10 rounded-full overflow-hidden relative border border-[#7a6656]/5 shadow-inner mb-3">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary via-accent to-primary"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Percentage */}
        <span className="font-handwriting text-2xl text-[#7a6656] block mb-6">{progress}%</span>

        {/* Loading Message */}
        <motion.p
          key={messageIdx}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="font-body text-xs italic text-[#7a6656]/80"
        >
          {loadingMessages[messageIdx]}
        </motion.p>
      </div>
    </div>
  );
};

// Inner Password Screen Component
const PasswordProtection = ({ onUnlock }: { onUnlock: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "saba23/06/2026") {
      onUnlock();
    } else {
      setError("Incorrect password. Hint: a very special date (sabaDD/MM/YYYY) 🌸");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] flex justify-center items-center z-50 bg-[#F7F3EE]">
      <div 
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--candle-glow)/0.05)_0%,transparent_70%)] pointer-events-none" />
      <FallingPetals />

      <motion.div
        animate={isShaking ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="w-[90vw] max-w-[400px] bg-[#FCFAF2] border border-primary/20 shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden z-10"
      >
        {/* Binder rings and paper line decoration */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20" />
        <div className="absolute left-[30px] top-0 bottom-0 w-[1px] bg-red-400/15 pointer-events-none z-20" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Lock Icon */}
          <div className="p-4 rounded-full bg-primary/10 text-primary mb-5 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl text-foreground text-center mb-1">
            Unlock Saba's Gift
          </h2>
          <p className="font-handwriting text-lg text-muted-foreground text-center mb-6">
            Enter the password to read the journal...
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Enter password..."
                value={password}
                autoFocus
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                className="w-full text-center px-4 py-3 bg-[#FCFAF2] border border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground font-body placeholder:text-muted-foreground/40 transition-all shadow-inner text-lg"
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 font-handwriting text-base text-center mt-1"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <Button
              type="submit"
              className="btn-paper w-full flex items-center justify-center gap-1.5 py-3 px-6 text-[#7a6656] font-bold text-lg bg-cover bg-center bg-no-repeat mt-4"
              style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'transparent' }}
            >
              Unlock Journal 🔑
            </Button>
          </form>
        </div>

        {/* Small Elegant Footer */}
        <div className="border-t border-primary/10 pt-4 mt-6 flex justify-between items-center text-[#7a6656]/60 text-[10px] font-mono">
          <span>FOR SABA</span>
          <span>23 JUNE 2026</span>
        </div>
      </motion.div>
    </div>
  );
};

const Index = () => {
  const [isPreloading, setIsPreloading] = useState(true);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const audioRef = useRef<AudioPlayerHandle>(null);

  // Asset preloading routine
  useEffect(() => {
    const imagesToPreload = [
      lotusImage,
      letterPaper,
      flower1_1,
      flower1_2,
      flowerBtn,
      flower4,
      buttonTexture,
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8
    ];

    const audiosToPreload = [
      "/Tum Se Hi - Lofi _ Slowed Reverb.mp3",
      "/Tum Kya Mile Tum Kya Mile - Arijit Singh _ Shreya Ghoshal _ Hindi.mp3",
      "/Saiyaara – Barbaad _ Slowed Reverb.mp3",
      "/kun_faya_kun.mp3"
    ];

    const totalAssets = imagesToPreload.length + audiosToPreload.length;
    let loadedAssets = 0;

    const updateProgress = () => {
      loadedAssets++;
      const progress = Math.min(100, Math.round((loadedAssets / totalAssets) * 100));
      setPreloadProgress(progress);
      if (loadedAssets >= totalAssets) {
        setTimeout(() => {
          setIsPreloading(false);
        }, 800);
      }
    };

    // Fail-safe timer (10 seconds max)
    const failSafeTimer = setTimeout(() => {
      setPreloadProgress(100);
      setIsPreloading(false);
    }, 10000);

    // Preload Images
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress;
      img.src = src;
    });

    // Preload Audios (using fetch to ensure complete resource download to cache)
    audiosToPreload.forEach(async (src) => {
      try {
        const response = await fetch(src);
        if (!response.ok) throw new Error();
        await response.blob();
        updateProgress();
      } catch (err) {
        // Fallback to HTML Audio loading if fetch/CORS fails
        const audio = new Audio();
        audio.oncanplaythrough = updateProgress;
        audio.onerror = updateProgress;
        audio.src = src;
        audio.load();
      }
    });

    return () => clearTimeout(failSafeTimer);
  }, []);

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // Jab user "Begin" click karega, tab audio play hoga
  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    nextStep();
  };

  const steps = [
    <EntranceStep key="entrance" onNext={handleStart} />,
    <Step1Message key="step1" onNext={nextStep} />,
    <Step2Moments key="step2" onNext={nextStep} onPrev={prevStep} />,
    <Step3Letter key="step3" onNext={nextStep} onPrev={prevStep} />,
    <Step4Promises key="step4" onNext={nextStep} onPrev={prevStep} />,
    <OutroStep key="outro" />,
  ];

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-gradient-to-b from-background via-cream-dark to-background flex flex-col justify-center items-center select-none">
      <AnimatePresence mode="wait">
        {isPreloading ? (
          <motion.div key="preloader" className="w-full h-full">
            <Preloader progress={preloadProgress} />
          </motion.div>
        ) : !isUnlocked ? (
          <motion.div 
            key="lockscreen" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <PasswordProtection onUnlock={() => setIsUnlocked(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="app-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full relative flex flex-col justify-center items-center"
          >
            {/* Background texture overlay */}
            <div 
              className="fixed inset-0 pointer-events-none opacity-30 z-0"
              style={{
                background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Warm ambient glow at top */}
            <div 
              className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-0"
              style={{
                background: `radial-gradient(ellipse at center top, hsl(var(--candle-glow) / 0.08), transparent 70%)`,
              }}
            />

            {/* ONLINE AUDIO PLAYER */}
            <AudioPlayer 
              ref={audioRef}
              audioSrc="https://cdn.pixabay.com/download/audio/2022/03/09/audio_822ca87a29.mp3?filename=piano-moment-119623.mp3" 
            />

            {/* Step indicator */}
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <motion.div
                className="fixed top-6 left-6 z-50 flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {Array.from({ length: steps.length - 1 }, (_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < currentStep ? "bg-primary" : "bg-muted"
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  />
                ))}
              </motion.div>
            )}

            {/* Main content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full h-full flex flex-col items-center justify-center overflow-hidden"
              >
                {steps[currentStep]}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
