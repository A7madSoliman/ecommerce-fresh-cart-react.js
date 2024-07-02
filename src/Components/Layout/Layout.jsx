import React, { useEffect } from "react";
import { useState } from "react";
import Footer from "../Footer/Footer";
import NavbarSection from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Online from "../Online/Online";
import Offline from "../Offline/Offline";

export default function Layout() {
  useEffect(() => {});

  return (
    <>
      <NavbarSection />
      <Online>
        <div className="container pb-[240px] pt-[100px]">
          <Outlet />
        </div>
      </Online>

      <Offline>
        <div className="min-h-screen fixed z-[990] top-0 bottom-0 right-0 left-0 bg-black bg-opacity-25 flex justify-center items-center">
          <h2 className="text-white text-5xl font-semibold">
            Check Your Internet Connection
          </h2>
        </div>
      </Offline>
      <Footer />
    </>
  );
}
