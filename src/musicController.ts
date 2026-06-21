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

// Global Audio State
let isGlobalMuted = false;
let isGlobalPaused = false;
const listeners = new Set<() => void>();

/** Subscribe to changes in play/pause/mute state */
export function subscribeMusicState(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners() {
  listeners.forEach((l) => l());
}

/** Get the current play/pause and mute state */
export function getMusicState() {
  return {
    isPlaying: !isGlobalPaused && !!currentTrackId,
    muted: isGlobalMuted,
    currentTrackId
  };
}

/** Toggle mute globally for all music elements */
export function toggleGlobalMute() {
  setGlobalMute(!isGlobalMuted);
}

/** Set mute state globally for all music elements */
export function setGlobalMute(mute: boolean) {
  isGlobalMuted = mute;
  const trackIds = ["trackEnvelope", "track0", "track10", "track14", "track16"];
  trackIds.forEach((id) => {
    const el = document.getElementById(id) as HTMLAudioElement | null;
    if (el) {
      el.muted = mute;
      if (!mute && id === currentTrackId) {
        isGlobalPaused = false; // clear global pause state
        if (el.paused) {
          el.play().catch((err) => console.log("Play failed on unmute:", err));
        }
      }
    }
  });
  notifyListeners();
}

/** Toggle play/pause globally for the active track */
export function toggleGlobalPlay() {
  setGlobalPlay(isGlobalPaused);
}

/** Set play/pause state globally for all music elements */
export function setGlobalPlay(play: boolean) {
  isGlobalPaused = !play;
  
  if (!currentTrackId) {
    // If no track is active yet, default to trackEnvelope
    currentTrackId = "trackEnvelope";
  }

  const trackIds = ["trackEnvelope", "track0", "track10", "track14", "track16"];
  trackIds.forEach((id) => {
    const el = document.getElementById(id) as HTMLAudioElement | null;
    if (el) {
      if (play) {
        if (id === currentTrackId) {
          el.muted = isGlobalMuted;
          el.play().catch((err) => console.log("Play failed on setGlobalPlay:", err));
        } else {
          el.pause();
        }
      } else {
        el.pause();
      }
    }
  });
  notifyListeners();
}

/** Start the envelope step music (Pixabay piano track) with clean transitions */
export async function playEnvelopeMusic(): Promise<void> {
  const targetId = "trackEnvelope";
  const targetEl = document.getElementById(targetId) as HTMLAudioElement | null;
  if (!targetEl) {
    console.warn(`Audio element #${targetId} not found`);
    return;
  }

  isGlobalPaused = false;
  currentTrackId = targetId;

  // Pause all other tracks instantly to avoid overlapping sounds, including envelope
  const trackIds = ["trackEnvelope", "track0", "track10", "track14", "track16"];
  trackIds.forEach((id) => {
    const el = document.getElementById(id) as HTMLAudioElement | null;
    if (el) {
      el.pause();
      el.volume = 0;
    }
  });

  targetEl.muted = isGlobalMuted;
  if (targetEl.paused) {
    targetEl.volume = 0.25;
    targetEl.play().catch((err) => console.log("Play envelope failed:", err));
  }
  notifyListeners();
}

/**
 * Cross‑fade two <audio> elements.
 *   - Clears any existing intervals to prevent volume fighting.
 *   - Fades out the previous track completely to 0 over 3000ms.
 *   - Resets the new track's volume to 0, plays it, and fades it up to 0.25.
 */
function crossFade(
  from: HTMLAudioElement | null,
  to: HTMLAudioElement,
  durationMs = 3000 // 3 seconds for a very smooth, unnoticeable cinematic transition
): Promise<void> {
  const steps = 60; // 60 steps over 3 seconds (50ms interval) for ultra-smooth transition
  const stepTime = durationMs / steps; // 50ms
  const targetVol = 0.25;

  // Clear any running volume animations on these elements to prevent glitching
  if (from && (from as any).fadeInterval) {
    clearInterval((from as any).fadeInterval);
    (from as any).fadeInterval = null;
  }
  if ((to as any).fadeInterval) {
    clearInterval((to as any).fadeInterval);
    (to as any).fadeInterval = null;
  }

  // Sync mute state on the new track
  to.muted = isGlobalMuted;

  // If globally paused, just update volume/pause status without starting playback
  if (isGlobalPaused) {
    if (from) {
      from.pause();
      from.volume = 0;
    }
    to.volume = targetVol;
    to.pause();
    return Promise.resolve();
  }

  // Calculate dynamic volume steps based on current volumes to avoid jumps
  const startVolFrom = from ? from.volume : 0;
  const dec = startVolFrom / steps;

  // If target track is not playing, start it from silence immediately
  if (to.paused) {
    to.volume = 0;
    to.play().catch((err) => {
      console.log("Autoplay or playback blocked initially:", err);
    });
  }

  const startVolTo = to.volume;
  const inc = (targetVol - startVolTo) / steps;

  // Run the fade interval loop synchronously with the play trigger
  let tick = 0;
  const interval = setInterval(() => {
    tick++;

    // Fade out previous track
    if (from) {
      const newVol = Math.max(0, from.volume - dec);
      from.volume = newVol;
      if (newVol === 0 && !from.paused) {
        from.pause();
      }
    }

    // Fade in new track
    const newVol = Math.min(targetVol, to.volume + inc);
    to.volume = newVol;

    // Stop once target volume is reached or steps are done
    if (tick >= steps || newVol === targetVol) {
      clearInterval(interval);
      to.volume = targetVol;
      if (from) from.volume = 0;
      (to as any).fadeInterval = null;
    }
  }, stepTime);

  (to as any).fadeInterval = interval;
  return Promise.resolve();
}

/**
 * Global audio controller that cross-fades background tracks.
 * Uses a strict repeat-prevention guard to prevent re-triggering or resetting.
 */
export async function handleBlockMusic(blockNumber: number): Promise<void> {
  isGlobalPaused = false; // ensure music plays on step/block transition
  const mapping = BLOCK_TO_TRACK[blockNumber];
  if (!mapping) return; // safety - block doesn't exist

  const targetId = mapping.id;
  const targetEl = document.getElementById(targetId) as HTMLAudioElement | null;
  if (!targetEl) {
    console.warn(`Audio element #${targetId} not found`);
    return;
  }

  // Pause all other tracks (including envelope) to ensure only the target plays
  const trackIds = ["trackEnvelope", "track0", "track10", "track14", "track16"];
  trackIds.forEach((id) => {
    if (id !== targetId) {
      const el = document.getElementById(id) as HTMLAudioElement | null;
      if (el) {
        el.pause();
        el.volume = 0;
      }
    }
  });

  // STRICT REPEAT-PREVENTION GUARD
  if (currentTrackId === targetId) {
    // If it's already the current track, make sure it's actually playing if the site is not paused
    if (targetEl.paused && !isGlobalPaused) {
      targetEl.muted = isGlobalMuted;
      targetEl.play().catch((err) => console.log("Play failed on retry:", err));
    }
    return; // Exit immediately without resetting volume, time, or play state
  }

  // Track state transition immediately to guard against concurrent clicks
  const previousTrackId = currentTrackId;
  currentTrackId = targetId;

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
  notifyListeners();
}

/**
 * Stop all background tracks smoothly, or instantly if durationMs is 0.
 */
export async function stopAllMusic(durationMs = 1200): Promise<void> {
  const trackIds = ["trackEnvelope", "track0", "track10", "track14", "track16"];

  // Immediately clear any running volume fade intervals on all elements
  trackIds.forEach((id) => {
    const el = document.getElementById(id) as HTMLAudioElement | null;
    if (el) {
      if ((el as any).fadeInterval) {
        clearInterval((el as any).fadeInterval);
        (el as any).fadeInterval = null;
      }
    }
  });

  isGlobalPaused = true;

  // For instant stop (durationMs === 0), pause all elements and set volume to 0 immediately
  if (durationMs === 0) {
    trackIds.forEach((id) => {
      const el = document.getElementById(id) as HTMLAudioElement | null;
      if (el) {
        el.volume = 0;
        el.pause();
      }
    });
    currentTrackId = null;
    notifyListeners();
    return Promise.resolve();
  }

  // Otherwise, perform a smooth fade out on the active track
  if (!currentTrackId) return;

  const currentEl = document.getElementById(currentTrackId) as HTMLAudioElement | null;
  if (currentEl) {
    const steps = 10;
    const stepTime = durationMs / steps;
    const dec = currentEl.volume / steps;

    const fadeOutPromise = new Promise<void>((resolve) => {
      let tick = 0;
      const interval = setInterval(() => {
        tick++;
        const newVol = Math.max(0, currentEl.volume - dec);
        currentEl.volume = newVol;
        if (newVol === 0 || currentEl.paused) {
          clearInterval(interval);
          currentEl.pause();
          currentEl.volume = 0;
          resolve();
        }
      }, stepTime);
      (currentEl as any).fadeInterval = interval;
    });

    await fadeOutPromise;
  }
  
  currentTrackId = null;
  notifyListeners();
}
