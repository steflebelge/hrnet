import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    TermeSearch: "",
    NbPageShow: 5,
    CurrentPage: 1,
    DebPage: 0,
    FinPage: 0,
    NbTotalSearch: 0,
    SortBy: "FirstName",
    SortAsc: true,
    MatchingEmployees: [],
};


const researchSlice = createSlice({
    name: "researchSlice",
    initialState: initialState,
    reducers: {
        setTermeSearch: (state, action) => {
            state.TermeSearch = action.payload;
        },
        setNbPageShow: (state, action) => {
            state.NbPageShow = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.CurrentPage = action.payload;
        },
        setDebPage: (state, action) => {
            state.DebPage = action.payload;
        },
        setFinPage: (state, action) => {
            state.FinPage = action.payload;
        },
        setNbTotalSearch: (state, action) => {
            state.NbTotalSearch = action.payload;
        },
        setSortBy: (state, action) => {
            state.SortBy = action.payload;
            state.MatchingEmployees = sortEmployees(state.MatchingEmployees, state.SortBy, state.SortAsc);
        },
        setSortAsc: (state, action) => {
            state.SortAsc = action.payload;
            state.MatchingEmployees = sortEmployees(state.MatchingEmployees, state.SortBy, state.SortAsc);
        },
        setMatchingEmployees: (state, action) => {
            state.MatchingEmployees = sortEmployees(action.payload, state.SortBy, state.SortAsc);
            state.NbTotalSearch = action.payload.length;
        },
    }
});

function sortEmployees(employeesListe, SortBy, SortAsc) {
    return employeesListe.sort((a, b) => {
        if (a[SortBy] < b[SortBy]) return (SortAsc ? -1 : 1);
        if (a[SortBy] > b[SortBy]) return (SortAsc ? 1 : -1);
        return 0;
    });
}

export const {
    setTermeSearch,
    setNbPageShow,
    setCurrentPage,
    setDebPage,
    setFinPage,
    setNbTotalSearch,
    setSortBy,
    setSortAsc,
    setMatchingEmployees,
} = researchSlice.actions;

export default researchSlice.reducer;
