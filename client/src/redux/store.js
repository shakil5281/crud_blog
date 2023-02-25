import { configureStore } from "@reduxjs/toolkit";
import todoreduser from './state/todoSlice'
import { addtodo } from "./state/todoSlice";


const store  = configureStore({
    reducer: {
        todoapp: todoreduser
    }
})


export {
    store,
    addtodo
}

