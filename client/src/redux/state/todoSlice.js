import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        value: 0
    },
    reducers: {
        addtodo: (state, action) =>{
            state.value = action.payload
        }
    }
})


export const  {addtodo} = todoSlice.actions
export default  todoSlice.reducer