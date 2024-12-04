export default function Page() {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat h-96"
      style={{
        backgroundImage: "url('./login/login-bg.png')",
      }}
    >
      <div className="flex items-center justify-between h-full section-padding-x border-t-2 border-b-2 border-gray-400 ">
        <div>
          <h1 className="text-6xl font-bold">Login</h1>
          <p className="my-6">
            A fast and simple way to get your table reserved.
          </p>
          <div className="flex items-center py-2 border border-gray-600 rounded-3xl w-fit px-6 shadow-lg custom-shadow">
            <img
              src="./login/sign-in.webp"
              alt="Google logo"
              className="size-9"
            />
            <span className="font-semibold">Sign in with Google</span>
          </div>
        </div>

        <div className="flex items-center gap-10 py-6 h-full">
          <img
            src="./login/login-right-2.jpg"
            alt=""
            className="h-full w-52 object-cover rounded-[70px]"
          />
          <img
            src="./login/login-right-1.jpg"
            alt=""
            className="h-full w-52 object-cover rounded-[70px]"
          />
        </div>
      </div>
    </section>
  );
}
