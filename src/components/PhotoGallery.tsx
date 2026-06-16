import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Photo {
  id: number;
  src: string;
  caption: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="card-candle cursor-pointer aspect-square overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.15, 
              duration: 0.6,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <div 
              className="w-full h-full bg-muted flex items-center justify-center"
              style={{
                backgroundImage: photo.src ? `url(${photo.src})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!photo.src && (
                <span className="text-muted-foreground font-display text-sm italic">
                  Photo {photo.id}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-wine-dark/90 backdrop-blur-sm"
              onClick={() => setSelectedPhoto(null)}
            />

            {/* Content */}
            <motion.div
              className="relative max-w-2xl w-full card-candle p-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Candle glow border effect */}
              <div 
                className="absolute inset-0 rounded-xl -z-10"
                style={{
                  background: `radial-gradient(ellipse at center, hsl(var(--candle-glow) / 0.3), transparent 60%)`,
                  filter: "blur(20px)",
                  transform: "scale(1.1)",
                }}
              />

              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-3 -right-3 p-2 rounded-full bg-card border border-primary/30 shadow-gold z-10"
              >
                <X className="w-4 h-4 text-primary" />
              </button>

              <div 
                className="aspect-[4/3] w-full rounded-lg bg-muted flex items-center justify-center"
                style={{
                  backgroundImage: selectedPhoto.src ? `url(${selectedPhoto.src})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!selectedPhoto.src && (
                  <span className="text-muted-foreground font-display text-lg italic">
                    Photo {selectedPhoto.id}
                  </span>
                )}
              </div>

              <p className="text-center py-4 font-display text-lg text-foreground/90 italic">
                "{selectedPhoto.caption}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoGallery;
