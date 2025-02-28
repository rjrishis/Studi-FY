import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer"
import profileReducer from "./reducers/profileReducer";
import cartReducer from "./reducers/cartReducer";
import courseReducer from "./reducers/courseReducer";
import viewCourseReducer from "./reducers/viewCourse";
export const store = configureStore({
    reducer:{
        auth : authReducer,
        profile : profileReducer,
        cart : cartReducer,
        course : courseReducer,
        viewCourse : viewCourseReducer
    },
})