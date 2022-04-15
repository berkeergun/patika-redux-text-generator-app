import { createSlice } from "@reduxjs/toolkit";

export const textSlice = createSlice({
    name:"text",
    initialState:{
        value:2,
        includeHTML:"false",
    },
    reducers:{
        changeText:(state,action) => {
            state.value = action.payload
        },
        changeIncludeHTML:(state,action) => {
            state.includeHTML = action.payload
        },
    }
})

export const { changeText, changeIncludeHTML } = textSlice.actions;
export default textSlice.reducer