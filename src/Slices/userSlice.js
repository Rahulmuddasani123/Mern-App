import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../Constants';

// Create an async thunk for handling user login
export const userLogin = createAsyncThunk('loginuser', async (userCredentialsObj, thunkapi) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userCredentialsObj);
    let data = response.data;
    
    if (data.Message === 'success') {
      localStorage.setItem('token', data.payload); // Store the JWT token in localStorage
      localStorage.setItem('userObj', JSON.stringify(data.userObj)); // Store the user object in localStorage
      return data.userObj; // Return the user object to be set in the state
    }

    return thunkapi.rejectWithValue(data.Message);
  } catch (error) {
    return thunkapi.rejectWithValue('Login failed');
  }
});


export const fetchusers=createAsyncThunk('users/getUsers',async()=>{
  let response = await axios.get(`${API_URL}/users/getUsers`);
  console.log(response)
  return response.data.users
})

export const deleteUser = createAsyncThunk('users/removeUser', async (userId) => {
    const response = await axios.delete(`${API_URL}/users/removeUser/${userId}`);
    return response.data;
});



// update from cart
export const updateUser = createAsyncThunk('users/updateUser', async (updatedUserObj, thunkAPI) => {
    try {
        let response = await axios.put(`${API_URL}/cart/updatecartitem`,updatedUserObj);
        return response.data.updatedUser
        
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});



// Create a slice for user state management
let userSlice = createSlice({
  name: 'user',
  initialState: {
    userObj: JSON.parse(localStorage.getItem('userObj')) || null,
    user_details:[],
    isPending: false,
    isRejected: false,
    isSuccess: !!localStorage.getItem('userObj'),
    errmsg: ''
  },
  reducers: {
    clearLoginStatus: (state) => {
      state.isPending = false;
      state.isSuccess = false;
      state.errmsg = '';
      state.userObj = [];
      localStorage.removeItem('token');
      localStorage.removeItem('userObj');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isPending = true;
        state.isRejected = false;
        state.isSuccess = false;
        state.errmsg = '';
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isPending = false;
        state.isRejected = false;
        state.userObj = action.payload;
        state.errmsg = '';
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isRejected = true;
        state.isPending = false;
        state.isSuccess = false;
        state.errmsg = action.payload;
      })

      .addCase(fetchusers.pending, (state) => {
        state.isPending = true;
        state.isRejected = false;
        state.isSuccess = false;
        state.errmsg = '';
      })
      .addCase(fetchusers.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isPending = false;
        state.isRejected = false;
        state.user_details=(action.payload);
        state.errmsg = '';
      })
      .addCase(fetchusers.rejected, (state, action) => {
        state.isRejected = true;
        state.isPending = false;
        state.isSuccess = false;
        state.errmsg = action.payload;
      })

      .addCase(deleteUser.pending, (state) => {
  state.isPending = true;
  state.isRejected = false;
  state.isSuccess = false;
  state.errmsg = '';
})
.addCase(deleteUser.fulfilled, (state, action) => {
  state.isSuccess = true;
  state.isPending = false;
  state.isRejected = false;
  // Assuming action.payload contains the ID of the removed user
  state.user_details = state.user_details.filter(user => user._id !== action.payload._id);
  state.errmsg = '';
})
.addCase(deleteUser.rejected, (state, action) => {
  state.isRejected = true;
  state.isPending = false;
  state.isSuccess = false;
  state.errmsg = action.payload;
})

  }
});

export const { clearLoginStatus } = userSlice.actions;

export default userSlice.reducer;
