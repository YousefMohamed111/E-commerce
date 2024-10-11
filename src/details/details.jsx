import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { faStar, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { MyContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Details() {
  const [data, SetData] = useState([]);
  const { productid } = useParams();
  const { addTodetailCart, cart } = useContext(MyContext);
  const notify = () =>
    toast.success("The product has been added successfully.");
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://real-time-amazon-data.p.rapidapi.com/product-details",
        params: {
          asin: `${productid}`,
          country: "US",
        },
        headers: {
          'x-rapidapi-key': '2a170e13a3msh77dd7187e5589d9p13c051jsncca1769571a9',
          'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
        //'x-rapidapi-key': '2d53cf32b7msh4b0462dd7049ffep18e0fcjsn2b6caf84304c',
      };

      try {
        const response = await axios.request(options);
        SetData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [productid]);
  return (
    <>
      <div className="container mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
        <div className="row">
          <div className="details-product flex flex-col md:flex-row gap-8">
            <div className="img-productdetail">
              <img
                src={data.product_photo}
                alt={data.product_title}
                className="max-w-xs rounded-lg shadow-md"
              />
            </div>
            <div className="information space-y-4">
              <p className="talkk text-xl font-bold">{data.product_title}</p>

              {data.about_product && data.about_product.length > 0 && (
                <div className="about-product-section">
                  <h4 className="text-lg font-semibold">About the Product:</h4>
                  <ul className="list-disc list-inside">
                    {data.about_product.map((item, index) => (
                      <li
                        key={index}
                        className="about-product-item talkk text-gray-600"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="talkk text-lg flex items-center">
                <span className="font-semibold">Price:</span>{" "}
                {data.product_price}
              </p>
              <p className="talkk text-lg flex items-center">
                <span className="font-semibold">Rating:</span>{" "}
                {data.product_star_rating}
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: "#FFD43B" }}
                  className="ml-2"
                />
              </p>
              <p className="talkk text-lg flex items-center">
                Num offers: {data.product_num_offers}
              </p>
              <p className="talkk text-lg flex items-center">
                <span className="font-semibold">Number of Ratings:</span>{" "}
                {data.product_num_ratings}
              </p>
              <ul className="list-disc list-inside">
                {data.product_details && (
                  <div className="product-details-section">
                    <h4 className="text-lg font-semibold">
                      Product Specifications:
                    </h4>
                    {Object.entries(data.product_details).map(
                      ([key, value], index) => (
                        <li
                          key={index}
                          className="about-product-item talkk text-gray-600"
                        >
                          <span className="font-semibold">{key}:</span> {value}
                        </li>
                      )
                    )}
                  </div>
                )}
              </ul>
            </div>
          </div>

          {data.product_photos && data.product_photos.length > 0 && (
            <div className="photo-product mt-6">
              <h4 className="text-lg font-semibold">Product Photos:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {data.product_photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt="Product"
                    className="k rounded-lg shadow-sm"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        type="button"
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center"
        onClick={() => {
          notify();
          addTodetailCart(data);
          console.log("Added to cart:", data);
          console.log("Current cart:", cart);
        }}
      >
        Add to Cart
        <span className="ml-2">
          <FontAwesomeIcon icon={faCartShopping} />
        </span>
      </button>
      <ToastContainer />
    </>
  );
}

export default Details;
