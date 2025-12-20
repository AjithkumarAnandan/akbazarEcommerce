import { getSelectProduct } from "@/component/getProductsList";
import CardCounter from "@/libs/cardCount";
import { SingleImageSLider } from "@/libs/imageSlide";
import { SelectedProductProps } from "@/utils/typescript";
import { notFound } from "next/navigation";

type PageProps = { params: { slug: string } };

export default async function Page({ params }: PageProps) {
  let id: number;
  try {
    const slugParams = await params;
    const base64 = decodeURIComponent(slugParams.slug);
    id = Number(atob(base64));
    if (!Number.isInteger(id)) {
      throw new Error("Invalid ID");
    }
  } catch {
    return notFound();
  }
  const { data: selectedProduct } = await getSelectProduct(id);
 
  return (
    <div className=" mx-[4rem] justify-center  items-center mt-[10rem] min-h-[75vh]">
      {selectedProduct?.map((product: SelectedProductProps) => (
        <div
          key={product.id}
          className="relative flex bg-white rounded-lg  p-4"
        >
          {/* Image Slider */}
          <SingleImageSLider product={product} />

          {/* Wishlist Icon */}
          {/* <Image
            className="absolute top-4 right-4 bg-white rounded-full p-2 w-10 h-10 shadow"
            src={
              product.favorite
                ? "/wishlist-favorite.svg"
                : "/Wishlist.svg"
            }
            alt="Wishlist"
            width={25}
            height={25}
          /> */}

          {/* Discount Badge */}
          {/* <span className="absolute top-4 left-4 bg-[#DB4444] text-white text-sm px-3 py-1 rounded">
            -{Math.round(Number(product.discount))}%
          </span> */}
          <div className="ml-4 space-y-4">
            {/* Product Name */}
            <h1 className="mt-4 font-semibold text-lg ">
              {product.name.length > 20
                ? product.name.slice(0, 20) + "..."
                : product.name}
            </h1>

            {/* Price */}
            <div className="flex gap-3 items-center mt-2">
              <span className="text-gray-400 line-through">
                ${product.actual_price}
              </span>
              <span className="text-red-600 font-semibold">
                ${product.discount_price}
              </span>
            </div>

            {/* Rating */}
            <div className="flex justify-start items-center gap-1 mt-2">
              {[...Array(5)].map((_, index) => (
                <span key={index} className="text-[#FFAD33]">
                  {index < product.rating ? "★" : "☆"}
                </span>
              ))}
              <span className="text-sm text-gray-500">
                ({product.review_customer_count} Reviews)
              </span>
            </div>
            <p>{product.description}</p>
            <hr className="my-4" />
            <CardCounter product={product} />
          </div>
        </div>
      ))}
    </div>
  );
}
