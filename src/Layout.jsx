import React from "react";
import Product from "./Product/Product";
import Section3 from "./section3/Section3";
import End from "./End/End";
import NavBar from "./NavBar/NavBar";
import Delivery from "./delivery/delivery";
function Layout() {
  return (
    <div>
      <NavBar />
      <Delivery />
      <Product />
      <Section3 />
      <End />
    </div>
  );
}

export default Layout;
