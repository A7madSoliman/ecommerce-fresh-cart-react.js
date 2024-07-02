import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/Cart.context";
import axios from "axios";
import { userContext } from "../../Context/User.context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function CheckOut() {
  const { cartInfo, setCartInfo } = useContext(cartContext);
  const { token } = useContext(userContext);
  const [orderType, setOrderType] = useState(null);
  const navigate = useNavigate();

  async function createCashOrder(values) {
    console.log("###### Cash");
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        values,
      },
    };

    let { data } = await axios.request(options);
    console.log(data);
    setCartInfo([]);
    setTimeout(() => {
      navigate("/allorders");
    }, 2000);
  }

  async function createOnlineOrder(values) {
    console.log("###### Online");
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        values,
      },
    };

    let { data } = await axios.request(options);
    console.log(data);

    toast.loading("Redirect To Payment Gateway");

    setTimeout(() => {
      if (data.status === "success") {
        window.location.href = data.session.url;
      }
    }, 3000);
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },

    onSubmit: (values) => {
      if (orderType === "cash") createCashOrder(values);
      else createOnlineOrder(values);
    },
  });

  return (
    <>
      <Helmet>
        <title>CheckOut</title>
        <meta name="description " content="Welcome To CheckOut Page" />
      </Helmet>

      <h2 className="mb-5 text-2xl font-bold">Shipping Address</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          className="form-control mb-3 w-full"
          placeholder="City"
          name="shippingAddress.city"
          value={formik.values.shippingAddress.city}
          onChange={formik.handleChange}
        />
        <input
          type="tel"
          className="form-control mb-3 w-full"
          placeholder="Phone"
          name="shippingAddress.phone"
          value={formik.values.shippingAddress.phone}
          onChange={formik.handleChange}
        />
        <textarea
          className="form-control mb-3 w-full"
          placeholder="Details"
          name="shippingAddress.details"
          value={formik.values.shippingAddress.details}
          onChange={formik.handleChange}
        ></textarea>
        <button
          onClick={() => {
            setOrderType("cash");
          }}
          type="submit"
          className="btn-primary mr-4 bg-blue-500"
        >
          Cash Order
        </button>
        <button
          onClick={() => {
            setOrderType("online");
          }}
          type="submit"
          className="btn-primary"
        >
          Online order
        </button>
      </form>
    </>
  );
}
