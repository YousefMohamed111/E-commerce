import React, { useContext, useState } from "react";
import { MyContext } from "../App";
import "./cart.css";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as yup from "yup";

function Cart() {
  const { cart, clear } = useContext(MyContext);
  const [totalprice, setTotalprice] = useState(0);
  const [itemQuantities, setItemQuantities] = useState({});
  const [error, setError] = useState(null);

  console.log("Cart contents:", cart);

  function cleanPrice(price) {
    return parseFloat(price.replace("$", ""));
  }

  function increaseitem(itemId, itemPrice) {
    const price = cleanPrice(itemPrice);
    setTotalprice((prevTotalPrice) =>
      parseFloat((prevTotalPrice + price).toFixed(2))
    );
    setItemQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      updatedQuantities[itemId] = (updatedQuantities[itemId] || 0) + 1;
      return updatedQuantities;
    });
  }

  function removeitem(itemId, itemPrice) {
    const price = cleanPrice(itemPrice);
    console.log("Removing item with price:", itemPrice, "cleaned:", price);

    if (itemQuantities[itemId] > 0) {
      setTotalprice((prevTotalPrice) =>
        parseFloat((prevTotalPrice - price).toFixed(2))
      );
      setItemQuantities((prevQuantities) => {
        const updatedQuantities = { ...prevQuantities };
        updatedQuantities[itemId] = (updatedQuantities[itemId] || 0) - 1;
        return updatedQuantities;
      });
    } else {
      error("Invalid price for item:", itemPrice);
    }
  }
  const userSchema = yup.object({
    firstName: yup
      .string()
      .required("First name is required")
      .min(2, "First name must be between 2 and 11 characters")
      .max(11, "First name must be between 2 and 11 characters"),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(2, "Last name must be between 2 and 11 characters")
      .max(11, "Last name must be between 2 and 11 characters"),
    city: yup.string().required("City is required"),
    state: yup.string().required("state is required"),
    address: yup.string().required("Address is required"),
    ZipCode: yup
      .string()
      .required("ZipCode is required")
      .matches(/^\d{4,}$/, "ZipCode must be at least 4 digits long"),
    CardNumber: yup
      .string()
      .required("Card number is required")
      .matches(/^\d{16}$/, "Card number must be 16 digits"),
    ExpirationDat: yup.string().required("Expire date is required"),
    CVV: yup.string().required("CVV is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      address: "",
      ZipCode: "",
      CardNumber: "",
      ExpirationDat: "",
      CVV: "",
    },
    validationSchema: userSchema,
    onSubmit: async () => {
      try {
        console.log("Successful registration");
        clear();
      } catch (error) {
        console.error(error);
        setError("An error occurred while submitting your form");
      }
      s;
    },
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="col-lg-12 col-md-12 col-sm-12 col-xl-12 col-xxl-12 mb-4 cv"
              >
                <div className="thePic">
                  <p>Product</p>
                  <img
                    src={item.product_photo}
                    alt={item.product_title}
                    className="image-cart"
                  />
                </div>
                <div className="theName">
                  <p>Name</p>
                  <h5 className="cart-title">{item.product_title}</h5>
                </div>
                <div className="thePrice">
                  <p>Price</p>
                  <p className="card-text">Price: {item.product_price}</p>
                </div>
                <div className="buttons">
                  <FontAwesomeIcon
                    icon={faPlus}
                    type="button"
                    className="btn btn-warning"
                    onClick={() => increaseitem(index, item.product_price)}
                  />
                  <span>{itemQuantities[index] || 0}</span>
                  <FontAwesomeIcon
                    icon={faMinus}
                    type="button"
                    className="btn btn-warning"
                    onClick={() => removeitem(index, item.product_price)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <p>Total Price: {totalprice}</p>
      </div>
      {totalprice > 0 && (
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full max-w-3xl mx-auto p-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Checkout
              </h1>
              <div className="mb-6">
                {error && <p className="text-red-800">{error}</p>}
                <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none bg-white"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <p className="message-error my-2 fs-6">
                        {formik.errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none bg-white"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <p className="message-error my-2 fs-6">
                        {formik.errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="address"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none bg-white"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="message-error my-2 fs-6">
                      {formik.errors.address}
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="city"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none bg-white"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <p className="message-error my-2 fs-6">
                      {formik.errors.city}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none bg-white"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.state}
                    />
                    {formik.touched.state && formik.errors.state && (
                      <p className="message-error my-2 fs-6">
                        {formik.errors.state}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="ZipCode"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="ZipCode"
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none bg-white"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ZipCode}
                    />
                    {formik.touched.ZipCode && formik.errors.ZipCode && (
                      <p className="message-error my-2 fs-6">
                        {formik.errors.ZipCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                  Payment Information
                </h2>
                <div className="mt-4">
                  <label
                    htmlFor="CardNumber"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="CardNumber"
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none bg-white"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.CardNumber}
                  />
                  {formik.touched.CardNumber && formik.errors.CardNumber && (
                    <p className="message-error my-2 fs-6">
                      {formik.errors.CardNumber}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label
                      htmlFor="ExpirationDat"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      id="ExpirationDat"
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none bg-white"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ExpirationDat}
                    />
                    {formik.touched.ExpirationDat &&
                      formik.errors.ExpirationDat && (
                        <p className="message-error my-2 fs-6">
                          {formik.errors.ExpirationDat}
                        </p>
                      )}
                  </div>
                  <div>
                    <label
                      htmlFor="CVV"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      id="CVV"
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none bg-white"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.CVV}
                    />
                    {formik.touched.CVV && formik.errors.CVV && (
                      <p className="message-error my-2 fs-6">
                        {formik.errors.CVV}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default Cart;
