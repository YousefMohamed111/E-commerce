import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginForm from "./Login/Login";
import SignupForm from "./Signup/Signup";
import "./input.css";
import Layout from "./Layout";
import Offers from "./Offers/offers";
import Cart from "./Cart/Cart";
import { createContext, useState } from "react";
import Layout2 from "./Layout2/Layout2";
import Layout5 from "./Layout5/Layout5";
import Layout3 from "./Layout3/Layout3";
import Layout1 from "./Layout1/Layout1";
import Layout4 from "./Layout4/Layout4";
export const MyContext = createContext();

const routes = createHashRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/offerproduct",
    element: <Offers />,
  },
  {
    path: "/details/:productid",
    element: <Layout2 />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/Login",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "/phones",
    element: <Layout1 />,
  },
  {
    path: "/Games",
    element: <Layout3 />,
  },
  {
    path: "/SmartHome",
    element: <Layout5 />,
  },
  {
    path: "/Fashion",
    element: <Layout4 />,
  },
]);

function App() {
  const [cart, setCart] = useState([]);
  const [num, Setnum] = useState(0);
  const [show, Setshow] = useState(true);

  const addToCart = (item) => {
    setCart((prevCart) => {
      console.log("Previous cart:", prevCart);
      const itemExists = prevCart.some(
        (cartItem) => cartItem.asin === item.asin
      );

      if (itemExists) {
        return prevCart;
      }
      const newCart = [...prevCart, item];
      Setnum((num) => num + 1);
      console.log("Updated cart:", newCart);
      return newCart;
    });
  };
  const addTodetailCart = (data) => {
    setCart((prevCart) => {
      console.log("Previous cart:", prevCart);
      const itemExists = prevCart.some(
        (cartItem) => cartItem.asin === data.asin
      );

      if (itemExists) {
        return prevCart;
      }
      Setnum((num) => num + 1);
      const newCart = [...prevCart, data];
      console.log("Updated cart:", newCart);
      return newCart;
    });
  };

  const clear = () => {
    setCart([]);
  };
  const removeItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.asin !== itemId));
  };
  return (
    <MyContext.Provider
      value={{
        cart,
        addToCart,
        addTodetailCart,
        num,
        Setshow,
        show,
        clear,
        removeItem,
        setCart,
      }}
    >
      <RouterProvider router={routes} />
    </MyContext.Provider>
  );
}

export default App;
