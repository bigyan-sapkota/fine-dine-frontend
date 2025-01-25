"use client";
import { redirectToLogin } from "@/lib/utils";

export default function Page() {
  return (
    <section
      className="h-96 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('./login/login-bg.png')",
      }}
    >
      <div className="section-padding-x max-width flex h-full items-center justify-between border-b-2 border-t-2 border-gray-400">
        <div>
          <h1 className="text-6xl font-bold">Login</h1>
          <p className="my-6">
            A fast and simple way to get your table reserved.
          </p>
          <button
            className="custom-shadow flex w-fit items-center rounded-lg border border-gray-600 bg-white px-6 py-2 shadow-lg"
            onClick={redirectToLogin}
          >
            <img
              src="./login/sign-in.webp"
              alt="Google logo"
              className="size-9"
            />
            <span className="font-semibold">Sign in with Google</span>
          </button>
        </div>

        <div className="flex h-full items-center gap-10 py-6">
          <img
            src="./login/login-right-2.jpg"
            alt=""
            className="h-full w-52 rounded-3xl object-cover"
          />
          <img
            src="./login/login-right-1.jpg"
            alt=""
            className="h-full w-52 rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
