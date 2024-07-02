import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const navigate = useNavigate();

  async function submitEmail(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };

      let id = toast.loading("Waiting ...");
      let { data } = await axios.request(options);
      console.log(data);
      toast.dismiss(id);
      toast.success("Successfully");

      setTimeout(() => {
        if (data.statusMsg === "success") {
          navigate("/auth/resetcode");
        }
      }, 2000);
    } catch (error) {
      toast.error("Your Email Is Not Valid");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: submitEmail,
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
        <meta name="description " content="Welcome To Forget Password Page" />
      </Helmet>

      <form onSubmit={formik.handleSubmit} className="mt-10">
        <span className="mb-6 space-x-3 text-2xl font-bold text-primary">
          Reset Your Account Password:
        </span>
        <div>
          <input
            className="form-control mt-5 w-full"
            type="email"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onSubmit={formik.handleSubmit}
          />
        </div>
        <button className="btn-primary mt-5" type="submit">
          Send Code
        </button>
      </form>
    </>
  );
}
