import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import LotusFlower from "../components/LotusFlower";
import FallingPetals from "../components/FallingPetals";
import CandleFlame from "../components/CandleFlame";
import GoldenSparkles from "../components/GoldenSparkles";
import buttonTexture from "../saba/button texture.jpg";
import SoftConfetti from "../components/SoftConfetti";
import { lines as letterLines } from "./Step3Letter";
import { albumImages } from "./Step4Promises";

const OutroStep = ({ onPrev }: { onPrev?: () => void }) => {
  const [isDimmed, setIsDimmed] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);
  const albumRef = useRef<HTMLDivElement>(null);
  const [isExportingLetter, setIsExportingLetter] = useState(false);
  const [isExportingAlbum, setIsExportingAlbum] = useState(false);

  const downloadLetter = async () => {
    if (!letterRef.current) return;
    setIsExportingLetter(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(letterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#FCFAF2",
        logging: false,
      });
      const dataUrl = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = "Saba_Heartfelt_Letter.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export letter failed:", err);
    } finally {
      setIsExportingLetter(false);
    }
  };

  const downloadAlbum = async () => {
    if (!albumRef.current) return;
    setIsExportingAlbum(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(albumRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#F7F3EE",
        logging: false,
      });
      const dataUrl = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = "Saba_Memory_Collage.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export album failed:", err);
    } finally {
      setIsExportingAlbum(false);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] flex flex-col items-center justify-center px-4 overflow-hidden z-10 select-none bg-gradient-to-b from-background via-cream-dark to-background transition-colors duration-1000">

      {/* Gentle falling petals for peaceful closing ambiance */}
      {!isDimmed && <FallingPetals />}

      {/* Ambient background glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <CandleFlame
          className={`w-48 h-96 filter blur-3xl transition-opacity duration-[3000ms] ${isDimmed ? "opacity-0" : "opacity-15"
            }`}
        />
      </div>

      <SoftConfetti className="absolute inset-0 pointer-events-none" />
      <AnimatePresence mode="wait">
        {!isDimmed ? (
          <motion.div
            key="journal"
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-[92vw] max-w-[400px] bg-white/30 backdrop-blur-xl bg-gradient-to-b from-white/10 via-white/30 to-white/10 border border-primary/20 shadow-2xl rounded-2xl p-3 sm:p-5 flex flex-col relative overflow-hidden text-center z-10"
          >
            {/* Elegant Golden Sparkles drifting over the page */}
            <GoldenSparkles />

            {/* Subtle binder rings style top margin line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20" />

            {/* Content Container (Non-scrollable, tight layout) */}
            <div className="select-none z-10 relative flex flex-col items-center py-1">
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
                className="mb-2 sm:mb-4 flex justify-center text-primary shrink-0"
              >
                <LotusFlower className="h-8 w-8 sm:h-12 sm:w-12" />
              </motion.div>

              {/* Short Heartfelt Closing Message */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-2 sm:space-y-3 my-1 shrink-0"
              >
                {[
                  "Kuch safar bina kisi manzil ke bhi behad khoobsurat hote hain... Shukriya, Saba. 🤍",
                  "Is saal ko mere liye sukoon, muskurahat aur khoobsurat yaadon se bharne ke liye.",
                  "Duaa hai ki aap ka aane wala har panna utna hi gentle aur khoobsurat ho, jitni tum ho. 🌸",
                  "May Allah keep you happy, safe & smiling. Wishing you the Happiest Birthday once again. 🌸❤️"
                ].map((p, idx) => (
                  <p
                    key={idx}
                    className="font-handwriting text-[16px] sm:text-[18px] md:text-[20px] text-[#7a6656] leading-relaxed max-w-[280px] sm:max-w-[320px] mx-auto italic font-normal"
                  >
                    {p}
                  </p>
                ))}
              </motion.div>

              {/* Small Gold Divider */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex items-center justify-center my-2 sm:my-4 gap-2 w-24 mx-auto shrink-0"
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
                className="font-display text-[9px] sm:text-[11px] tracking-[0.2em] text-primary/50 uppercase shrink-0 mt-1"
              >
                ✦ Thank You For Reading ✦
              </motion.h3>
            </div>

            {/* Fixed Bottom Controls Area */}
            <div className="mt-2.5 pt-2 border-t border-primary/10 relative z-20 shrink-0 w-full flex flex-col gap-2">
              {/* Download Gift Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 }}
                className="w-full"
              >
                <div className="flex flex-col items-center gap-1 w-full">
                  <span className="text-[9px] uppercase font-display tracking-widest text-[#7a6656]/60">
                    🎁 Save as Digital Gift
                  </span>
                  <div className="flex items-center justify-center w-full gap-2">
                    <Button
                      onClick={downloadLetter}
                      disabled={isExportingLetter}
                      className="btn-paper flex-1 py-1.5 text-[11px] sm:text-xs text-[#7a6656] font-bold bg-cover bg-center bg-no-repeat rounded-md flex items-center justify-center gap-1"
                      style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'transparent' }}
                    >
                      <span>{isExportingLetter ? "Preparing..." : "Download Letter 📝"}</span>
                    </Button>
                    <Button
                      onClick={downloadAlbum}
                      disabled={isExportingAlbum}
                      className="btn-paper flex-1 py-1.5 text-[11px] sm:text-xs text-[#7a6656] font-bold bg-cover bg-center bg-no-repeat rounded-md flex items-center justify-center gap-1"
                      style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'transparent' }}
                    >
                      <span>{isExportingAlbum ? "Preparing..." : "Download Album 📸"}</span>
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Blow out candle button for peaceful fade-out */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
                className="w-full"
              >
                <div className="flex items-center justify-center w-full gap-2">
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    onClick={() => { if (onPrev) onPrev(); else setIsDimmed(false); }}
                    className="btn-paper px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center text-xs sm:text-sm text-[#7a6656] font-bold bg-cover bg-center bg-no-repeat rounded-md"
                    style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'transparent' }}
                  >
                    ← Back
                  </motion.button>
                  <Button
                    onClick={() => setIsDimmed(true)}
                    className="btn-paper flex-1 py-1.5 sm:py-2 flex items-center justify-center text-xs sm:text-sm text-[#7a6656] font-bold bg-cover bg-center bg-no-repeat rounded-md"
                    style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'transparent' }}
                  >
                    Blow out the candle 🕯️
                  </Button>
                </div>
              </motion.div>

              {/* Small Elegant Footer (Signature & Date) */}
              <div className="pt-1.5 flex flex-col items-center justify-center relative z-10 w-full">
                <div className="w-full flex items-center justify-between px-1 text-[#7a6656]">
                  <div className="text-left">
                    <span className="font-body text-[8px] sm:text-[9px] text-muted-foreground/60 italic block">
                      Just for you....
                    </span>
                    <span className="font-display text-[10px] text-muted-foreground/50 tracking-wider">
                      10 Jan 2025 — 23 June 2026
                    </span>
                  </div>

                  <span className="font-signature text-2xl sm:text-3xl text-primary font-medium leading-none">
                    — Sahil
                  </span>
                </div>
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
              Always in my prayers.
              <br />
               May Allah Keep You Happy, Always. 🪷
            </motion.p>

            {/* Reset option for navigation back */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              transition={{ delay: 6.0, duration: 1.5 }}
              onClick={() => setIsDimmed(false)}
              className="mt-16 text-[10px] font-display uppercase tracking-widest text-primary/60 hover:opacity-100 hover:text-primary transition-all duration-300 underline underline-offset-4"
            >
              ✦ open again ✦
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Letter Container for Image Export */}
      <div
        ref={letterRef}
        style={{
          position: "fixed",
          left: "-9999px",
          top: "-9999px",
          width: "600px",
          backgroundColor: "#FCFAF2",
          padding: "50px 40px 60px 40px",
          fontFamily: "var(--font-handwriting)",
          color: "#7a6656",
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 29px, rgba(212, 163, 89, 0.12) 29px, rgba(212, 163, 89, 0.15) 30px)',
          backgroundAttachment: 'local',
          border: "1px solid rgba(212, 163, 89, 0.2)",
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
        }}
      >
        {/* Notebook Red Margin Line */}
        <div style={{
          position: "absolute",
          left: "80px",
          top: 0,
          bottom: 0,
          width: "2px",
          backgroundColor: "rgba(239, 68, 68, 0.2)",
        }} />

        {/* Content wrapper shifted to the right of red margin line */}
        <div style={{ paddingLeft: "60px", zIndex: 10, position: "relative" }}>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            color: "hsl(var(--primary))",
            textAlign: "center",
            marginBottom: "10px",
            letterSpacing: "2px",
            textTransform: "uppercase"
          }}>
            Baatein Jo Dil Mein Hain
          </h1>
          <p style={{
            fontSize: "14px",
            color: "#8c7b6e",
            fontStyle: "italic",
            textAlign: "center",
            marginBottom: "40px"
          }}>
            "Jo shayad main kabhi keh nahi paaya..."
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {(() => {
              const elements = [];
              let lastBlockIdx = -1;
              for (let i = 0; i < letterLines.length; i++) {
                const line = letterLines[i];
                if (lastBlockIdx !== -1 && line.block !== lastBlockIdx) {
                  elements.push(
                    <div key={`spacer-${i}`} style={{ height: "30px" }} />
                  );
                }
                elements.push(
                  <p key={i} style={{
                    fontSize: "22px",
                    lineHeight: "30px",
                    margin: 0,
                    fontStyle: line.italic ? "italic" : "normal",
                    fontWeight: 500,
                  }}>
                    {line.text}
                  </p>
                );
                lastBlockIdx = line.block;
              }
              return elements;
            })()}
          </div>
        </div>
      </div>

      {/* Hidden Album Container for Image Export */}
      <div
        ref={albumRef}
        style={{
          position: "fixed",
          left: "-9999px",
          top: "-9999px",
          width: "1200px",
          backgroundColor: "#F7F3EE", // Background cream
          padding: "60px 40px",
          color: "#7a6656",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "36px",
          color: "hsl(var(--primary))",
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: "10px"
        }}>
          A Few Precious Moments 🌸
        </h1>
        <p style={{
          fontFamily: "var(--font-handwriting)",
          fontSize: "20px",
          color: "#8c7b6e",
          fontStyle: "italic",
          marginBottom: "50px"
        }}>
          Saba, ye meri sabse favourite pictures hain aapki... 🪷
        </p>

        {/* Polaroid Grid Layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "40px 30px",
          width: "100%",
          maxWidth: "1100px"
        }}>
          {albumImages.map((img, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#FCFAF2",
                border: "1px solid rgba(212, 163, 89, 0.2)",
                borderRadius: "12px",
                padding: "16px 16px 36px 16px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative"
              }}
            >
              {/* Date stamp */}
              <div style={{
                position: "absolute",
                top: "6px",
                left: "12px",
                fontSize: "10px",
                fontFamily: "monospace",
                color: "rgba(212, 163, 89, 0.7)"
              }}>
                {img.date}
              </div>

              {/* Image box - exact 3:4 aspect ratio */}
              <div style={{
                width: "100%",
                aspectRatio: "3/4",
                overflow: "hidden",
                borderRadius: "8px",
                border: "1px solid rgba(212, 163, 89, 0.1)",
                backgroundColor: "#EFECE6",
                marginTop: "14px"
              }}>
                <img
                  src={img.src}
                  alt={img.caption}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OutroStep;
