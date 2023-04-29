import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import logo from "../assets/logo.png";
import { BsSearch, BsPlus  } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Nav = () => {

  // state value 
  const [isPopup, setIsPopup] = useState(false);

  // Login function - this is fetching user information (redux)
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [ {user}, dispatch ] = useStateValue();

  const login = async () => {
    if(!user){
      const { user : {refreshToken, providerData} }= await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type : actionType.SET_USER,
        user : providerData[0],
      });
      console.log(user);
      localStorage.setItem('user', JSON.stringify(providerData[0]));
    }else{
      setIsPopup(!isPopup);
    }
  }

  return (
    <header className="flex items-center justify-between flex-wrap bg-white p-6 px-50 mx-24 border-b border-gray-300">
    {/* Desktop navigation */}
      <Link to={"/"} className="flex items-center flex-shrink-0 mr-6">
        <img className="h-75 w-75 mr-2" src={logo} alt="logo"/>
      </Link>

      <ul className="flex justify-center items-center gap-4">
        <li className="text-lg lg:flex-grow">
            <a href="#shop" className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-500 mr-4">
                Shop
            </a>
        </li>
        <li className="text-lg lg:flex-grow">
            <a href="#shop" className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-500 mr-4">
                Our Story
            </a>
        </li>
        <li className="text-lg lg:flex-grow">
            <a href="#shop" className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-500 mr-4">
                Element in 3D
            </a>
        </li>
      </ul>

      <div className="flex items-center justify-end mt-4 lg:mt-0">
        <a href="#search" className="block mr-7 text-gray-800 hover:text-gray-500">
            <BsSearch className="text-3xl"/>
        </a>
        <a href="#search" className=" relative block mr-7 text-gray-800 hover:text-gray-500">
            <FaShoppingCart className="text-3xl"/>
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
              <p className="text-sm text-white font-semibold">2</p>
            </div>
        </a>
        <div className="relative">
          <motion.img whileTap={{scale: 0.6}} 
            src={ user ? user.photoURL : logo } 
            className='w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer rounded-full' 
            alt="user image"
            onClick={login}
          />
          {
            isPopup && (
              <motion.div 
                initial={{opacity : 0, scale: 0.6}} animate={{opacity : 1, scale: 1}} exit={{opacity : 0, scale: 0}}
                className="w-40 bg-gray-100 shadow-xl rounded-xl flex flex-col absolute top-12 -right-4">
                { user && user.email === "hopestella5@gmail.com" && (
                  <Link to={'/admin'}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out">New Item <BsPlus/></p>
                  </Link>
                )}
                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out">Logout <MdLogout/></p>
              </motion.div>
            )
          }
        </div>
      </div>

      {/* Mobile navigation */}
    </header>

  )
}

export default Nav;
