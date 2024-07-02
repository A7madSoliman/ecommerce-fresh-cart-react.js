import "./App.css";
import { createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Notfound from "./Pages/Notfound/Notfound";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Components/Home/Home";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import UserProvider from "./Context/User.context";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import "react-image-gallery/styles/css/image-gallery.css";
import Cart from "./Pages/Cart/Cart";
import CartProvider from "./Context/Cart.context";
import CheckOut from "./Pages/CheckOut/CheckOut";
import AllOrders from "./Pages/AllOrders/AllOrders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Products from "./Pages/Prodcuts/Prodcuts";
import Categories from "./Pages/Categories/Categories";
import WishList from "./Pages/WishList/WishList";
import WisherListProvider from "./Context/Wish.context";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetCode from "./Pages/ResetCode/ResetCode";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";

function App() {
  const routers = createHashRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/categories", element: <Categories /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/wishlist", element: <WishList /> },
        { path: "/cart", element: <Cart /> },
        { path: "/allorders", element: <AllOrders /> },
        { path: "/products", element: <Products /> },
        { path: "/checkout", element: <CheckOut /> },
        { path: "*", element: <Notfound /> },
      ],
    },
    {
      path: "/auth",
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Register /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "resetcode", element: <ResetCode /> },
        { path: "resetpassword", element: <ResetPassword /> },
      ],
    },
  ]);

  const myClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserProvider>
          <CartProvider>
            <WisherListProvider>
              <RouterProvider router={routers} />
              <ReactQueryDevtools></ReactQueryDevtools>
              <Toaster />
            </WisherListProvider>
          </CartProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
