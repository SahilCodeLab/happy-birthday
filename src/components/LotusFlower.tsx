import { motion } from "framer-motion";

const LotusFlower = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Soft Glow Behind */}
      <div 
        className="absolute inset-0 bg-pink-500/25 blur-3xl rounded-full" 
        style={{ transform: 'scale(1.4)' }}
      />

      <svg
        width="200"
        height="160"
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-2xl"
        style={{ filter: "drop-shadow(0 5px 15px rgba(255, 105, 180, 0.3))" }}
      >
        <defs>
          {/* Main Pink Gradient */}
          <linearGradient id="petalGradient" x1="100" y1="160" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0.2" stopColor="#be185d" /> {/* Dark Base */}
            <stop offset="0.7" stopColor="#f472b6" /> {/* Pink Body */}
            <stop offset="1" stopColor="#fdf2f8" />   {/* White/Soft Top */}
          </linearGradient>

          {/* Side Petals Gradient */}
          <linearGradient id="sideGradient" x1="100" y1="160" x2="100" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#9d174d" />
            <stop offset="0.8" stopColor="#fbcfe8" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>

          {/* Gold Center */}
          <radialGradient id="goldCenter" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 135) rotate(90) scale(12)">
            <stop stopColor="#fef9c3" />
            <stop offset="0.5" stopColor="#facc15" />
            <stop offset="1" stopColor="#ca8a04" />
          </radialGradient>
        </defs>

        {/* --- LAYER 1: WIDE BACK PETALS (Round Tips) --- */}
        <motion.path
          // Left Back
          d="M100 145 C100 145 20 130 20 90 C20 70 50 60 100 145Z"
          fill="url(#sideGradient)"
          stroke="#fff" strokeWidth="0.5"
        />
        <motion.path
          // Right Back
          d="M100 145 C100 145 180 130 180 90 C180 70 150 60 100 145Z"
          fill="url(#sideGradient)"
          stroke="#fff" strokeWidth="0.5"
        />

        {/* --- LAYER 2: MIDDLE PETALS (Rounder & Fuller) --- */}
        <motion.path
          // Left Middle
          d="M100 150 C100 150 40 120 40 75 C40 55 70 45 100 150Z"
          fill="url(#petalGradient)"
          stroke="#fff" strokeWidth="0.5"
        />
        <motion.path
          // Right Middle
          d="M100 150 C100 150 160 120 160 75 C160 55 130 45 100 150Z"
          fill="url(#petalGradient)"
          stroke="#fff" strokeWidth="0.5"
        />

        {/* --- LAYER 3: CENTER MAIN PETAL (Rounded Top / "Mu Round") --- */}
        {/* Instead of a sharp point, using curves (C) to round the top */}
        <motion.path
          d="M100 150 C 100 150, 65 90, 65 55 C 65 30, 85 25, 100 25 C 115 25, 135 30, 135 55 C 135 90, 100 150, 100 150 Z"
          fill="url(#petalGradient)"
          stroke="#fff" strokeWidth="0.8"
        />

        {/* --- GOLDEN CENTER (Stamens) --- */}
        <circle cx="100" cy="130" r="8" fill="url(#goldCenter)" />
        <circle cx="100" cy="130" r="10" stroke="#facc15" strokeWidth="0.5" strokeOpacity="0.5" className="animate-pulse" />

        {/* Floating Pollen Particles */}
        <motion.circle cx="90" cy="110" r="2" fill="#fef08a" animate={{ y: -15, opacity: 0 }} transition={{ repeat: Infinity, duration: 2.5 }} />
        <motion.circle cx="110" cy="105" r="1.5" fill="#fef08a" animate={{ y: -20, opacity: 0 }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }} />

      </svg>
    </motion.div>
  );
};

export default LotusFlower;