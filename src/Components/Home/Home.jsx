import React, { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Loading from "../Loading/Loading";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import useProducts from "../../Hooks/useProducts";
import { Helmet } from "react-helmet";

export default function Home() {
  const { isLoading, data } = useProducts();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description " content="Welcome To Home Page" />
      </Helmet>

      <HomeSlider />
      <CategorySlider />
      <div className="grid grid-cols-12 gap-5">
        {data.data.data.map((product) => (
          <ProductCard productInfo={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
