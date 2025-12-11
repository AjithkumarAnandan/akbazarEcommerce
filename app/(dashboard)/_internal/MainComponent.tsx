import { getProductsList } from "@/component/getProductsList";
import ImageSlider from "@/utils/imageSlide";
import Image from "next/image";

async function MainComponent() {
  const { data: productList } = await getProductsList();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {productList && productList.map((product: any) => {
        return <div key={product.id} className="border-0 rounded-lg m-4 p-4 shadow-md flex flex-col items-center w-64 relative">
          <ImageSlider product={product} />
          <h1 className="font-semibold text-lg text-center mb-2">{product.name}</h1>
          <p className="flex gap-2 items-center">
            <span className="underline text-red-600 font-semibold">
              ${product.discount_price}
            </span>
            <span className="line-through text-gray-500">
              ${product.actual_price}
            </span>
          </p>
          <span>
            {product.favorite ?
              <Image className="absolute top-8 right-4 bg-white rounded-lg" src={"/wishlist-favorite.svg"} alt="No image" width={25} height={25} /> :
              <Image className="absolute top-8 right-4 bg-white rounded-lg" src={"/Wishlist.svg"} alt="No image" width={25} height={25} />}
          </span>
          <span className=" absolute bg-[#DB4444]  text-white px-4 py-1 top-8 left-4 rounded-sm">-{Math.round(product.discount)} {"%"}</span>
          <span>
            {[...Array(5)].map((_, index) => (
              <span key={index} className="text-[#FFAD33]">
                {index < (product.rating) ? '★' : '☆'}
              </span>
            ))}
            <span className="text-[0.8rem]">({product.review_customer_count})</span>
          </span>
        </div>
      })}
    </div>
  );
}

export default MainComponent;
