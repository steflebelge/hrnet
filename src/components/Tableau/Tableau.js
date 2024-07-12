import './Tableau.scss';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setMatchingEmployees, setSortAsc, setSortBy} from "../../features/research/researchSlice";
import {setEmployees} from "../../features/employee/employeeSlice";
import {updatePagination} from "../../utils/thunk";

function Tableau() {
    const research = useSelector((state) => state.researchSlice);
    const dispatch = useDispatch();
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
    let keysStructureTableau = Object.keys(structureTableau);


    function handleChangeSort(keyTri) {
        //verif de la keyTri
        if (research.SortBy === keyTri) {
            dispatch(setSortAsc(!research.SortAsc));
        } else {
            dispatch(setSortBy(keyTri));
            dispatch(setSortAsc(true));
        }
    }

    //sur changement du tri
    useEffect(() => {
        //maj des fleches HTML
        document.querySelectorAll('th.arrows').forEach(function (thTmp) {
            if (!thTmp.classList.contains('arrowTop'))
                thTmp.classList.add('arrowTop')
            if (!thTmp.classList.contains('arrowDown'))
                thTmp.classList.add('arrowDown')
        });
        //on enleve la bonne fleche a l element concerné par le nouveau tri
        document.getElementById(research.SortBy).classList.remove(research.SortAsc ? "arrowDown" : "arrowTop");
    }, [research.SortBy, research.SortAsc]);


    useEffect(() => {
        //si pas d employés, on va chercher dans le localStorage
        if (research.MatchingEmployees.length === 0) {
            dispatch(setEmployees(JSON.parse(localStorage.getItem('employees'))));
            dispatch(setMatchingEmployees(JSON.parse(localStorage.getItem('employees'))));
            dispatch(updatePagination());
        }
    }, []);

    return (
        <table>
            <thead>
            <tr id="trHead">
                {
                    keysStructureTableau.map((keyTmp, index) => (
                        <th className="arrows arrowTop arrowDown" onClick={() => handleChangeSort(keyTmp)} id={keyTmp}
                            key={index}>{structureTableau[keyTmp]}</th>
                    ))
                }
            </tr>
            </thead>
            <tbody>
            {research.MatchingEmployees.length > 0 ? (
                research.MatchingEmployees.map((employeeTmp, indexEmployees) => (
                    indexEmployees >= research.DebPage - 1
                    && indexEmployees < research.FinPage
                    && (
                        <tr key={indexEmployees}>
                            {keysStructureTableau.map((keyTmp, indexKeys) => (
                                <th title={employeeTmp[keyTmp]} key={indexKeys}>{employeeTmp[keyTmp]}</th>
                            ))}
                        </tr>
                    )
                ))
            ) : (
                <tr>
                    <th colSpan={keysStructureTableau.length}>No data available in table</th>
                </tr>
            )}
            </tbody>
        </table>
    );
}

export default Tableau;
