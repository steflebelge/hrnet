import './EmployeeList.scss';
import {useDispatch, useSelector} from "react-redux";
import Tableau from "../../components/Tableau";
import {useEffect} from "react";
import {setEmployees} from "../../features/employee/employeeSlice";
import {
    setCurrentPage,
    setMatchingEmployees,
    setNbPageShow,
    setTermeSearch
} from "../../features/research/researchSlice";
import {updatePagination, updateTermeSearch} from "../../utils/thunk";

function EmployeeList() {
    const employees = useSelector((state) => state.employeeSlice.employees);
    const research = useSelector((state) => state.researchSlice);
    const structureTableau = {
        "FirstName": "Firstname",
        "LastName": "Lastname",
        "StartDate": "Start date",
        "Department": "Department",
        "DateofBirth": "Date of birth",
        "Street": "Street",
        "City": "City",
        "State": "State",
        "ZipCode": "Zip code",
    };
    const dispatch = useDispatch();

    useEffect(() => {
        //si pas d employés, on va chercher dans le localStorage
        if (employees.length === 0) {
            dispatch(setEmployees(JSON.parse(localStorage.getItem('employees'))));
            dispatch(setMatchingEmployees(JSON.parse(localStorage.getItem('employees'))));
            dispatch(updatePagination());
        }
    }, []);

    function handleNbPageShowChange(value) {
        dispatch(setNbPageShow(value));
        dispatch(updatePagination());
    }

    function handleTermeSearchChange(value) {
        dispatch(setTermeSearch(value));
        dispatch(updateTermeSearch());
    }

    function handlePagination(newPage) {
        if(newPage > 0
            && newPage <= Math.ceil(research.MatchingEmployees.length / research.NbPageShow)) {
            dispatch(setCurrentPage(newPage));
            dispatch(updatePagination());
        }
    }

    return (
        <div id="EmployeeList">
            <span id="top">
               <div>
                    Show
                <select onChange={(newValue) => handleNbPageShowChange(newValue.target.value)} defaultValue={research.NbPageShow} name="" id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                entries
               </div>
                <div>
                    Search : <input onChange={(newValue) => handleTermeSearchChange(newValue.target.value)} type="text"/>
                </div>
            </span>

            <Tableau
                structureTableau={structureTableau}
            />

            <span id="bottom">
                <p>
                    Showing  {research.DebPage} to {research.FinPage} of {research.NbTotalSearch} entries
                    {research.TermeSearch && research.TermeSearch !== "" && research.MatchingEmployees.length !== employees.length && (
                        ` (filtered from ${employees.length} total entries)`
                    )}
                </p>
                <div>
                    <a onClick={() => handlePagination(research.CurrentPage - 1)}>Previous</a>
                    <button>{research.CurrentPage}</button>
                    <a onClick={() => handlePagination(research.CurrentPage + 1)}>Next</a>
                </div>
            </span>
        </div>
    );
}

export default EmployeeList;
