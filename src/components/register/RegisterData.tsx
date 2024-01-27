"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Countries, DataDetails, validateSchema } from "@/utils/utilities";

const Register = () => {
  const [error, setError] = useState("");
  const routing = useRouter();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    fathersName: "",
    mothersName: "",
    address: "",
    pincode: "",
    country: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateSchema,
    onSubmit: async (values: any) => {
      try {
        const response = await fetch("api/postRegister", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const { errors } = await response.json();
        if (errors) {
          setError("User Already Exists");
          return;
        }
        if (response.ok) {
          formik.resetForm();
          routing.push("/users");
        } else {
          setError("User Registration Failed");
        }
      } catch (error: any) {
        console.log("Error During Registration:", error);
      }
    },
  });
  return (
    <div className="p-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[100vh]">
      <div className="flex flex-col items-center">
        <h1 className="text-white text-3xl">Register Here</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-[50%]"
        >
          {DataDetails.map((e, i) => (
            <div key={i}>
              <label className="text-white" htmlFor={e}>
                {e}
              </label>
              <div>
                <input
                  type="text"
                  id={e}
                  style={{ width: "100%", padding: "8px", fontSize: "17px" }}
                  placeholder={`Enter the ${e}`}
                  value={formik.values[e]}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          ))}
          <div>
            <label className="text-white" htmlFor="country">
              country
            </label>
            <select
              name="country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ width: "100%", padding: "8px", fontSize: "17px" }}
            >
              <option>--select--</option>
              {Countries.map((e, i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "5px",
              }}
              type="submit"
            >
              Register
            </button>
            <Link href={"/users"}>
              <button
                style={{
                  backgroundColor: "black",
                  color: "white",
                  marginLeft: "20px",
                  padding: "5px",
                }}
              >
                View Users Data
              </button>
            </Link>
          </div>
          {error && (
            <p style={{ color: "white", fontWeight: "bold" }}>{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
