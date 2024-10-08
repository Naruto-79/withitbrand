"use client";

import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { useState } from "react";
import { SanityImage } from "../types/sanity";

interface ImageGalleryProps {
  images: SanityImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [bigImage, setBigImage] = useState<SanityImage>(images[0]);

  const handleSmallImageClick = (image: SanityImage) => {
    setBigImage(image);
  };

  const getImageUrl = (image: SanityImage) => {
    try {
      return urlFor(image).url();
    } catch (error) {
      console.error("Error generating image URL:", error);
      return '/path/to/default/image.jpg'; // Fallback image
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={getImageUrl(image)}
              width={200}
              height={200}
              alt={`Product image ${idx + 1}`}
              className="h-full w-full object-cover object-center cursor-pointer"
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={getImageUrl(bigImage)}
          alt="Main product image"
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}