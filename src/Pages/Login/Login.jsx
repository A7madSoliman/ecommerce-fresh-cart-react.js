import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/User.context";
import { Helmet } from "react-helmet";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const { token, setToken } = useContext(userContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("ُEmail Is Not Valid"),

    password: Yup.string()
      .required("Password is Required")
      .matches(/^[A-Z][0-9a-zA-Z]{5,25}$/, "Password Is bad w5las dlaw2ty XD"),
  });

  async function sendDataToLogin(values) {
    let id;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };

      id = toast.loading("Waiting....");

      const { data } = await axios.request(options);
      console.log(data);
      toast.dismiss(id);
      toast.success("User Logged in Successfully");

      setTimeout(() => {
        if (data.message === "success") {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        }
      }, 2000);
    } catch (error) {
      toast.dismiss(id);
      toast.error(error.response.data.message);
      console.log(error);
      setErrorMsg(error.response.data.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: sendDataToLogin,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Welcome To Login Page" />
      </Helmet>

      <section>
        <h2 className="mb-6 space-x-3 text-2xl font-bold text-primary">
          <i className="fa-regular fa-circle-user"></i>
          <span>Login Now</span>
        </h2>
        <form className="space-y-8" onSubmit={formik.handleSubmit}>
          <div>
            <input
              className="form-control w-full"
              type="email"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.name && formik.touched.email ? (
            <div className="mt-2 text-red-600">{formik.errors.email}</div>
          ) : (
            ""
          )}
          <div>
            <input
              className="form-control w-full"
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.name && formik.touched.password ? (
            <div className="mt-2 text-red-600">{formik.errors.password}</div>
          ) : (
            ""
          )}
          {errorMsg ? <div className="mt-2 text-red-600">{errorMsg}</div> : ""}

          <div className="flex justify-between">
            <button type="submit" className="btn-primary">
              Login
            </button>
            <Link
              to="/auth/forgetpassword"
              className="font-semibold hover:text-primary"
            >
              Forget Your Password?
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
