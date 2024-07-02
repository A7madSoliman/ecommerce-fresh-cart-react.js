import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../Context/User.context";
import { cartContext } from "../../Context/Cart.context";
import { RiMenu3Fill } from "react-icons/ri";
import { MdClose } from "react-icons/md";

export default function NavbarSection() {
  const { token, logOut } = useContext(userContext);
  const { getCartItems, cartInfo } = useContext(cartContext);

  const [open, setOpen] = useState(false);
  const handleNav = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 bg-slate-100 p-3">
        <div className="container relative flex gap-8">
          <h1>
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </h1>

          {token ? (
            <ul className="hidden items-center gap-6 md:flex">
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-primary before:transition-[width] before:duration-300 hover:font-bold hover:before:w-full ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                  }}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-primary before:transition-[width] before:duration-300 hover:font-bold hover:before:w-full ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                  }}
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-primary before:transition-[width] before:duration-300 hover:font-bold hover:before:w-full ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                  }}
                  to="/categories"
                >
                  Categories
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-primary before:transition-[width] before:duration-300 hover:font-bold hover:before:w-full ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                  }}
                  to="/allorders"
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-primary before:transition-[width] before:duration-300 hover:font-bold hover:before:w-full ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                  }}
                  to="/wishlist"
                >
                  Wish List
                </NavLink>
              </li>
            </ul>
          ) : (
            ""
          )}
          {token ? (
            <Link to={"/cart"} className="relative mt-1">
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              <span className="absolute right-0 top-0 flex h-4 w-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded bg-primary text-sm font-bold text-white">
                {cartInfo === null ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  cartInfo.numOfCartItems || 0
                )}
              </span>
            </Link>
          ) : (
            ""
          )}

          <ul className="ms-auto flex items-center gap-7">
            {!token ? (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-primary before:transition-[width] before:duration-300 hover:font-bold hover:before:w-full ${
                        isActive ? "font-bold before:w-full" : "before:w-0"
                      }`;
                    }}
                    to="/auth/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-primary before:transition-[width] before:duration-300 hover:font-bold hover:before:w-full ${
                        isActive ? "font-bold before:w-full" : "before:w-0"
                      }`;
                    }}
                    to="/auth/signup"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="cursor-pointer">
                <span onClick={logOut}>
                  <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                </span>
              </li>
            )}
          </ul>

          {token ? (
            <div
              onClick={handleNav}
              className="flex cursor-pointer flex-col justify-center text-3xl md:hidden"
            >
              {open ? <MdClose /> : <RiMenu3Fill />}
            </div>
          ) : (
            ""
          )}
        </div>

        <div>
          {open ? (
            <ul className="absolute left-0 top-[43px] z-[-50] flex w-screen flex-col items-center gap-6 bg-slate-100 py-10 transition duration-500 ease-in-out md:hidden">
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-primary before:transition-[width] before:duration-300 hover:font-bold hover:before:w-full ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                  }}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-primary before:transition-[width] before:duration-300 hover:font-bold hover:before:w-full ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                  }}
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-primary before:transition-[width] before:duration-300 hover:font-bold hover:before:w-full ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                  }}
                  to="/categories"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-primary before:transition-[width] before:duration-300 hover:font-bold hover:before:w-full ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                  }}
                  to="/allorders"
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:bg-primary before:transition-[width] before:duration-300 hover:font-bold hover:before:w-full ${isActive ? "font-bold before:w-full" : "before:w-0"}`;
                  }}
                  to="/wishlist"
                >
                  Wish List
                </NavLink>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </nav>
    </>
  );
}
