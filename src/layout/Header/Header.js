import './Header.scss';
import {Link, useLocation} from "react-router-dom";

function Header() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <header id="Header">
            <div
                className={currentPath === "/" ? ("selected") : ("")}
            >
                <Link to="/">Add an employee</Link>
            </div>
            <div
                className={currentPath === "/EmployeeList" ? ("selected") : ("")}
            >
                <Link to="/EmployeeList">List of employees</Link>
            </div>
            <h1>HRNET</h1>
        </header>
    )
}

export default Header;
