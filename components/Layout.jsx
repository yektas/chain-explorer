import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between w-full h-screen ">
      <Navbar />
      <div className="container px-4 mx-auto mb-auto sm:px-2 lg:px-4 xl:px-20">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
