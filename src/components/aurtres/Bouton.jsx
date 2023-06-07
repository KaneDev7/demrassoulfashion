import { NavLink } from "react-router-dom"

function Bouton ({text, link, onSubscribe} ){

    const handleClick = ({target})=>{
        if( onSubscribe){
            const inputBox = target.parentElement.parentElement
            const mailContent = inputBox.querySelector('#email').value
            onSubscribe(mailContent)
        }
       
    }
    return <button className="Bouton" onClick={handleClick}> <NavLink to={link}>{text}</NavLink>  </button>
}

export default Bouton