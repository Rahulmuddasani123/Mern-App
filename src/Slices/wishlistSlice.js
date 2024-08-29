import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Add to wishlist
export const addtowishlist = createAsyncThunk('wishlist/addtowishlist', async (wishlistObj, thunkAPI) => {
    try {
        let response = await axios.post('/wishlist/addtowishlist', wishlistObj);
        return response.data;
        
        
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

// Remove from wishlist
export const removefromwishlist = createAsyncThunk('wishlist/removefromwishlist', async (wishlistObj, thunkAPI) => {
    try {
        let response = await axios.delete('/wishlist/removefromwishlist', { data: wishlistObj });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

// Fetch from wishlist
export const getfromwishlist = createAsyncThunk('wishlist/getfromwishlist', async (_, thunkAPI) => {
    try {
        let response = await axios.get('/wishlist/getfromwishlist');
        return response.data.wishlistitems
        
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});



const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlist: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addtowishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addtowishlist.fulfilled, (state, action) => {
                state.wishlist.push(action.payload);
                state.status = 'success';
                state.error = null;
            })
            .addCase(addtowishlist.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })
            .addCase(removefromwishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removefromwishlist.fulfilled, (state, action) => {
                state.wishlist = state.wishlist.filter(product => product._id !== action.payload._id);
                state.status = 'success';
                state.error = null;
            })
            .addCase(removefromwishlist.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })
            .addCase(getfromwishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getfromwishlist.fulfilled, (state, action) => {
                state.wishlist = action.payload; 
                state.status = 'success';
                state.error = null;
            })
            .addCase(getfromwishlist.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })
 
            
    }
});

export default wishlistSlice.reducer;
