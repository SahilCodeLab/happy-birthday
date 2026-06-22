import { useState, useEffect, useRef } from "react";
import { handleBlockMusic, stopAllMusic } from "../musicController";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import FallingPetals from "../components/FallingPetals";
import LotusFlower from "../components/LotusFlower";
import CandleFlame from "../components/CandleFlame";
import { ArrowRight, ArrowLeft } from "lucide-react";
import letterPaper from "../saba/latter paper.webp";
import flower1_1 from "../saba/flower1 (1).png";
import flower4 from "../saba/flower4.png";
import buttonTexture from "../saba/button texture.jpg";

interface Step3Props {
  onNext: () => void;
  onPrev?: () => void;
}

export const lines = [
  { text: "Happy Birthday, Saba.🌷", block: 0 },
  { text: "Pata hai...", block: 0 },
  { text: "Ye aapke liye meri second birthday wish hai...", block: 0 },
  { text: "Aur jab main ye sab likhne baitha,", block: 0 },
  { text: "to mujhe samajh hi nahi aaya ki shuruaat kahan se karun.", block: 0 },

  { text: "10 January 2025 se?", block: 1 },
  { text: "Hamari pehli conversation se?", block: 1 },
  { text: "Ya phir us din se...", block: 1 },
  { text: "jab mujhe ehsaas hua ki aap meri zindagi me", block: 1 },
  { text: "sirf ek aur insaan bankar nahi aayi hain.", block: 1 },

  { text: "Aaj June 2026 hai.", block: 2 },
  { text: "Aur kabhi kabhi lagta hai ki ye ek saal", block: 2 },
  { text: "bas yun hi nikal gaya.", block: 2 },
  { text: "Lekin phir main ruk kar sochta hoon...", block: 2 },
  { text: "To realize hota hai ki is ek saal me", block: 2 },
  { text: "kitni yaadein, kitni baatein aur kitne moments jud gaye hain. ", block: 2 },

  { text: "Ab tak hum sirf chaar baar mile hain.", block: 3 },
  { text: "Sirf chaar baar.", block: 3 },
  { text: "Lekin ajeeb baat ye hai...", block: 3 },
  { text: "ki mujhe aaj bhi har mulaqat yaad hai.", block: 3 },

  { text: "Kaise main aapse milne gaya tha.", block: 4 },
  { text: "Kaise aap saamne aayi thi aur hum baat kar rahe the.", block: 4 },
  { text: "Kaise har baar lagta tha ki waqt bahut jaldi nikal gaya,", block: 4 },
  { text: "aur ghar lautne ke baad bhi woh din yaad rehta tha.", block: 4 },
  { text: "Kaise kuch normal moments bhi yaadon me bas gaye.", block: 4 },

  { text: "Kabhi kabhi main sochta hoon...", block: 5 },
  { text: "Kyun itni baatein aur moments yaad reh gaye?", block: 5 },
  { text: "Kyun aapka message dekh kar mood achha ho jaata hai?", block: 5 },
  { text: "Kyun aapki khushi dekh kar dil ko sukoon milta hai,", block: 5 },
  { text: "aur aapka udaas hona bilkul achha nahi lagta?", block: 5 },

  { text: "Aur phir jawab milta hai...", block: 6 },
  { text: "Shayad isliye...", block: 6 },
  { text: "Kyuki un sab baaton ke peeche koi aur nahi,", block: 6 },
  { text: "Aap thi, Saba.🌷", block: 6 },

  { text: "Shayad aapko kabhi andaaza bhi na ho...", block: 7 },
  { text: "Lekin aapke meri life me aane ka impact", block: 7 },
  { text: "mujhe bahut pehle se feel hone laga tha.", block: 7 },

  { text: "Main jab ek saal pehle wale khud ko dekhta hoon...", block: 8 },
  { text: "Aur aaj wale khud ko dekhta hoon...", block: 8 },
  { text: "To mujhe ek bada difference nazar aata hai.", block: 8 },
  { text: "Aur us difference me aapka bhi ek bada hissa hai.🫶", block: 8 },

  { text: "Aap mujhe kahan se kahan le aayi hain...", block: 9 },
  { text: "Ye shayad main kabhi properly explain bhi na kar paun.", block: 9 },
  { text: "Ye line main aapko impress karne ke liye nahi likh raha,", block: 9 },
  { text: "Main bas sach likh raha hoon, aapne meri zindagi ko behtar bana diya.", block: 9 },

  { text: "Saba...🌷", block: 10 },
  { text: "Pata hi nahi chala kab aap sirf ek naam se", block: 10 },
  { text: "badhkar meri ek aadat ban gayi...", block: 10 },

  { text: "Saba...🌷", block: 11 },
  { text: "Jaise jaise waqt guzarta gaya,", block: 11 },
  { text: "main aapko aur bhi kareeb se mehsoos karta gaya...", block: 11 },

  { text: "Saba...🌷", block: 12 },
  { text: "Pehle hamari baatein achhi lagti thi, phir unka intezaar hone laga.", block: 12 },
  { text: "Pehle aap zindagi ka ek hissa thi, phir dheere dheere usme ghul si gayi...", block: 12 },

  { text: "Saba...🌷", block: 13 },
  { text: "Waqt ke saath log door hote dekhe hain,", block: 13 },
  { text: "lekin aap waqt ke saath aur kareeb aati gayi.", block: 13 },
  { text: "Aapki aadat kab padi, ye mujhe aaj tak nahi pata...", block: 13 },

  { text: "Aur haan...", block: 14 },
  { text: "Ek complaint bhi hai. 😕", block: 14 },
  { text: "Kabhi kabhi aapka seen karke gayab ho jaana", block: 14 },
  { text: "aaj bhi samajh nahi aata....", block: 14 },

  { text: "Lekin phir yaad aata hai...", block: 15 },
  { text: "Ye wahi Saba hain jo daantti bhi hain,", block: 15 },
  { text: "gussa bhi karti hain aur phir care bhi karti hain.♥️", block: 15 },
  { text: "Aur sach kahun, mujhe aapki ye baat bhi achhi lagti hai...", block: 15 },

  { text: "Saba...🌷", block: 18 },
  { text: "Aapka past jaisa bhi raha ho...", block: 18 },
  { text: "Meri dil se dua hai ki Allah aapka future usse kahin zyada khoobsurat likhe.", block: 18 },
  { text: "Aapki har genuine dua qubool ho, aur aap hamesha muskurati rahiye...", block: 18 },

  { text: "May Allah bless you with good health🫶, happiness, peace, and endless barakah. ♥️", block: 19 },
  { text: "May He make your present beautiful and your future bright. ✨", block: 19 },
  { text: "May your heart always find comfort in what is best for you. 🌸", block: 19 },

  { text: "May Allah grant you success in your studies, your dreams,", block: 20 },
  { text: "and every path you choose to walk.", block: 20 },
  { text: "May every difficulty be followed by ease,", block: 20 },
  { text: "every worry by peace, and every tear by a reason to smile. ✨♥️", block: 20 },

  { text: "Whenever you feel lost, may Allah guide you.", block: 21 },
  { text: "Whenever you feel tired, may He give you strength.", block: 21 },
  { text: "And whenever life feels heavy,", block: 21 },
  { text: "may He fill your heart with peace. 🌷", block: 21 },

  { text: "May every sincere prayer you make be accepted.", block: 22 },
  { text: "May every beautiful dream you have come closer to reality. ✨", block: 22 },
  { text: "And may every step you take lead you towards something better.", block: 22 },

  { text: "And one more thing, Saba...💗", block: 23 },
  { text: "May Allah never let your heart feel the pain of losing something truly precious. ♥️", block: 23 },

  { text: "But if there ever comes a day when life feels difficult...", block: 24 },
  { text: "Or your heart feels a little too heavy...", block: 24 },
  { text: "Please don't think that you are alone. 🌸", block: 24 },

  { text: "I may not be able to solve every problem for you.", block: 25 },
  { text: "But I will always try to listen.", block: 25 },
  { text: "I will always try to understand.", block: 25 },
  { text: "And I will always try to be there whenever you need someone to listen.. ✨", block: 25 },

  { text: "May Allah always protect your heart, your smile, and the people you love.♥️", block: 26 },
  { text: "Ameen. ✨🖤", block: 26 },

  { text: "Thank you...", block: 27 },
  { text: "Thank you for being you, for all the conversations and memories.", block: 27 },
  { text: "Thank you for every smile, every laugh, and every time you cared.", block: 27 },
  { text: "And thank you for becoming such a beautiful part of my life...", block: 27 },

  { text: "Aur bas Saba... Itna hi.", block: 28 },
  { text: "Shayad agar main likhta rahun, to ye letter kabhi khatam hi na ho...", block: 28 },
  { text: "Thank you so much for reading all of this. 🌸", block: 28 },
  { text: "Once again, a very Happy Birthday to you, Saba.🎂💗", block: 29 },
  { text: "— Sahil...", block: 28, italic: true }
];


