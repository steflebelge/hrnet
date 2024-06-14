import './Home.scss';
import {Link} from "react-router-dom";

function Home() {
    return(
        <div id="Home">
            <Link to="/CreateEmployee">
                <button>➕ <br/><br/>Création d'un employé</button>
            </Link>
            <Link to="/EmployeeList">
                <button>📋 <br/><br/>Liste des employés</button>
            </Link>
        </div>
    );
}

export default Home;
