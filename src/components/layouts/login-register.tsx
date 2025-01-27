"use client";

export default function LoginRegister({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="h-fit bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('./login/login-bg.png')",
      }}
    >
      <div className="section-padding-x max-width flex h-full items-center justify-between gap-14 border-b-2 border-t-2 border-gray-400 py-10">
        {/* login register section */}
        <div className="w-full lg:w-1/2">{children}</div>

        {/* images */}
        <div className="hidden h-full items-center gap-10 py-6 md:flex lg:w-1/2">
          <img
            src="./login/login-right-2.jpg"
            alt=""
            className="h-full w-72 rounded-3xl object-cover md:hidden lg:block"
          />
          <img
            src="./login/login-right-1.jpg"
            alt=""
            className="h-full w-72 rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
