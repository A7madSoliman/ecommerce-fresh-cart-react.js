import React, { useContext } from "react";
import { wishContext } from "../../Context/Wish.context";
import Loading from "../../Components/Loading/Loading";
import { cartContext } from "../../Context/Cart.context";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function WishList() {
  const { wishInfo, removeWishFromList } = useContext(wishContext);
  const { addProductToCart } = useContext(cartContext);
  return (
    <>
      <Helmet>
        <title>Wish List</title>
        <meta name="description " content="Welcome To Wish List Page" />
      </Helmet>

      {wishInfo === null ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-12 gap-5">
          {wishInfo.data.length === 0 ? (
            <div className="mt-15 col-span-12 flex flex-col items-center justify-center bg-gray-100 py-28">
              <h3 className="text-sm font-bold md:text-xl">
                There Are Not items Yet.
              </h3>
              <Link to={"/"} className="btn-primary mt-3 md:text-xl">
                Add Your First Wish List
              </Link>
            </div>
          ) : (
            <>
              {wishInfo.data.map((list) => (
                <div
                  key={list._id}
                  className="col-span-12 rounded-lg p-5 shadow-lg md:col-span-6 lg:col-span-4 xl:col-span-3"
                >
                  <span>
                    <img
                      className="mx-auto h-72 rounded-t-lg object-contain"
                      src={list.imageCover}
                      alt="product image"
                    />
                  </span>
                  <div className="flex flex-col items-center justify-center">
                    <span>
                      <h5 className="mt-5 line-clamp-1 text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                        {list.title}
                      </h5>
                    </span>
                    <div className="mb-5 mt-2.5 flex w-full items-center justify-between">
                      <span className="ms-3 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        <i className="fa-solid fa-star text-sm text-yellow-500"></i>
                        {list.ratingsAverage}
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {list.price} LE
                      </span>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <span
                        onClick={() => {
                          addProductToCart({ id: list.id });
                        }}
                        className="cursor-pointer rounded-lg bg-blue-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add To Cart
                      </span>
                      <span
                        onClick={() => {
                          removeWishFromList({ id: list.id });
                        }}
                        className="cursor-pointer rounded-lg bg-red-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        Remove{" "}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}
