import React from "react";
import "./delivery.css";
import img1 from "./img/istockphoto-1460445953-612x612-removebg.png";
import { Link } from "react-router-dom";
function Delivery() {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center bg-[#e8e8e5] container mx-auto rounded-xl mt-5">
        <div className="md:w-1/2 lg:w-1/2 text-center md:text-left mt-8 md:mt-0">
          <h1 className="text-3xl font-bold">
            Welcome to our store, here you will find everything you want from a
            variety of products. Don't forget to check out our discounts.
          </h1>
          <Link to="/offerproduct">
            <button
              type="button"
              className="mt-6 bg-black px-6 py-3 text-xs font-medium uppercase tracking-wide text-white hover:bg-gray-800 transition-colors duration-300 rounded"
            >
              Go
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 lg:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src={img1}
            alt="Store Image"
            className="rounded-xl max-w-full h-auto"
          />
        </div>
      </section>
    </>
  );
}

export default Delivery;
