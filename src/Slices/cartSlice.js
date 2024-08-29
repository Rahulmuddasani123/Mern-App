import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Add to cart
export const addtocart = createAsyncThunk('cart/addtocart', async (cartObj, thunkAPI) => {
    try {
        let response = await axios.post('/cart/addtocart', cartObj);
        return response.data;
        
        
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

// Remove from cart
export const removefromcart = createAsyncThunk('cart/removefromcart', async (cartObj, thunkAPI) => {
    try {
        let response = await axios.delete('/cart/removefromcart', { data: cartObj });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

// Fetch from cart
export const getfromcart = createAsyncThunk('cart/getfromcart', async (_, thunkAPI) => {
    try {
        let response = await axios.get('/cart/getfromcart');
        return response.data.cartitems
        
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});


// update from cart
export const updatecartitem = createAsyncThunk('cart/updatecartitem', async (updatedCartObj, thunkAPI) => {
    try {
        let response = await axios.put('/cart/updatecartitem',updatedCartObj);
        return response.data.cartitem
        
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addtocart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addtocart.fulfilled, (state, action) => {
                state.cart.push(action.payload);
                state.status = 'success';
                state.error = null;
            })
            .addCase(addtocart.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })
            .addCase(removefromcart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removefromcart.fulfilled, (state, action) => {
                state.cart = state.cart.filter(product => product._id !== action.payload._id);
                state.status = 'success';
                state.error = null;
            })
            .addCase(removefromcart.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })
            .addCase(getfromcart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getfromcart.fulfilled, (state, action) => {
                state.cart = action.payload; 
                state.status = 'success';
                state.error = null;
            })
            .addCase(getfromcart.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })

             .addCase(updatecartitem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatecartitem.fulfilled, (state, action) => {
                // Find the index of the item to be updated
                const index = state.cart.findIndex(product => product._id === action.payload._id);
                if (index !== -1) {
                    state.cart[index] = action.payload; // Update the item in the cart
                }
                state.status = 'success';
                state.error = null;
            })
            .addCase(updatecartitem.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            });
            
    }
});

export default cartSlice.reducer;
