import React from 'react';
import Product from "./product";
import { useStateValue } from '../context/StateProvider';
import PublicApi from './publicApi';


const Shop = () => {
  const [{ shopProducts }, dispatch] = useStateValue();
  return (
    <div className="w-full h-auto flex flex-col items-center">
      <Product data={shopProducts}/>
      <PublicApi/>
    </div>
  )
}

export default Shop
