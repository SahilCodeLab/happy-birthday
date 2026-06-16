import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // 1. Koshish karega autoplay ki
    const playAudio = async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.log("Autoplay blocked");
        }
      }
    };
    playAudio();

    // 2. Agar autoplay fail hua, toh PEHLI baar click karne par chalega
    const handleFirstClick = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
        // Music chal gaya, ab ye listener hata do taaki dubara pareshan na kare
        document.removeEventListener("click", handleFirstClick);
      }
    };

    document.addEventListener("click", handleFirstClick);
    return () => document.removeEventListener("click", handleFirstClick);
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    // Ye line zaroori hai: Ye batati hai ki click button pe hua hai, background pe nahi
    e.stopPropagation();

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mp3" />
      </audio>
      <button
        onClick={togglePlay}
        className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 shadow-lg hover:bg-white/30 transition-all cursor-pointer"
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </div>
  );
};

export default AudioPlayer;