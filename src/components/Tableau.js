import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

function Tableau({structureTableau, search, nbEntries}) {
    const [sortBy, setSortBy] = useState("FirstName");
    const [sortAsc, setSortAsc] = useState(true);
    const [employees, setEmployees] = useState(useSelector((state) => state.employeeSlice.employees));
    const [keysEmployees, setKeysEmployees] = useState([]);
    let keysStructure = Object.keys(structureTableau);

    function handleChangeSort(keyTri) {
        //verif de la keyTri
        if (sortBy === keyTri) {
            setSortAsc(!sortAsc);
            document.getElementById(keyTri).classList.toggle("arrowTop");
            document.getElementById(keyTri).classList.toggle("arrowDown");
        } else {
            //recuperation du th de thead concerncé
            let concernedElt = document.getElementById(keyTri);

            //set du sortBy
            setSortBy(keyTri);
            setSortAsc(true);

            //maj des fleches HTML
            document.querySelectorAll('th.arrows').forEach(function (thTmp) {
                if (!thTmp.classList.contains('arrowTop'))
                    thTmp.classList.add('arrowTop')
                if (!thTmp.classList.contains('arrowDown'))
                    thTmp.classList.add('arrowDown')
            });

            document.getElementById(keyTri).classList.remove("arrowDown");
        }
    }

    function sortEmployees(employeesListe) {
        return employeesListe.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return (sortAsc ? -1 : 1);
            if (a[sortBy] > b[sortBy]) return (sortAsc ? 1 : -1);
            return 0;
        });
    }

    useEffect(() => {
        if (employees.length > 0) {
            setEmployees(sortEmployees(employees));
            setKeysEmployees(Object.keys(sortEmployees(employees)));
        } else {
            document.getElementById("FirstName").classList.remove('arrowDown');
            setEmployees(sortEmployees(JSON.parse(localStorage.getItem('employees'))));
            setKeysEmployees(Object.keys(sortEmployees(JSON.parse(localStorage.getItem('employees')))));
        }
    }, [sortAsc, sortBy]);
    useEffect(() => {
        if (search !== undefined) {
            if (search !== "") {
                document.querySelectorAll('tr:not([id])').forEach(function (ligneTmp) {
                    if (!ligneTmp.innerText.toLowerCase().includes(search.toLowerCase().trim()))
                        ligneTmp.classList.add('dispNone');
                    else if (ligneTmp.classList.contains('dispNone'))
                        ligneTmp.classList.remove('dispNone');
                });
            } else {
                document.querySelectorAll('tr:not([id])').forEach(function (ligneTmp) {
                    ligneTmp.classList.remove('dispNone');
                });
            }
        }
    }, [search]);
    useEffect(() => {
        if(document.querySelectorAll('tr:not([id]):not(.dispNone)').length > nbEntries){
            debugger
        }
    }, [nbEntries]);

    return (
        <table>
            <thead>
            <tr id="trHead">
                {
                    keysStructure.map((keyTmp, index) => (
                        <th className="arrows arrowTop arrowDown" onClick={() => handleChangeSort(keyTmp)} id={keyTmp}
                            key={index}>{structureTableau[keyTmp]}</th>
                    ))
                }
            </tr>
            </thead>
            <tbody>
            {keysEmployees.length > 0 ? (
                keysEmployees.map((employeeTmp, indexEmployees) => (
                    <tr key={indexEmployees}>
                        {keysStructure.map((keyTmp, indexKeys) => (
                            <th key={indexKeys}>{employees[employeeTmp][keyTmp]}</th>
                        ))}
                    </tr>
                ))
            ) : (
                <tr>
                    <th colSpan={keysStructure.length}>No data available in table</th>
                </tr>
            )}
            </tbody>
        </table>
    );
}

export default Tableau;
