import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../features/employee/employeeSlice';

const store = configureStore({
    reducer: {
        employeeSlice: employeeReducer
    }
});

export default store;
