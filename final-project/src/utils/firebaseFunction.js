import { collection, doc, getDocs, orderBy, query, setDoc, } from "firebase/firestore";
import { firestore } from "../firebase.config";
  
// Saving new Item
export const saveItem = async (data) => {
    await setDoc(doc(firestore, "shopProducts", `${Date.now()}`), data, { merge: true, });
};

// getall items
export const getAllShopProducts = async () => {
    const items = await getDocs( query(collection(firestore, "shopProducts"), orderBy("id", "desc")));
    return items.docs.map((doc) => doc.data());
};