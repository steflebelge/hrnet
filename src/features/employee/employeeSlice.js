import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentEmployee: {
        FirstName: null,
        LastName: null,
        StartDate: null,
        Department: null,
        DateofBirth: null,
        Street: null,
        City: null,
        State: null,
        ZipCode: null,
    },
    employees: []
};

const employeeSlice = createSlice({
    name: "employeeSlice",
    initialState: initialState,
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload;
        },
        setFirstName: (state, action) => {
            state.currentEmployee.FirstName = action.payload;
        },
        setLastName: (state, action) => {
            state.currentEmployee.LastName = action.payload;
        },
        setStartDate: (state, action) => {
            state.currentEmployee.StartDate = action.payload;
        },
        setDepartment: (state, action) => {
            state.currentEmployee.Department = action.payload;
        },
        setDateofBirth: (state, action) => {
            state.currentEmployee.DateofBirth = action.payload;
        },
        setStreet: (state, action) => {
            state.currentEmployee.Street = action.payload;
        },
        setCity: (state, action) => {
            state.currentEmployee.City = action.payload;
        },
        setState: (state, action) => {
            state.currentEmployee.State = action.payload;
        },
        setZipCode: (state, action) => {
            state.currentEmployee.ZipCode = action.payload;
        },
        addEmployee: (state, action) => {
            state.employees.push(action.payload.data);
        },
    }
});


export const {
    setFirstName,
    setLastName,
    setStartDate,
    setDepartment,
    setDateofBirth,
    setStreet,
    setCity,
    setEmployees,
    setState,
    setZipCode,
    addEmployee
} = employeeSlice.actions;
export default employeeSlice.reducer;
