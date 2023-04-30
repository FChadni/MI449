export const actionType = {
    SET_USER : 'SET_USER',
    SET_SHOP_PRODUCTS: 'SET_SHOP_PRODUCTS',
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
            
        default: 
            return state;
    }
};

export default reducer;