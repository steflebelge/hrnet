import {setDebPage, setFinPage, setMatchingEmployees} from "../features/research/researchSlice";

export const updateTermeSearch = () => (dispatch, getState) => {
    const state = getState();
    let listeAllEmployees = state.employeeSlice.employees;
    let newMatchingList = [];

    //recherche dans la liste complete
    listeAllEmployees.forEach(function (employeeTmp) {
        let alreadyAdded = false;
        Object.keys(employeeTmp).forEach(function (attributTmp) {
            if(employeeTmp[attributTmp].toString().includes(state.researchSlice.TermeSearch)
                && !alreadyAdded) {
                newMatchingList.push(employeeTmp);
                alreadyAdded = true;
            }
        });
    });

    //MAJ liste research
    dispatch(setMatchingEmployees(newMatchingList));
    dispatch(updatePagination());
}

export const updatePagination = () => (dispatch, getState) => {
    const researchSlice = getState().researchSlice;

    //set de la fin de page
    researchSlice.NbPageShow * researchSlice.CurrentPage > researchSlice.MatchingEmployees.length
        ? dispatch(setFinPage(researchSlice.MatchingEmployees.length))
        : dispatch(setFinPage(researchSlice.NbPageShow * researchSlice.CurrentPage));

    //dispatch(set du debut de page)
    researchSlice.MatchingEmployees.length === 0
        ? dispatch(setDebPage(0))
        : dispatch(setDebPage(researchSlice.NbPageShow * (researchSlice.CurrentPage - 1 ) + 1));
}
