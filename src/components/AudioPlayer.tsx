import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import {
  getMusicState,
  subscribeMusicState,
  toggleGlobalMute,
} from "../musicController";

export default function AudioPlayer() {
  const [state, setState] = useState(getMusicState());

  useEffect(() => {
    // Subscribe to global music controller changes to keep UI synchronized
    const unsubscribe = subscribeMusicState(() => {
      setState(getMusicState());
    });
    return () => unsubscribe();
  }, []);

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleGlobalMute();
  };



  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">

      {/* Mute / Unmute */}
      <button
        onClick={handleMuteToggle}
        className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 shadow-lg hover:bg-white/30 transition-all cursor-pointer focus:outline-none"
        title={state.muted ? "Unmute Music" : "Mute Music"}
      >
        {state.muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
}