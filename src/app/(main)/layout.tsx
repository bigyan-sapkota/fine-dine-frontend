import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import ScrollToTop from "@/components/layouts/scroll-to-top";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Header />
      {children}
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default Layout;
