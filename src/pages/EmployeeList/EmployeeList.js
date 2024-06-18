import './EmployeeList.scss';
import {useSelector} from "react-redux";

function EmployeeList() {
    const employees = useSelector((state) => state.employeeSlice.employees);
    debugger
    return (
        <div id="EmployeeList">
            <span id="top">
               <div>
                    Show
                <select name="" id="">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                entries
               </div>
                <div>
                    Search : <input type="text"/>
                </div>
            </span>

            <span id="bottom">
                <p>Showing 0 to 0 of 0 entries</p>
                <div>
                    <a href="">Previous</a>
                    <a href="">Next</a>
                </div>
            </span>
        </div>
    );
}

export default EmployeeList;
