import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import researchSlice from "../features/research/researchSlice";
import employeeSlice from "../features/employee/employeeSlice";

const store = configureStore({
    reducer: {
        employeeSlice: employeeSlice,
        researchSlice: researchSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
