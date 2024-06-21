import './EmployeeList.scss';
import {useDispatch, useSelector} from "react-redux";
import Tableau from "../../components/Tableau";
import {useEffect, useState} from "react";
import {setEmployees} from "../../features/employee/employeeSlice";

function EmployeeList() {
    const employees = useSelector((state) => state.employeeSlice.employees);
    const [search, setSearch] = useState("");
    const [chiffreUn, setChiffreUn] = useState(0);
    const [chiffreDeux, setChiffreDeux] = useState(0);
    const [chiffreTrois, setChiffreTrois] = useState(employees.length);
    const [nbPageEntries, setNbPageEntries] = useState(10);
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
        }
    }, []);

    useEffect(() => {
        if(chiffreDeux > 0)
            setChiffreUn(1);
        else
            setChiffreUn(0);
        debugger
    }, [chiffreDeux]);
    useEffect(() => {
        setChiffreTrois(employees.length);
    }, [employees]);

    return (
        <div id="EmployeeList">
            <span id="top">
               <div>
                    Show
                <select onChange={(newValue) => setNbPageEntries(newValue.target.value)} defaultValue={nbPageEntries} name="" id="">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                entries
               </div>
                <div>
                    Search : <input onChange={(newValue) => setSearch(newValue.target.value)} type="text"/>
                </div>
            </span>

            <Tableau
                structureTableau={structureTableau}
                search={search}
                nbPageEntries={nbPageEntries}
                setChiffreUn={setChiffreUn}
                setChiffreDeux={setChiffreDeux}
            />

            <span id="bottom">
                <p>
                    Showing  {chiffreUn} to {chiffreDeux} of {chiffreTrois} entries
                    {search && search !== "" && chiffreTrois !== employees.length && (
                        ` (filtered from ${employees.length} total entries)`
                    )}
                </p>
                <div>
                    <a>Previous</a>
                    <button></button>
                    <a>Next</a>
                </div>
            </span>
        </div>
    );
}

export default EmployeeList;
