import "./PopUp.scss";

function PopUp({contenu="Employee added successfully.", setDisplayPopUp}) {
    function handleClick(elt) {
        if(elt.target.id === "externe")
            setDisplayPopUp(false);
    }

    const style = {
        externe: {
            "backgroundColor": "#808080c7",
        },
        interne: {
            "backgroundColor": "white",
        },
        contenu: {
            "color": "green",
        }
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
