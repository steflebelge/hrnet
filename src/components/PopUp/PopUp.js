import "./PopUp.scss";

function PopUp({style, contenu="Employé créé avec succès.", setDisplayPopUp}) {
    function handleClick(elt) {
        if(elt.target.id === "externe")
            setDisplayPopUp(false);
    }

    return (
        <div onClick={(elt) => handleClick(elt)} id="externe" style={style.externe}>
            <div id="interne" style={style.interne}>
                <p id="contenu" style={style.contenu}>{contenu}</p>
            </div>
        </div>
    );
}

export default PopUp;
