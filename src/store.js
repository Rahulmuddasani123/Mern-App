import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Slices/userSlice'
import productReducer from './Slices/productSlice'
import cartReducer from './Slices/cartSlice'
import wishlistReducer from './Slices/wishlistSlice'
export const store=configureStore({
    reducer:{
        user:userReducer,
        product:productReducer,
        cart:cartReducer,
        wishlist:wishlistReducer
    }
})
