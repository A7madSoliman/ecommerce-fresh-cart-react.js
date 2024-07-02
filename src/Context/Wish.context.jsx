import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./User.context";
import toast from "react-hot-toast";

export const wishContext = createContext(null);

export default function WisherListProvider({ children }) {
  const [wishInfo, setWishInfo] = useState(null);
  const { token } = useContext(userContext);

  async function getWishItems() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
      setWishInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addWishToCart({ id }) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };
      let { data } = await axios.request(options);
      toast.success("Product Added To Wish List");
      getWishItems();
      setWishInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeWishFromList({ id }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
      if (data.length === 0) {
        setWishInfo([]);
      } else {
        setWishInfo(data);
      }

      getWishItems();
      toast.success("Product Removed From Wish List");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWishItems();
  }, []);

  return (
    <>
      <wishContext.Provider
        value={{ wishInfo, addWishToCart, removeWishFromList }}
      >
        {children}
      </wishContext.Provider>
    </>
  );
}
