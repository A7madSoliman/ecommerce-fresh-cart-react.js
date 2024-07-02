import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProducts() {
  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };

    return axios.request(options);
  }

  let response = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return response;
}
