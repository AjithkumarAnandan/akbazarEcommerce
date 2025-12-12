"use client"
import { useState } from "react";

interface Product {
  name: string;
  images?: string[];
}

interface Props {
  product: Product;
}

export default function ImageSlider({ product }: Props) {
  const [activeIndex, setActiveIndex] = useState(0); // client state

  if (!product.images || product.images.length === 0) {
    return (
      <div className="w-64 h-64 flex items-center justify-center bg-[#F5F5F5] text-gray-600 rounded-md mb-4">
        No Image
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 mb-2">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={product.name}
            className={`w-full h-full object-cover rounded-md absolute inset-0 transition-opacity duration-300 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="flex space-x-2">
        {product.images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
              index === activeIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
