import React, { useEffect } from "react";
import {Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Nav, Shop, Admin, Cart } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllShopProducts } from "./utils/firebaseFunction";
import { actionType } from "./context/reducer";

const App = () => {

  const [{ shopProducts }, dispatch] = useStateValue();
  const fetchData = async () => {
    await getAllShopProducts().then(data => {
      dispatch({
        type: actionType.SET_SHOP_PRODUCTS,
        shopProducts : data
      })
    })
  }

  // loads one time only
  useEffect(() => {fetchData()}, []);

  return (
    <AnimatePresence mode="wait">
      <div>
        <Nav/>
        <main>
          <Routes>
            <Route path="/*" element={<Shop />}/>
            <Route path="/admin" element={<Admin />}/>
            <Route path="/cart" element={<Cart />}/>
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
