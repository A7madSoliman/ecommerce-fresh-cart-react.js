import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/Cart.context";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Cart() {
  const { cartInfo, removeProductFromCart, updateProductCount, clearCart } =
    useContext(cartContext);

  return (
    <>
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="Welcome To Cart Page" />
      </Helmet>

      {cartInfo === null ? (
        <Loading />
      ) : (
        <section className="bg-slate-100 p-5">
          <h2 className="mb-2 text-2xl font-bold">
            <span>Shop Cart</span>
            <i className="fa-solid fa-cart-shopping ml-2 text-lg"></i>
          </h2>
          {cartInfo.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <h3 className="font-bold md:text-lg">There Are Not items Yet.</h3>
              <Link to={"/"} className="btn-primary mt-3 md:text-xl">
                Add Your First Product To Cart
              </Link>
            </div>
          ) : (
            <>
              <h3 className="mb-2 text-xl text-primary">
                Total Cart Price: {cartInfo.data.totalCartPrice} L.E
              </h3>
              {cartInfo.data.products.map((product) => (
                <div
                  key={product._id}
                  className="product mt-5 grid grid-cols-12 gap-5"
                >
                  <div className="col-span-3 md:col-span-2 lg:col-span-1">
                    <img
                      src={product.product.imageCover}
                      className="w-full"
                      alt=""
                    />
                  </div>
                  <div className="col-span-9 flex items-center justify-between md:col-span-10 lg:col-span-11">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {product.product.title}
                      </h3>
                      <h4 className="text-primary">
                        Price: {product.price} L.E
                      </h4>
                      <button
                        onClick={() => {
                          removeProductFromCart({ id: product.product._id });
                        }}
                        className="btn-primary mt-4 bg-red-500 text-sm"
                      >
                        <i className="fa-solid fa-trash-can mr-2"></i>Remove
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          updateProductCount({
                            id: product.product._id,
                            count: product.count - 1,
                          });
                        }}
                        className="btn-primary"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span className="text-lg font-bold">{product.count}</span>
                      <button
                        onClick={() => {
                          updateProductCount({
                            id: product.product._id,
                            count: product.count + 1,
                          });
                        }}
                        className="btn-primary"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  clearCart();
                }}
                className="btn-primary ms-auto mt-4 block bg-red-500"
              >
                CLEAR CART
              </button>
            </>
          )}
        </section>
      )}
      <Link
        to="/checkout"
        className="btn-primary ms-auto mt-4 block w-fit uppercase"
      >
        Next Step
      </Link>
    </>
  );
}
