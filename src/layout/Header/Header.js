import './Header.scss';
import {Link, useLocation} from "react-router-dom";

function Header() {
    const location = useLocation();
    const currentPath = location.pathname;
    let nomPageActuelle = "Erreur 404";
    switch (currentPath) {
        case "/":
            nomPageActuelle = "Accueil"
            break;
        case "/CreateEmployee":
            nomPageActuelle = "Création d'un employé"
            break;
        case "/EmployeeList":
            nomPageActuelle = "Liste des employés"
            break;
    }

    return (
        <header id="Header">
            <h1>
                {currentPath === "/" ? (
                    "HrNet "
                ) : (
                    <Link to="/">HrNet </Link>
                )}
                - {nomPageActuelle}</h1>
        </header>
    )
}

export default Header;
