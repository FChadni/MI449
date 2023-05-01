import React, { useEffect, useState, useCallback } from 'react';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { motion } from 'framer-motion';


const Product = ({ data }) => {
  console.log("data", data);

  const [{cartItems}, dispatch] = useStateValue();
  const [items, setItems] = useState([]);

  const addToCart = useCallback(() => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [dispatch, items]);

  useEffect(() => { 
    addToCart();
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
  }, [cartItems, addToCart]);

  return (
    <div>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 py-20'>
      {data && data.length > 0 ? (
        data.map((item) => (
          <div key={item?.id} className="w-80 h-auto gap-6 rounded-2xl border-2 border-gray-300 pb-4">
            
            <div className="w-full flex items-center justify-between">
              <motion.div whileHover={{ scale: 1.2 }}>
                <img src={item?.imageURL} alt="" className="w-full h-full object-contain"/>
              </motion.div>
            </div>

            <p className="text-textColor text-base md:text-lg py-1 px-2">{item?.productTitle}</p>

            <div className="w-full flex flex-row justify-between py-1 px-2">
              <p className="text-lg text-headingColor font-semibold"><span className="text-lg">$</span> {item?.price}</p>
              <div>
                <motion.div whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center cursor-pointer hover:shadow-md text-white text-2xl"
                  onClick={() => setItems([...cartItems, item])}>
                    +
                </motion.div>
              </div>
            </div>
          </div>
        ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-xl text-headingColor font-semibold my-2">
              Items Not Available
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Product
