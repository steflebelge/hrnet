import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setSortAsc, setSortBy} from "../features/research/researchSlice";

function Tableau({structureTableau}) {
    const research = useSelector((state) => state.researchSlice);
    let keysStructureTableau = Object.keys(structureTableau);
    const dispatch = useDispatch();

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
                                <th key={indexKeys}>{employeeTmp[keyTmp]}</th>
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
