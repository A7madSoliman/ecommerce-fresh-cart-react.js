import React, { useEffect } from "react";
import { useState } from "react";
import Notfoundimg from "../../assets/images/error.svg";

export default function Notfound() {
  useEffect(() => {});

  return (
    <>
      <img className="mx-auto" src={Notfoundimg} alt="" />
    </>
  );
}
