import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MyContext } from "../App";
import {
  faCartShopping,
  faEye,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Games() {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const { addToCart, cart } = useContext(MyContext);
  function setpage() {
    setPage((prevPage) => prevPage + 1);
  }
  const notify = () =>
    toast.success("The product has been added successfully.");
  const filterData = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    const filtered = products.filter((item) =>
      item.product_title.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://real-time-amazon-data.p.rapidapi.com/search",
        params: {
          query: "videogame" || searchValue,
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
        const productSearch = Object.values(response.data.data.products);
        setProducts((prevProducts) => [...prevProducts, ...productSearch]);
        setFilteredProducts((prevProducts) => [
          ...prevProducts,
          ...productSearch,
        ]);
        console.log(response.data.data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [page, searchValue]);

  return (
    <>
      <div className="container mx-auto px-4 ">
        <div className="row">
          <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
          <input
            type="search"
            placeholder="Enter Your Phone"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            className="form-control Search produc mb-8 w-full max-w-lg mx-auto p-4 rounded-lg border border-gray-300 shadow-sm"
            onChange={filterData}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((item, index) => (
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
          onClick={() => setpage((page) => page + 1)}
        >
          More
        </button>
        <ToastContainer />
      </div>
    </>
  );
}
export default Games;
