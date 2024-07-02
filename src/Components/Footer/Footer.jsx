import React, { useEffect } from "react";
import Amazon from "../../assets/images/amazon-pay.png";
import American from "../../assets/images/American-Express-Color.png";
import MasterCard from "../../assets/images/mastercard.webp";
import PayPal from "../../assets/images/paypal.png";
import Apple from "../../assets/images/get-apple-store.png";
import Google from "../../assets/images/get-google-play.png";

export default function Footer() {
  useEffect(() => {});

  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-slate-100 py-4">
      <div className="container">
        <h2 className="text-xl font-semibold md:text-2xl">
          Get the FreshCart App
        </h2>
        <p className="my-3 text-sm md:text-xl">
          We will send you a link open it on your phone to download the app
        </p>

        <div className="flex gap-4">
          <input
            className="form-control flex-grow"
            type="email"
            placeholder="Email...."
          />
          <button className="btn-primary">Share App Link</button>
        </div>

        <div className="div flex items-center gap-8 md:justify-between">
          <div className="flex items-center gap-5 py-3">
            <img className="w-12 md:w-14" src={Amazon} alt="" />
            <img className="w-12 md:w-14" src={American} alt="" />
            <img className="w-12 md:w-14" src={MasterCard} alt="" />
            <img className="w-12 md:w-14" src={PayPal} alt="" />
          </div>

          <div className="flex items-center gap-4 py-3">
            <img className="w-16" src={Apple} alt="" />
            <img className="w-16" src={Google} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
}
