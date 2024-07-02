import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/User.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function AllOrders() {
  const [orders, setOrders] = useState(null);
  const { token } = useContext(userContext);
  const { id } = jwtDecode(token);

  async function getUserOrder() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };

    const { data } = await axios.request(options);
    setOrders(data);
  }

  useEffect(() => {
    getUserOrder();
  }, []);

  return (
    <>
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="Welcome To Order Page" />
      </Helmet>

      {!orders ? (
        <Loading />
      ) : (
        orders.map((order) => (
          <div className="order mt-5 rounded-md border border-gray-500 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-500">Order ID :</h2>
                <h3 className="font-bold">#{order.id}</h3>
              </div>
              <div>
                {order.isDelivered ? (
                  <span className="btn-primary me-3 inline-block bg-lime-500 font-cairo">
                    تم التوصيل
                  </span>
                ) : (
                  <span className="btn-primary me-3 inline-block bg-blue-500 font-cairo">
                    قيد التوصيل
                  </span>
                )}

                {order.isPaid ? (
                  <span className="btn-primary inline-block bg-lime-500 font-cairo">
                    تم الدفع
                  </span>
                ) : (
                  <span className="btn-primary inline-block bg-red-500 font-cairo">
                    غير مدفوع
                  </span>
                )}
              </div>
            </div>
            <div className="mt-5 grid grid-cols-12 gap-3">
              {order.cartItems.map((product) => (
                <div className="product col-span-12 rounded border border-gray-300 p-3 md:col-span-4 lg:col-span-3 xl:col-span-2">
                  <img
                    className="h-32 w-full object-contain"
                    src={product.product.imageCover}
                    alt=""
                  />
                  <h3 className="my-2 font-semibold">
                    {product.product.title}
                  </h3>
                  <span className="text-gray-700">{product.price} LE</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
      <Link
        to="/"
        className="mt-10 flex flex-col items-center justify-center py-10"
      >
        <button className="btn-primary mt-5 text-xl">
          Press Here To Go Home
        </button>
      </Link>
    </>
  );
}
