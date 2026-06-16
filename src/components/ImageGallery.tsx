import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../components/ui/carousel";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

// Import a selection of images from the saba folder
import img1 from "../saba/IMG-20250608-WA0000.jpg";
import img2 from "../saba/IMG-20250608-WA0001.jpg";
import img3 from "../saba/IMG-20250625-WA0000.jpg";
import img4 from "../saba/IMG-20250625-WA0001.jpg";
import img5 from "../saba/IMG-20250625-WA0002.jpg";

const images = [img1, img2, img3, img4, img5];

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
          {images.map((src, idx) => (
            <CarouselItem key={idx} className="flex justify-center items-center">
              <img
                src={src}
                alt={`Gallery image ${idx + 1}`}
                className="object-cover rounded-lg shadow-lg max-h-80 w-auto"
              />
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
