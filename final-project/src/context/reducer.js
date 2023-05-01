export const actionType = {
    SET_USER : 'SET_USER',
    SET_SHOP_PRODUCTS: 'SET_SHOP_PRODUCTS',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const reducer = (state, action) => {
    console.log(action);

    switch(action.type){
        case actionType.SET_USER:
            return {
                ...state,
                user : action.user,
            };

        case actionType.SET_SHOP_PRODUCTS:
            return {
                ...state,
                shopProducts: action.shopProducts,
            }
        
        case actionType.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.cartItems,
            }
            
        default: 
            return state;
    }
};

export default reducer;