import './EmployeeList.scss';
import {useDispatch, useSelector} from "react-redux";
import Tableau from "../../components/Tableau/Tableau";
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
    const nbTotalPages = Math.ceil(research.MatchingEmployees.length / research.NbPageShow);
    const dispatch = useDispatch();

    useEffect(() => {
        //si pas d employés, on va chercher dans le localStorage
        if (employees && employees.length === 0) {
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
        if (newPage > 0 && newPage <= nbTotalPages) {
            dispatch(setCurrentPage(newPage));
            dispatch(updatePagination());
        }
    }

    return (
        <div id="EmployeeList" className="content">
            <span id="top">
               <div>
                    Show
                <select onChange={(newValue) => handleNbPageShowChange(newValue.target.value)}
                        defaultValue={research.NbPageShow} name="" id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                entries
               </div>
                <div>
                    Search : <input onChange={(newValue) => handleTermeSearchChange(newValue.target.value)}
                                    type="text"/>
                </div>
            </span>

            <Tableau/>

            <span id="bottom">
                <p>
                    Showing {research.DebPage} to {research.FinPage} of {research.NbTotalSearch} entries
                    {research.TermeSearch && research.TermeSearch !== "" && research.MatchingEmployees.length !== employees.length && (
                        ` (filtered from ${employees.length} total entries)`
                    )}
                </p>
                <div>
                    <a className={research.CurrentPage > 1 ? 'clickable' : undefined}
                       onClick={() => handlePagination(research.CurrentPage - 1)}>Previous</a>

                    {Array.from({length: nbTotalPages}, (_, index) => (
                        research.CurrentPage === index + 1 ? (
                            <button key={index + 1} className="current">{index + 1}</button>
                        ) : (
                            <button onClick={() => handlePagination(index + 1)} key={index + 1}>{index + 1}</button>
                        )
                    ))}

                    <a className={research.CurrentPage < nbTotalPages ? 'clickable' : undefined}
                       onClick={() => handlePagination(research.CurrentPage + 1)}>Next</a>
                </div>
            </span>
        </div>
    );
}

export default EmployeeList;
