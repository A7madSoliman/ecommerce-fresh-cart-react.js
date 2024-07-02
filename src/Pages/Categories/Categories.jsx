import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Categories() {
  const [categoryItems, setCategoryItems] = useState(null);

  async function allCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };

    const { data } = await axios.request(options);
    setCategoryItems(data);
  }

  const { isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: allCategories,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="Welcome To Category Page" />
      </Helmet>

      <div className="grid grid-cols-12 gap-4">
        {categoryItems?.data.map((category) => (
          <Link
            to="/products"
            key={category._id}
            className="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
          >
            <Card className="col-span-12 cursor-pointer shadow-md hover:border-lime-500 hover:shadow-lg md:col-span-6 lg:col-span-4 xl:col-span-3">
              <img className="h-72 object-cover" src={category.image} />
              <div>
                <h5 className="p-5 text-center font-bold tracking-tight text-gray-900 dark:text-white md:text-lg xl:text-[15px]">
                  {category.name}
                </h5>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
