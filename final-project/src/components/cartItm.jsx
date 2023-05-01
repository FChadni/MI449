import React, {useState, useEffect} from 'react'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
let items = [];

const CartItm = ({item}) => {
    const [qty, setQty] = useState(2);
    const [{cartItems}, dispatch] = useStateValue();

    const cartDispatch = () => {
        localStorage.setItem("cartItems", JSON.stringify(items));
        dispatch({
          type: actionType.SET_CART_ITEMS,
          cartItems: items,
        });
    };

    const updateQty = (action, id) => {
        if (action == "add") {
          setQty(qty + 1);
          cartItems.map((item) => {
            if (item.id === id) { 
                item.qty += 1;
             }
          });
          cartDispatch();
        } else {
          if (qty == 1) {
            items = cartItems.filter((item) => item.id !== id);
            cartDispatch();
          } else {
            setQty(qty - 1);
            cartItems.map((item) => {
              if (item.id === id) { 
                item.qty -= 1;
             }
            });
            cartDispatch();
          }
        }
      };
      useEffect(() => { items = cartItems; }, [qty, items]);

  return (
    <div>
        <table key={item.id} className="table-auto w-full my-4">
            <thead>
                <tr>
                    <th className="py-2 text-left text-lg">Product</th>
                    <th className="py-2 text-left text-lg">Quantity</th>
                    <th className="py-2 text-left text-lg">Subtotal</th> 
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border px-4 py-2">
                        <div className="flex items-center">
                        <img className="w-12 h-12 object-cover rounded" src={item?.imageURL} alt="Product"/>
                        <div className="ml-4">
                            <p className="font-medium">{item?.productTitle}</p>
                            <p className="text-gray-500">$ {item?.price}</p>
                        </div>
                    </div>
                    </td>
                    <td className="border px-4 py-2">
                        <div className="flex items-center">
                            <button className="border rounded-l px-4 py-2 focus:outline-none" onClick={() => updateQty("remove", item?.id)}>-</button>
                            <span className="border-t border-b px-4 py-2">{qty}</span>
                            <button className="border rounded-r px-4 py-2 focus:outline-none" onClick={() => updateQty("add", item?.id)}>+</button>
                        </div>
                    </td>
                    <td className="border px-4 py-2">
                        <p className="font-medium">${item?.price * qty}</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default CartItm
