import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetCode() {
  const navigate = useNavigate();

  async function submitCode(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      let id = toast.loading("Waiting ...");
      let { data } = await axios.request(options);
      console.log(data);
      toast.dismiss("");
      toast.success("Successfully");

      setTimeout(() => {
        if (data.status === "Success") {
          navigate("/auth/resetpassword");
        }
      }, 2000);
    } catch (error) {
      toast.error("Code Is Wrong");
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },

    onSubmit: submitCode,
  });

  return (
    <>
      <Helmet>
        <title>Reset Code</title>
        <meta name="description " content="Welcome To Reset Code Page" />
      </Helmet>

      <form onSubmit={formik.handleSubmit} className="mt-10">
        <span className="mb-6 space-x-3 text-2xl font-bold text-primary">
          Please Input Your Verification Code:
        </span>
        <div>
          <input
            className="form-control mt-5 w-full"
            type="text"
            placeholder="Write Your Code"
            name="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onSubmit={formik.handleSubmit}
          />
        </div>
        <button className="btn-primary mt-5" type="submit">
          Verify
        </button>
      </form>
    </>
  );
}
