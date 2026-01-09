interface Product {
  name: string;
  images?: string[];
}

interface Props {
  product: Product;
}

export default function ImageSlider({ product }: Props) {

  if (!product?.images || product.images?.length === 0) {
    return (
      <div className="w-auto flex items-center justify-center bg-[#F5F5F5] text-gray-600 rounded-md mb-4">
        No Image
      </div>
    );
  }

  return (
    <>
      {product?.images?.[0] && <div className="relative mb-2 ">
        <img
          src={product.images[0]}
          alt={product.name}
          width={200}
          height={100}
          className="justify-end object-fill rounded-md"
        />
      </div>
      }
    </>
  );
}


