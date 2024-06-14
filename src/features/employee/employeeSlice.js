import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    "FirstName": null,
    "LastName": null,
    "StartDate": null,
    "Department": null,
    "DateofBirth": null,
    "Street": null,
    "City": null,
    "State": null,
    "ZipCode": null,
};

const employeeSlice = createSlice({
    name: "employee",
    initialState: initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.FirstName = action.payload;
        },
        setLastName: (state, action) => {
            state.LastName = action.payload;
        },
        setStartDate: (state, action) => {
            state.StartDate = action.payload;
        },
        setDepartment: (state, action) => {
            state.Department = action.payload;
        },
        setDateofBirth: (state, action) => {
            state.DateofBirth = action.payload;
        },
        setStreet: (state, action) => {
            state.Street = action.payload;
        },
        setCity: (state, action) => {
            state.City = action.payload;
        },
        setState: (state, action) => {
            state.State = action.payload;
        },
        setZipCode: (state, action) => {
            state.ZipCode = action.payload;
        },
    }
});


export const {setFirstName, setLastName, setStartDate, setDepartment, setDateofBirth, setStreet, setCity, setState, setZipCode } = employeeSlice.actions;
export default employeeSlice.reducer;
