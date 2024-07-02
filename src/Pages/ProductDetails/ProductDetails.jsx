import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import ReactImageGallery from "react-image-gallery";
import { cartContext } from "../../Context/Cart.context";
import useOnlineStatus from "../../Hooks/useOnlineStatus";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const isOnline = useOnlineStatus();

  const [details, setDetails] = useState(null);

  const { addProductToCart } = useContext(cartContext);

  let { id } = useParams();

  async function getProductDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    );
    setDetails(data.data);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  const imageItems = details?.images.map((imageURL) => {
    return {
      original: imageURL,
      thumbnail: imageURL,
    };
  });

  return (
    <>
      {details === null ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>{details.title}</title>
            <meta name="description " content={details.description} />
          </Helmet>

          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-3">
              <ReactImageGallery
                items={imageItems}
                showNav={true}
                showFullscreenButton={false}
                showPlayButton={false}
              />
            </div>
            <div className="col-span-9">
              <h2 className="mb-2 text-2xl font-bold">{details.title}</h2>
              <h3 className="mb-2 font-semibold text-primary">
                {details.category.name}
              </h3>
              <p>{details.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span>{details.price} LE</span>
                <span>
                  <i className="fa-solid fa-star mr-1 text-yellow-400"></i>
                  {details.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => {
                  addProductToCart({ id: details.id });
                }}
                className="btn-primary mt-4 w-full"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
