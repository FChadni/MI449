import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import CartItm from './cartItm';

const Cart = () => {
    const [{cartItems}, dispatch] = useStateValue();

    const clearCart = () => {
    dispatch({
        type: actionType.SET_CART_ITEMS,
        cartItems: [],
    });
    localStorage.setItem("cartItems", JSON.stringify([]));
    };

  return (
    <div>
      <div className="w-full mx-auto px-56">
        <div className='w-full h-auto flex flex-row items-center justify-between my-4'>
            <h2>Your Cart</h2>
            <Link to={"/"}> <p>Continue shopping</p></Link>
        </div>
        {cartItems &&  cartItems.length > 0 ? (
            cartItems.map(item => (<CartItm key={item.id} item={item}/>))
        ) : (
            <div className="w-full flex flex-col items-center justify-center">
            <p className="text-xl text-headingColor font-semibold my-2">
              Cart Is Empty
            </p>
          </div>
        )}

        <div className='flex flex-col justify-end my-4'>
            <div className='text-right my-2'>
                <button className='text-right bg-red-200 p-2 rounded-xl border-b-2 mx-6' onClick={clearCart}>Clear Cart</button>
                <button className='text-right bg-green-300 p-2 rounded-xl border-b-2'>Check Out</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
