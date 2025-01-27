"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { redirectToLogin } from "@/lib/utils";
import { registrationSchema, RegistrationSchema } from "@/lib/form-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationSchema) => {
    try {
      // Handle form submission here
      console.log("Form data:", data);
      // Add your API call or registration logic here
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="w-full lg:max-w-lg">
      <div>
        <h2 className="text-dark font mb-6 text-center font-extrabold tracking-wider md:mb-8 lg:mb-6 lg:text-left">
          Register to Finedine
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full space-y-6">
        {/* Name and phone number input */}
        <div className="flex flex-col items-center gap-8 lg:flex-row">
          <div className="w-full space-y-1 lg:w-1/2">
            <input
              {...register("name")}
              type="text"
              placeholder="Your Full Name..."
              className="border-b-dark w-full border-0 border-b pb-1.5 outline-none placeholder:text-gray-500"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="w-full space-y-1 lg:w-1/2">
            <input
              {...register("phone")}
              type="tel"
              placeholder="Your Phone Number..."
              className="border-b-dark w-full border-0 border-b pb-1.5 outline-none placeholder:text-gray-500"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* email input field */}
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

        {/* address input field */}
        <div className="space-y-1">
          <input
            {...register("address")}
            type="text"
            placeholder="Your Address..."
            className="border-b-dark w-full border-0 border-b pb-1.5 outline-none placeholder:text-gray-500"
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>

        {/* password fields */}
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
        </div>

        <div className="relative mb-4 space-y-1">
          <input
            {...register("confirmPassword")}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Re-enter Password"
            className="border-b-dark w-full border-0 border-b pb-1.5 outline-none placeholder:text-gray-500"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-2 top-1"
          >
            {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            className="custom-shadow flex w-full items-center justify-center rounded-lg border border-gray-600 bg-white px-6 py-1.5 shadow-lg lg:py-2"
            onClick={redirectToLogin}
          >
            <img
              src="./login/sign-in.webp"
              alt="Google logo"
              className="size-9"
            />
            <span className="font-semibold">Sign in with Google</span>
          </button>

          <Button
            type="submit"
            variant="common"
            size="sm"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create an account"}
          </Button>
        </div>
        <div className="mt-2 flex w-full justify-center">
          <p className="custom-transition cursor-pointer text-sm font-semibold text-black underline hover:text-primary">
            Have already registered? Login
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
