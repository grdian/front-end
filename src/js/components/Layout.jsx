import React from "react";
import "../../css/master.css";
import "../../css/common.css";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => (
  <>
    <div className="wrapper">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  </>
);

export default Layout;
