import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Product.css";
import {
  faStar,
  faCartShopping,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { MyContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [page, SetPage] = useState(1);
  const { addToCart, cart } = useContext(MyContext);

  const notify = () =>
    toast.success("The product has been added successfully.");
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://real-time-amazon-data.p.rapidapi.com/products-by-category",
        params: {
          category_id: "2478868012",
          page: `${page}`,
          country: "US",
          sort_by: "RELEVANCE",
          product_condition: "ALL",
          is_prime: "false",
        },
        headers: {
          "x-rapidapi-key":
            "2a170e13a3msh77dd7187e5589d9p13c051jsncca1769571a9",
          "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
        },
        //'x-rapidapi-key': '2d53cf32b7msh4b0462dd7049ffep18e0fcjsn2b6caf84304c',
      };

      try {
        const response = await axios.request(options);
        const productsData = Object.values(response.data.data.products);
        setProducts(productsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [page]);

  return (
    <>
      <div className="container mx-auto px-4 ">
        <div className="row">
          <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((item, index) => (
              <div
                key={index}
                className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 shadow-md"
              >
                <div className="relative">
                  <img
                    src={item.product_photo}
                    className="w-full h-64 object-cover"
                    alt={item.product_title}
                  />
                </div>
                <div className="p-6">
                  <p className="text-lg font-semibold text-gray-900 truncate">
                    {item.product_title}
                  </p>
                  <p className="text-gray-700 mt-2 items-center">
                    Price: {item.product_price}
                  </p>
                  <p className="text-gray-500 mt-1 flex items-center">
                    Rate: {item.product_star_rating}/10
                    <span className="ml-2">
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ color: "#FFD43B" }}
                      />
                    </span>
                  </p>
                  <div className="flex justify-between mt-4">
                    <Link to={`/details/${item.asin}`}>
                      <button type="button" className="btn btn-success">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        notify();
                        addToCart(item);
                        console.log("Added to cart:", item);
                        console.log("Current cart:", cart);
                      }}
                    >
                      <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="mt-8 bg-black px-6 py-3 text-xs font-medium uppercase tracking-wide text-white hover:bg-gray-800 transition-colors duration-300 rounded"
          onClick={() => SetPage((page) => page + 1)}
        >
          More
        </button>
        <ToastContainer />
      </div>
    </>
  );
}
export default Product;
