"use client"

import Image from "next/image"
import { useState } from "react"
import { SelectedProductProps } from "../utils/typescript"
import { wishlistFavImage, wishlistImage } from "@/utils/api.path"

function CardCounter({ product }: { product: SelectedProductProps }) {
    const [count, setCount] = useState(1)
    return <div className="flex ">
        <div className="w-40 flex border border-black/30 rounded-sm">
            <button className="px-4 py-2 bg-red " onClick={() => setCount(prev => prev - 1)} disabled={count < 1}>-</button>
            <span className="w-12 px-8 py-2 bg-red border-x-1 border-black/30">{count}</span>
            <button className="px-4 py-2 bg-red" onClick={() => setCount(prev => prev + 1)}>+</button>
        </div>
        <button className="px-4 py-2 bg-[#DB4444] ml-4 border  rounded-sm bg-red-400 text-white whitespace-nowrap">Buy Now</button>
        {/* Favorite Icon */}
        <span className="border border-black/30 p-1 ml-4 rounded-sm">
            <Image
                className="w-8 h-8"
                src={product.favorite
                        ?`${wishlistFavImage}`:`${wishlistImage}`}
                alt="Wishlist"
                width={25}
                height={25}
            />
        </span>
    </div>
}
export default CardCounter
