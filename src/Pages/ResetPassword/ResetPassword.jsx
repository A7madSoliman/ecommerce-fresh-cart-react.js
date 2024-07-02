import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  async function newResetPassword(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };

      let id = toast.loading("Waiting ...");
      let { data } = await axios.request(options);
      console.log(data);
      toast.dismiss(id);
      toast.success("Successfully");

      setTimeout(() => {
        if (data.token) {
          navigate("/");
        }
      }, 2000);
    } catch (error) {
      toast.error("The Password Is Not Valid, Try Again");
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },

    onSubmit: newResetPassword,
  });

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta name="description " content="Welcome To Reset Password Page" />
      </Helmet>

      <form onSubmit={formik.handleSubmit} className="mt-10">
        <span className="mb-6 space-x-3 text-2xl font-bold text-primary">
          Reset Your New Account Password:
        </span>
        <div className="gap-5">
          <input
            className="form-control mt-5 w-full"
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onSubmit={formik.handleSubmit}
          />
          <input
            className="form-control mt-5 w-full"
            type="password"
            placeholder="Enter New Password"
            name="newPassword"
            value={formik.values.ResetPassword}
            onChange={formik.handleChange}
            onSubmit={formik.handleSubmit}
          />
        </div>
        <button className="btn-primary mt-5" type="submit">
          Change Password
        </button>
      </form>
    </>
  );
}
