import React from "react";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";

export default function HomeSlider() {
  return (
    <>
      <div className="mb-8 grid grid-cols-12">
        <div className="col-span-12 md:col-span-8">
          <swiper-container style={{ height: "100%" }} loop={true}>
            <swiper-slide style={{ height: "100%" }}>
              <img src={img3} className="h-full w-full" alt="" />
            </swiper-slide>
            <swiper-slide style={{ height: "100%" }}>
              <img src={img2} className="h-full w-full" alt="" />
            </swiper-slide>
            <swiper-slide style={{ height: "100%" }}>
              <img src={img1} className="h-full w-full" alt="" />
            </swiper-slide>
          </swiper-container>
        </div>
        <div className="col-span-4">
          <div className="h-1/2">
            <img
              src={img2}
              className="hidden h-full w-full md:col-span-4 md:block"
              alt=""
            />
          </div>
          <div className="h-1/2">
            <img
              src={img1}
              className="hidden h-full w-full md:col-span-4 md:block"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
