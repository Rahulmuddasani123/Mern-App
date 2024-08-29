import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('/products/getProducts');
    return response.data.products;
});

export const createProducts = createAsyncThunk('products/createProducts', async (productData) => {
    const response = await axios.post('/products/createProduct', productData);
    return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
    const response = await axios.delete(`/products/removeProduct/${productId}`);
    return response.data;
});
  
export const updateProduct = createAsyncThunk('products/updateProduct', async (formData, thunkapi) => {
  try {
    let response = await axios.put('/products/updateProduct', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.product; // Make sure to return the correct data
  } catch (err) {
    return thunkapi.rejectWithValue(err.response.data);
  }
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'success';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createProducts.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product._id !== action.payload._id);
            })

             .addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
              })
            .addCase(updateProduct.fulfilled, (state, action) => {
          state.status = 'succeeded';
          const updatedProduct = action.payload; // Directly access payload
          if (!updatedProduct) {
            console.error("Updated product is undefined");
            return;
          }
          state.products = state.products.map(product =>
            product._id === updatedProduct._id ? updatedProduct : product
          );
        })

      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
    }
});

export default productSlice.reducer;
