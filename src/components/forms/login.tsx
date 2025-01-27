"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { redirectToLogin } from "@/lib/utils";
import { loginSchema, LoginSchema } from "@/lib/form-schema";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      // Handle form submission here
      console.log("Form data:", data);
      // Add your API call or authentication logic here
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-full lg:max-w-md">
      <div>
        <h2 className="text-dark font mb-6 text-center font-extrabold tracking-wider md:mb-8 lg:mb-6 lg:text-left">
          Login to Finedine
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full space-y-6">
        <div className="space-y-1">
          <input
            {...register("email")}
            type="email"
            placeholder="Your Email..."
            className="border-b-dark w-full border-0 border-b pb-1.5 outline-none placeholder:text-gray-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="relative mb-4 space-y-1">
          <input
            {...register("password")}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className="border-b-dark w-full border-0 border-b pb-1.5 outline-none placeholder:text-gray-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-2 top-1"
          >
            {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        <div>
          <button
            type="button"
            className="custom-shadow mt-4 flex w-full items-center justify-center rounded-lg border border-gray-600 bg-white px-6 py-1.5 shadow-lg lg:py-2"
            onClick={redirectToLogin}
          >
            <img
              src="./login/sign-in.webp"
              alt="Google logo"
              className="size-9"
            />
            <span className="font-semibold">Sign in with Google</span>
          </button>

          <div className="flex flex-col items-center gap-4">
            <Button
              type="submit"
              variant="common"
              size="sm"
              className="mt-6 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>

            <div className="mt-2 flex w-full items-center justify-between">
              <p className="custom-transition cursor-pointer text-sm font-semibold text-black underline hover:text-primary">
                Haven't registered yet? Register
              </p>
              <p className="custom-transition cursor-pointer text-sm font-semibold text-primary hover:text-black">
                Forgot password?
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
