import React, { useState } from 'react';
import { motion } from "framer-motion";
// import { productTypes } from '../utils/data';
import Loader from './loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable, } from "firebase/storage";
import { storage } from '../firebase.config';
import { getAllShopProducts, saveItem } from "../utils/firebaseFunction";
// import { async } from '@firebase/util';
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";


const Admin = () => {
  const [{ shopProducts }, dispatch] = useStateValue();

  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  // const [productType, setProductType] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [productMsg, setProductMsg] = useState(null);
  const [productFiends, setProductFiends] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productStatus, setProductStatus] = useState("danger");

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    console.log(imageFile);
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on('state_changed', 
    (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(uploadProgress);
    },
    (error) => {
      console.log(error);
        setProductFiends(true);
        setProductMsg("Error while uploading : Try AGain");
        setProductStatus("danger");
        setTimeout(() => { setProductFiends(false); setIsLoading(false);}, 4000);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProductImage(downloadURL);
        setIsLoading(false);
        setProductFiends(true);
        setProductMsg("Image uploaded successfully");
        setProductStatus("success");
        setTimeout(() => {setProductFiends(false);}, 4000);
      });
    }
    );
  };

  const deleteImage = () => {

    setIsLoading(true);
    const deleteRef = ref(storage, productImage);
    deleteObject(deleteRef).then(() => {
      setProductImage(null);
      setIsLoading(false);
      setProductFiends(true);
      setProductMsg("Image deleted successfully 😊");
      setProductStatus("success");
      setTimeout(() => {setProductFiends(false);}, 4000);
    });
  }

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!productTitle || !productImage || !productPrice || !productDescription) {
        setProductFiends(true);
        setProductDescription("Required fields can't be empty");
        setProductMsg("danger");
        setTimeout(() => { setProductFiends(false); setIsLoading(false); }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          productTitle: productTitle,
          imageURL: productImage,
          qty: 1,
          price: productPrice,
          desc: productDescription,
        };
        saveItem(data);
        setIsLoading(false);
        setProductFiends(true);
        setProductMsg("Data Uploaded successfully");
        setProductStatus("success");
        setTimeout(() => {setProductFiends(false);}, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setProductFiends(true);
      setProductMsg("Error while uploading : Try AGain 🙇");
      setProductStatus("danger");
      setTimeout(() => {setProductFiends(false); setIsLoading(false);}, 4000);
    }
    fetchData();
  }

  const clearData = () => {
    setProductTitle("");
    setProductImage(null);
    setProductDescription("");
    setProductPrice("");
  }

  const fetchData = async () => {
    await getAllShopProducts().then(data => {
      dispatch({
        type: actionType.SET_SHOP_PRODUCTS,
        shopProducts : data
      })
      console.log(data);
    })
  }

  return (
    <div className="w-full h-auto p-4 flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col gap-4">
        {productFiends && (
          <motion.p 
            initial={{opacity : 0 }} animate={{opacity : 1 }} exit={{opacity : 0 }}
            className={`w-full p-2 rounded-lg text-center ${productStatus === "danger" ? "bg-red-100 text-red-900" : "bg-green-100 text-green-800"}`}>
            {productMsg}
          </motion.p>
        )}

        {/* product name */}
        <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
          <input 
            type='text' 
            required 
            value={productTitle} 
            onChange={(e) => setProductTitle(e.target.value)}
            placeholder='Product Title' 
            className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-20 text-black-100'
          />
        </div>

        {/* product price */}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <input type="text" required value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="Price"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        {/* product description */}
        <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
          <input 
            type='text' 
            required 
            value={productDescription} 
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder='Product Description' 
            className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-20 text-black-100'
          />
        </div>

        {/* product image */}
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {isLoading ? (<Loader/> ):( <>
              {!productImage ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <p className="text-gray-500 hover:text-gray-700">
                        Upload Product Image
                      </p>
                    </div>
                    <input type="file" name="uploadimage" accept="image/*" onChange={uploadImage} className="w-0 h-0"/>
                  </label>
                </>
               ) : ( 
                <>
                  <div className="relative h-full">
                    <img src={productImage} alt="uploaded image" className="w-full h-full object-cover"/>
                    <button type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}>Delete</button>
                  </div>
                </>)}
          </>)}
        </div>

        {/* product save button */}
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  )
}

export default Admin
