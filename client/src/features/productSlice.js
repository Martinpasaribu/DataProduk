// pembeliSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Url";

const initialState = {
    product: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}



export const ProductFetch = createAsyncThunk("product/ProductFetch", async(_, thunkAPI) =>{
    try {
        const response = await axios.get(`${BASE_URL}/product`);
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg
            return thunkAPI.rejectWithValue(message);
        }
    }
});


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        resetProduct: (state) => 
            initialState
        
    },
    extraReducers: (builder) => {

            // Get product

            builder.addCase(ProductFetch.pending, (state) => {
                state.isLoading = true;
            });
            builder.addCase(ProductFetch.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload;
            } );
            builder.addCase(ProductFetch.rejected, (state, action) =>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })


    }
});

export const { resetProduct } = productSlice.actions;
export default productSlice.reducer;
