import React, { useEffect } from 'react';
import Product from "./product";
import Cart from "./cart";
import { useStateValue } from '../context/StateProvider';
import { getAllShopProducts } from '../utils/firebaseFunction';
import { actionType } from '../context/reducer';
import { Link } from "react-router-dom";


const Shop = () => {
  const [{ shopProducts }, dispatch] = useStateValue();

  return (
    <div className="w-full h-auto flex flex-col items-center">
      <Product data={shopProducts}/>
      <Cart/>
    </div>
  )
}

export default Shop
