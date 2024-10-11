import React from "react";
import { useState, useEffect, useContext } from "react";
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
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import End from "../End/End";
function Offers() {
  const notify = () =>
    toast.success("The product has been added successfully.");
  const [products, setProducts] = useState([]);
  const [page, Setpage] = useState(1);
  const { addToCart, cart } = useContext(MyContext);

  function NextPages() {
    Setpage((nextPages) => nextPages + 1);
  }
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://real-time-amazon-data.p.rapidapi.com/product-offers",
        params: {
          asin: "B09SM24S8C",
          country: "US",
          limit: "100",
          page: `${page}`,
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
        const productoffer = response.data.data;
        setProducts((prevProducts) => [
          ...prevProducts,
          ...Object.values(productoffer),
        ]);
        setProducts((prevProducts) => [
          ...prevProducts,
          ...Object.values(productoffer),
        ]);
        setProducts([productoffer]);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [page]);

  return (
    <>
      <div className="container-fluid">
        <NavBar />
        <div className="row">
          {products.map((item) => (
            <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 shadow-md">
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
      <ToastContainer />
      <button type="button" className="btn btn-warning" onClick={NextPages}>
        More
      </button>
      <End />
    </>
  );
}

export default Offers;
