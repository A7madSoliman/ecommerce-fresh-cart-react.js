import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  let id;

  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be at most 15 characters"),

    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),

    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^[A-Z][0-9a-zA-Z]{5,25}$/,
        "Password should start with an uppercase letter followed by a combination of letters and numbers, between 5 to 25 characters",
      ),

    rePassword: yup
      .string()
      .required("Re-Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),

    phone: yup
      .string()
      .required("Phone number is required")
      .matches(phoneRegex, "Phone number is not valid"),
  });

  async function sendDataToRegister(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };

      id = toast.loading("Waiting...");

      const { data } = await axios.request(options);
      toast.dismiss(id);
      toast.success("User created successfully");

      setTimeout(() => {
        if (data.message === "success") {
          navigate("/auth/login");
        }
      }, 2000);
    } catch (error) {
      toast.dismiss(id);
      toast.error(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: sendDataToRegister,
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Welcome to the Register Page" />
      </Helmet>

      <section>
        <h2 className="mb-6 space-x-3 text-2xl font-bold text-primary">
          <i className="fa-regular fa-circle-user"></i>
          <span>Register Now</span>
        </h2>
        <form className="space-y-8" onSubmit={formik.handleSubmit}>
          <div>
            <input
              className="form-control w-full"
              type="text"
              placeholder="Username"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="mt-2 text-red-600">{formik.errors.name}</div>
            )}
          </div>
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
            {formik.errors.email && formik.touched.email && (
              <div className="mt-2 text-red-600">{formik.errors.email}</div>
            )}
          </div>
          <div>
            <input
              className="form-control w-full"
              type="tel"
              placeholder="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="mt-2 text-red-600">{formik.errors.phone}</div>
            )}
          </div>
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
            {formik.errors.password && formik.touched.password && (
              <div className="mt-2 text-red-600">{formik.errors.password}</div>
            )}
          </div>
          <div>
            <input
              className="form-control w-full"
              type="password"
              placeholder="Re-Password"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div className="mt-2 text-red-600">
                {formik.errors.rePassword}
              </div>
            )}
          </div>
          <button type="submit" className="btn-primary">
            Sign Up
          </button>
          {errorMsg && <div className="mt-2 text-red-600">{errorMsg}</div>}
        </form>
      </section>
    </>
  );
}
