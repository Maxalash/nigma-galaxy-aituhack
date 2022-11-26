import { createSlice } from '@reduxjs/toolkit'
import { productdata } from '../assets/data'


const productsReducer = createSlice({
  name: 'products',
  initialState: productdata,
  reducers: {
    addProduct(state, action) {
      state.push(action.payload);
    }
  }
})

export const { addProduct } = productsReducer.actions
export default productsReducer.reducer

