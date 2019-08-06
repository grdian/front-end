import React from "react";

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
