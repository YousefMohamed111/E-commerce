import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img2 from "./img/vector.png";
import "./NavBar.css";
import { MyContext } from "../App";

function NavBar() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { num } = useContext(MyContext);
  const [showMenu, setShowMenu] = useState(false);

  const filterData = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
  };

  const opentoggle = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://real-time-amazon-data.p.rapidapi.com/search",
        params: {
          query: search,
          page: "1",
          country: "US",
          sort_by: "RELEVANCE",
          product_condition: "ALL",
          is_prime: "false",
          deals_and_discounts: "NONE",
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
        const productsData = response.data.data?.products || [];
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (search) {
      const debounceTimeout = setTimeout(() => {
        fetchData();
      }, 300);
      return () => clearTimeout(debounceTimeout);
    }
  }, [search]);

  return (
    <>
      <nav className="flex bg-black pt-2 pb-2 justify-between">
        <div>
          <img src={img2} alt="logo" width="40" height="40"></img>
        </div>
        <div className="w-full md:w-auto hidden md:flex text-right text-bold md:border-none">
          <Link to="/fashion" className="text-white pr-7 mt-2">
            Fashion
          </Link>
          <Link to="/games" className="text-white pr-7 mt-2">
            Games
          </Link>
          <ul className="grid">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={filterData}
            />
            <ul className="search-list bg-white">
              {search && products.length > 0
                ? products.map((item, index) => (
                    <Link key={index} to={`/details/${item.asin}`}>
                      <li className="flex">
                        <img
                          src={item.product_photo}
                          className="image-resizes"
                          alt={item.product_title}
                        />
                        <p className="card-texts text-black">
                          {item.product_title}
                        </p>
                      </li>
                    </Link>
                  ))
                : search && <p>No products found...</p>}
            </ul>
          </ul>
        </div>
        <div className="p-2 hidden md:flex">
          <Link to="/signup" className="text-white">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
          <span className="num-cart text-white">{num}</span>
        </div>
        <div className="text-white mt-1.5 md:hidden">
          <button onClick={opentoggle}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        {showMenu && (
          <div className="absolute top-12 left-0 w-full bg-black text-white p-4">
            <Link to="/fashion" className="block pr-7 mt-2">
              Fashion
            </Link>
            <Link to="/games" className="block pr-7 mt-2">
              Games
            </Link>
            <ul className="grid">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={filterData}
              />
              <ul className="search-list bg-white">
                {search && products.length > 0
                  ? products.map((item, index) => (
                      <Link key={index} to={`/details/${item.asin}`}>
                        <li className="flex">
                          <img
                            src={item.product_photo}
                            className="image-resizes"
                            alt={item.product_title}
                          />
                          <p className="card-texts text-black">
                            {item.product_title}
                          </p>
                        </li>
                      </Link>
                    ))
                  : search && <p>No products found...</p>}
              </ul>
            </ul>
            <Link to="/signup" className="text-white">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default NavBar;
