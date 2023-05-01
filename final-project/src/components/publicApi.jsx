import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {motion} from "framer-motion";

const PublicApi = () => {
    const [prod, setProd] = useState([]);

    useEffect(() => {
        const fetchProd = async () => {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProd(response.data);
        };
        fetchProd();
    }, []);

  return (
    <div>
    <h1 className='w-full justify-center items-center text-center text-3xl py-11'>Use of Public API for Project Requirement</h1>
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {prod && prod.length > 0 ? (
        prod.map((item) => (
          <div key={item?.id} className="w-80 h-auto gap-4 bg-purple-50 p-4 rounded-2xl">
            
            <div>
              <motion.div className="w-full h-48 object-cover">
                <img src={item?.image} alt="" className="w-full h-full object-contain"/>
              </motion.div>
            </div>

            <h3 className="text-lg break-normal text-left px-3 py-2">{item?.title}</h3>

            <div className="flex flex-row items-center gap-8 px-3 justify-between">
                <p className="text-lg text-headingColor font-semibold"><span className="text-sm text-red-500">$</span> {item?.price}</p>
                <motion.div
                    whileTap={{ scale: 0.75 }}
                    className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center cursor-pointer hover:shadow-md">
                        +
                </motion.div>
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

export default PublicApi
