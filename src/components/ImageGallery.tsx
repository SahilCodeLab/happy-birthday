import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../components/ui/carousel";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

// Import a selection of images from the saba folder
// Import a selection of images from the saba folder with captions
import img1 from "../saba/IMG-20250608-WA0000.jpg";
import img2 from "../saba/IMG-20250608 WA0001.jpg"; // note: path corrected if needed
import img3 from "../saba/IMG-20250625-WA0000.jpg";
import img4 from "../saba/IMG-20250625-WA0001.jpg";
import img5 from "../saba/IMG-20250625-WA0002.jpg";

// Each image now includes a caption for a heartfelt feeling
const images = [
  { src: img1, caption: "First memory" },
  { src: img2, caption: "Joyful moment" },
  { src: img3, caption: "Together forever" },
  { src: img4, caption: "Warm sunshine" },
  { src: img5, caption: "Sweet laughter" },
];

export const ImageGallery = () => {
  return (
    <div className={cn("relative w-full max-w-3xl mx-auto p-4 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-pink-200")}>
      {/* love header */}
      <div className="flex items-center justify-center mb-2 text-pink-600">
        <Heart className="h-6 w-6 mr-1" />
        <span className="font-display text-lg">Memories</span>
      </div>
      <Carousel className={cn("w-full")} opts={{ loop: true }}>
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx} className="flex flex-col items-center relative">
              {/* Heart overlay */}
              <Heart className="absolute top-2 left-2 h-5 w-5 text-pink-500" />
              <img
                src={img.src}
                alt={img.caption}
                className="object-cover rounded-lg shadow-lg max-h-80 w-auto"
              />
              {/* Caption */}
              <p className="mt-2 text-sm text-pink-700 font-display">{img.caption}</p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ImageGallery;
