import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AudioPlayer, { AudioPlayerHandle } from "../components/AudioPlayer";
import EntranceStep from "../steps/EntranceStep";
import Step1Message from "../steps/Step1Message";
import Step2Moments from "../steps/Step2Moments";
import Step3Letter from "../steps/Step3Letter";
import Step4Promises from "../steps/Step4Promises";
import Step5Wish from "../steps/Step5Wish";
import OutroStep from "../steps/OutroStep";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const audioRef = useRef<AudioPlayerHandle>(null);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // Jab user "Begin" click karega, tab audio web se play hoga
  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    nextStep();
  };

  const steps = [
    <EntranceStep key="entrance" onNext={handleStart} />,
    <Step1Message key="step1" onNext={nextStep} />,
    <Step2Moments key="step2" onNext={nextStep} />,
    <Step3Letter key="step3" onNext={nextStep} />,
    <Step4Promises key="step4" onNext={nextStep} />,
    <Step5Wish key="step5" onNext={nextStep} />,
    <OutroStep key="outro" />,
  ];

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-gradient-to-b from-background via-cream-dark to-background flex flex-col justify-center items-center select-none">
      {/* Background texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
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
      {/* Yeh link direct web se music play karega */}
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
    </div>
  );
};

export default Index;
