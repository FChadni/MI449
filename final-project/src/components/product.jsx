import React, { useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { getAllShopProducts } from '../utils/firebaseFunction';
import { actionType } from '../context/reducer';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";


const Product = ({ data }) => {
  console.log("data", data);

  return (
    <div>
      <div className={`w-full flex items-center gap-3  my-12 scroll-smooth`}>
      {data && data.length > 0 ? (
        data.map((item) => (
          <div key={item?.id} className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative">
            
            <div className="w-full flex items-center justify-between">
              <motion.div className="w-40 h-40 -mt-8 drop-shadow-2xl" whileHover={{ scale: 1.2 }}>
                <img src={item?.imageURL} alt="" className="w-full h-full object-contain"/>
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
              >
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.productTitle}
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
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
