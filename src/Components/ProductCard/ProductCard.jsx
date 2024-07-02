import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/Cart.context";
import { wishContext } from "../../Context/Wish.context";

export default function ProductCard({ productInfo }) {
  const { images, title, price, category, ratingsAverage, id } = productInfo;
  const { addProductToCart } = useContext(cartContext);
  const { addWishToCart } = useContext(wishContext);

  return (
    <>
      <div className="col-span-12 overflow-hidden rounded-md shadow-lg sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
        <div className="relative">
          <img className="w-full" src={images[0]} alt="" />

          <div className="layer absolute left-0 top-0 flex h-full w-full items-center justify-center gap-2 bg-black bg-opacity-15 opacity-0 transition-opacity duration-300 hover:opacity-100">
            <div
              onClick={() => {
                addWishToCart({ id });
              }}
              className="icon flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-sm text-white transition-transform duration-300 hover:rotate-6 hover:scale-110"
            >
              <i className="fa-solid fa-heart"></i>
            </div>
            <div
              onClick={() => {
                addProductToCart({ id });
              }}
              className="icon flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-sm text-white transition-transform duration-300 hover:rotate-6 hover:scale-110"
            >
              <i className="fa-solid fa-cart-shopping"></i>{" "}
            </div>
            <Link
              to={`/product/${id}`}
              className="icon flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-sm text-white transition-transform duration-300 hover:rotate-6 hover:scale-110"
            >
              <i className="fa-solid fa-eye"></i>{" "}
            </Link>
          </div>
        </div>

        <div className="p-3">
          <h3 className="text-primary">{category.name}</h3>
          <h2 className="line-clamp-2 text-lg font-semibold">{title}</h2>
        </div>
        <div className="mt-1 flex items-center justify-between p-3">
          <span>{price} LE</span>
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-star text-yellow-500"></i>
            <span>{ratingsAverage}</span>
          </div>
        </div>
      </div>
    </>
  );
}
