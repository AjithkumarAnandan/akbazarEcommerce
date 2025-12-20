"use client"
import { useState, useEffect } from "react";

interface Product {
  name: string;
  images?: string[];
}

interface Props {
  product: Product;
}

export default function ImageSlider({ product }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // client state

  useEffect(() => {
    // Activate first image only on the client
    setActiveIndex(0);
  }, []);

  if (!product.images || product.images.length === 0) {
    return (
      <div className="w-64 h-64 flex items-center justify-center bg-[#F5F5F5] text-gray-600 rounded-md mb-4">
        No Image
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 mb-2 ">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={product.name}
            className={`max-w-full max-h-full justify-end object-fill rounded-md absolute inset-0 transition-opacity duration-300 ${index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}
      </div>

      <div className="flex space-x-2">
        {product.images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${index === activeIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
          />
        ))}
      </div>
    </div>
  );
}


export function SingleImageSLider({ product }: Props) {
// console.log("product",product)
const images = product.images || [];

return (
  <div className="grid grid-cols-3 grid-rows-4 gap-2 min-w-xl h-96">
    {/* Left 4 small images */}
    {[1, 2, 3, 4].map((i) =>
      images[i] ? (
        <img
          key={i}
          src={images[i]}
          alt={product.name}
          className="w-full h-full object-contain rounded-md bg-gray-100"
        />
      ) : (
        <div
          key={i}
          className="w-full h-full flex items-center justify-center bg-[#F5F5F5] text-gray-500 rounded-md text-sm "
        >
          No Image
        </div>
      )
    )}

    {/* Right large image */}
    <div className="col-span-2 row-span-4 col-start-2 row-start-1">
      {images[0] ? (
        <img
          src={images[0]}
          alt={product.name}
          className="w-full h-full object-contain rounded-md bg-gray-100"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#F5F5F5] text-gray-600 rounded-md">
          No Image
        </div>
      )}
    </div>
  </div>
);
}
