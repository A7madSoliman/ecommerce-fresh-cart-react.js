import axios from "axios";
import React, { useEffect } from "react";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    return axios.request(options);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold">Shop Popular Categories</h2>
        <swiper-container
          loop={true}
          breakpoints={JSON.stringify({
            600: {
              slidesPerView: 2,
              spaceBetween: 3,
            },
            728: {
              slidesPerView: 3,
              spaceBetween: 3,
            },
            960: {
              slidesPerView: 4,
              spaceBetween: 3,
            },
            1220: {
              slidesPerView: 6,
              spaceBetween: 3,
            },
          })}
        >
          {data.data.data.map((category) => (
            <swiper-slide key={category._id}>
              <span>
                <img
                  src={category.image}
                  className="h-72 w-full object-cover"
                  alt={category.name}
                />
                <h3 className="font-semibold">{category.name}</h3>
              </span>
            </swiper-slide>
          ))}
        </swiper-container>
      </section>
    </>
  );
}
