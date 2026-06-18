// src/musicController.ts
/**
 * Dynamic audio controller that cross‑fades background music as the UI moves
 * through `currentBlock` values (0‑19).
 *
 * Audio elements must exist in the HTML (e.g. in public/index.html) with the
 * following IDs:
 *   - track0   → /music/intro.mp3
 *   - track10  → /music/emotional.mp3 (start at 80 s on first play)
 *   - track14  → /music/complaint.mp3 (start at 65 s on first play)
 *   - track16  → /music/duas.mp3
 */
type TrackInfo = {
  id: string;
  src: string;
  startSeek?: number; // seconds – only applied the very first time the track is used
};

/** Mapping of block number → track configuration */
const BLOCK_TO_TRACK: Record<number, TrackInfo> = {
  // 0‑9 → intro
  0: { id: "track0", src: "/Tum Se Hi - Lofi _ Slowed Reverb.mp3" },
  1: { id: "track0", src: "/Tum Se Hi - Lofi _ Slowed Reverb.mp3" },
  2: { id: "track0", src: "/Tum Se Hi - Lofi _ Slowed Reverb.mp3" },
  3: { id: "track0", src: "/Tum Se Hi - Lofi _ Slowed Reverb.mp3" },
  4: { id: "track0", src: "/Tum Se Hi - Lofi _ Slowed Reverb.mp3" },
  5: { id: "track0", src: "/Tum Se Hi - Lofi _ Slowed Reverb.mp3" },
  6: { id: "track0", src: "/Tum Se Hi - Lofi _ Slowed Reverb.mp3" },
  7: { id: "track0", src: "/Tum Se Hi - Lofi _ Slowed Reverb.mp3" },
  8: { id: "track0", src: "/Tum Se Hi - Lofi _ Slowed Reverb.mp3" },
  9: { id: "track0", src: "/Tum Se Hi - Lofi _ Slowed Reverb.mp3" },
  // 10‑13 → emotional (seek 80 s on first activation)
  10: { id: "track10", src: "/Tum Kya Mile Tum Kya Mile - Arijit Singh _ Shreya Ghoshal _ Hindi.mp3", startSeek: 80 },
  11: { id: "track10", src: "/Tum Kya Mile Tum Kya Mile - Arijit Singh _ Shreya Ghoshal _ Hindi.mp3", startSeek: 80 },
  12: { id: "track10", src: "/Tum Kya Mile Tum Kya Mile - Arijit Singh _ Shreya Ghoshal _ Hindi.mp3", startSeek: 80 },
  13: { id: "track10", src: "/Tum Kya Mile Tum Kya Mile - Arijit Singh _ Shreya Ghoshal _ Hindi.mp3", startSeek: 80 },
  // 14‑15 → complaint (seek 65 s on first activation)
  14: { id: "track14", src: "/Saiyaara – Barbaad _ Slowed Reverb.mp3", startSeek: 65 },
  15: { id: "track14", src: "/Saiyaara – Barbaad _ Slowed Reverb.mp3", startSeek: 65 },
  // 16‑19 → duas
  16: { id: "track16", src: "/kun_faya_kun.mp3" },
  17: { id: "track16", src: "/kun_faya_kun.mp3" },
  18: { id: "track16", src: "/kun_faya_kun.mp3" },
  19: { id: "track16", src: "/kun_faya_kun.mp3" }
};

let currentTrackId: string | null = null; // ID of the currently active music track
const alreadySeeked = new Set<string>(); // Tracks that have been seeked once on first play

/**
 * Cross‑fade two <audio> elements.
 *   - Clears any existing intervals to prevent volume fighting.
 *   - Fades out the previous track completely to 0, then pauses it.
 *   - Resets the new track's volume to 0, plays it, and fades it to 0.25.
 */
function crossFade(
  from: HTMLAudioElement | null,
  to: HTMLAudioElement,
  durationMs = 500
): Promise<void> {
  const steps = 10; // 500ms / 50ms
  const stepTime = durationMs / steps;
  const targetVol = 0.25;
  const inc = targetVol / steps;

  // Clear any running volume animations on these elements to prevent glitching
  if (from && (from as any).fadeInterval) {
    clearInterval((from as any).fadeInterval);
    (from as any).fadeInterval = null;
  }
  if ((to as any).fadeInterval) {
    clearInterval((to as any).fadeInterval);
    (to as any).fadeInterval = null;
  }

  // Ensure target track starts silent
  to.volume = 0;

  // Play target track (swallow autoplay restrictions)
  const playPromise = to.play().catch((err) => {
    console.log("Autoplay or playback blocked initially:", err);
  });

  return playPromise.then(() => {
    let tick = 0;
    const interval = setInterval(() => {
      tick++;

      // Fade out previous track
      if (from) {
        const newVol = Math.max(0, from.volume - inc);
        from.volume = newVol;
        if (newVol === 0 && !from.paused) {
          from.pause();
        }
      }

      // Fade in new track
      const newVol = Math.min(targetVol, to.volume + inc);
      to.volume = newVol;

      // Stop once target volume is reached
      if (newVol === targetVol) {
        clearInterval(interval);
        (to as any).fadeInterval = null;
      }
    }, stepTime);

    (to as any).fadeInterval = interval;
  });
}

/**
 * Global audio controller that cross-fades background tracks.
 * Uses a strict repeat-prevention guard to prevent re-triggering or resetting.
 */
export async function handleBlockMusic(blockNumber: number): Promise<void> {
  const mapping = BLOCK_TO_TRACK[blockNumber];
  if (!mapping) return; // safety - block doesn't exist

  const targetId = mapping.id;

  // 2. STRICT REPEAT-PREVENTION GUARD
  if (currentTrackId === targetId) {
    return; // Exit immediately without touching volume, time, or play state
  }

  const targetEl = document.getElementById(targetId) as HTMLAudioElement | null;
  if (!targetEl) {
    console.warn(`Audio element #${targetId} not found`);
    return;
  }

  // Track state transition immediately to guard against concurrent clicks
  const previousTrackId = currentTrackId;
  currentTrackId = targetId;

  // 3. CROSSFADE LOGIC
  // Handle first-activation seeking safely (only if paused, i.e. first launch)
  if (mapping.startSeek !== undefined && !alreadySeeked.has(targetId)) {
    if (targetEl.paused) {
      if (targetEl.readyState >= 1) {
        targetEl.currentTime = mapping.startSeek;
        alreadySeeked.add(targetId);
      } else {
        const seekOnMetadata = () => {
          targetEl.currentTime = mapping.startSeek!;
          alreadySeeked.add(targetId);
          targetEl.removeEventListener("loadedmetadata", seekOnMetadata);
        };
        targetEl.addEventListener("loadedmetadata", seekOnMetadata);
      }
    }
  }

  const previousEl = previousTrackId
    ? (document.getElementById(previousTrackId) as HTMLAudioElement | null)
    : null;

  await crossFade(previousEl, targetEl);
}