export default function Step3Letter({ onNext, onPrev }: Step3Props) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, when: "beforeChildren" },
    },
  };

  const [currentLineText, setCurrentLineText] = useState("");
  const [activeLineIdx, setActiveLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const isLeavingRef = useRef(false);

  // Auto-scroll to bottom of the writing area during typewriter typing
  useEffect(() => {
    if (!isTypingComplete && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [activeLineIdx, currentLineText, isTypingComplete]);

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
        if (isLeavingRef.current) return;
        setCurrentLineText(fullText.slice(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const nextLine = lines[activeLineIdx + 1];
      const isNewBlock = nextLine && nextLine.block !== currentLine.block;
      const pauseDuration = isNewBlock ? 1500 : 800;

      const pauseTimer = setTimeout(() => {
        if (isLeavingRef.current) return;
        setCurrentLineText("");
        setCharIdx(0);
        setActiveLineIdx((prev) => prev + 1);
      }, pauseDuration);

      return () => clearTimeout(pauseTimer);
    }
  }, [activeLineIdx, charIdx, isTypingComplete]);

  // Clean-up hook to stop music when navigating away from this step
  useEffect(() => {
    return () => {
      isLeavingRef.current = true;
      void stopAllMusic(0); // stop instantly on unmount
    };
  }, []);

  // ---------------------------------------------------------------
  // New: trigger background music when the block changes.
  // ---------------------------------------------------------------
  useEffect(() => {
    if (isLeavingRef.current) return;
    if (activeLineIdx < lines.length) {
      const block = lines[activeLineIdx].block;
      // Fire‑and‑forget – handleBlockMusic is async but we don't need to await here.
      void handleBlockMusic(block);
    }
  }, [activeLineIdx]);

  // Listen to manual scrolling to trigger music transitions based on viewport visibility
  const handleScroll = () => {
    if (isLeavingRef.current) return;
    if (activeLineIdx < lines.length) return; // Only track scroll after typing completes

    const now = Date.now();
    if (now - lastScrollTime.current < 100) return; // Throttle 100ms
    lastScrollTime.current = now;

    const container = scrollContainerRef.current;
    if (!container) return;

    // Boundary check: if at the very top, always play block 0 music
    if (container.scrollTop === 0) {
      void handleBlockMusic(0);
      return;
    }

    // Boundary check: if at the very bottom, always play block 28 music
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 5) {
      void handleBlockMusic(28);
      return;
    }

    const paragraphs = container.querySelectorAll("p[data-block]");
    if (paragraphs.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const triggerY = containerRect.top + containerRect.height * 0.35; // 35% down from top

    let closestBlock = 0;
    let minDistance = Infinity;

    paragraphs.forEach((p) => {
      const rect = p.getBoundingClientRect();
      const distance = Math.abs(rect.top - triggerY);
      if (distance < minDistance) {
        minDistance = distance;
        const blockAttr = p.getAttribute("data-block");
        if (blockAttr !== null) {
          closestBlock = parseInt(blockAttr, 10);
        }
      }
    });

    void handleBlockMusic(closestBlock);
  };

  const handleCardClick = () => {
    if (!isTypingComplete) {
      setCurrentLineText("");
      setCharIdx(0);
      setActiveLineIdx(lines.length);
      setIsTypingComplete(true);
      // Reset scroll position to top so they start reading from the beginning
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      }, 50);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] flex flex-col items-center justify-center px-4 overflow-hidden z-10 select-none">
      <FallingPetals />
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <CandleFlame className="w-40 h-80 opacity-20 filter blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, y: -40, scale: 0.95 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-[92vw] max-w-[450px] h-[80vh] max-h-[580px] min-h-[460px] z-10 flex"
      >
        <div
          onClick={handleCardClick}
          className="w-full h-full bg-transparent border border-primary/20 shadow-2xl rounded-2xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden cursor-pointer"
        >
          <img src={flower1_1} alt="flower decoration 1" className="absolute top-4 left-2 w-16 h-16 pointer-events-none opacity-80" />
          <img src={flower4} alt="flower decoration 2" className="absolute top-[-22px] right-[-22px] w-32 h-32 object-contain pointer-events-none opacity-80 z-0" />

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
          <div className="text-center border-b border-primary/10 pt-4 pb-3 z-20 shrink-0 max-w-[200px] sm:max-w-[250px] mx-auto relative">
            <h1 className="font-display text-lg sm:text-xl text-primary tracking-wide leading-snug">
              Baatein Jo Dil Mein Hain
            </h1>
            <p className="font-body text-[11px] sm:text-xs text-muted-foreground/80 italic leading-relaxed mt-1">
              Jo shayad main kabhi keh nahi paaya...
            </p>
          </div>

          {/* Ruled Notebook Writing Area */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 flex flex-col justify-start pl-[38px] sm:pl-[52px] pr-2 z-10 overflow-y-auto py-3 text-left scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 29px, hsl(var(--primary) / 0.12) 29px, hsl(var(--primary) / 0.12) 30px)",
              backgroundAttachment: "local",
            }}
          >
            {(() => {
              const renderedElements = [];
              let lastBlockIdx = -1;

              for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const isVisible = i < activeLineIdx;
                const isCurrent = i === activeLineIdx && currentLineText;

                if (isVisible || isCurrent) {
                  // If we transitioned to a new block, insert a blank line for notebook alignment
                  if (lastBlockIdx !== -1 && line.block !== lastBlockIdx) {
                    renderedElements.push(
                      <p key={`spacer-${i}`} className="leading-[30px] m-0">&nbsp;</p>
                    );
                  }

                  renderedElements.push(
                    <p
                      key={i}
                      data-block={line.block}
                      className={`font-handwriting text-[18px] sm:text-[20px] text-[#7a6656] leading-[30px] m-0 ${isCurrent ? "typewriter-cursor" : ""
                        } ${line.italic ? "italic" : ""}`}
                    >
                      {isCurrent ? currentLineText : line.text}
                    </p>
                  );

                  lastBlockIdx = line.block;
                }
              }
              return renderedElements;
            })()}
          </div>

          {/* Floral ornament */}
          <div className="flex justify-center mt-4 mb-2"></div>

          {/* Footer */}
          <div className="shrink-0 flex flex-col items-center justify-center border-t border-primary/10 pt-3 z-10 min-h-[90px]">
            {!isTypingComplete ? null : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full flex flex-row items-center justify-between gap-3 pl-[38px] sm:pl-[52px] pr-2"
              >
                {/* Previous Button */}
                {onPrev && (
                  <Button
                    className="btn-paper flex-1 flex items-center justify-center gap-1.5 py-2 text-[#7a6656] font-bold"
                    style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      isLeavingRef.current = true;
                      void stopAllMusic(0); // stop immediately
                      onPrev();
                    }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Wapas... 🌷
                  </Button>
                )}
                {/* Next Button */}
                <Button
                  className="btn-paper flex-1 flex items-center justify-center gap-1.5 py-2 text-[#7a6656] font-bold"
                  style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    isLeavingRef.current = true;
                    void stopAllMusic(0); // stop immediately
                    onNext();
                  }}
                >
                  Lamhe... ♥️
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
