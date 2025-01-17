import { createSlice } from "@reduxjs/toolkit";

const initialState={
    items:[]
}

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const product=action.payload;
            const existingProduct=state.items.find(item=>item._id===product._id);
            if(existingProduct){
                existingProduct.quantity+=1;

            }else{
                state.items.push({...product,quantity:1})
            }
        },
        removeFromCart:(state,action)=>{
            state.items=state.items.filter(item=>item._id!==action.payload._id)
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;