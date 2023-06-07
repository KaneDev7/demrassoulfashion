import { NavLink } from "react-router-dom"
import { capitalizeFirstLetter } from "../../util"

function Card_collection ( {image, category, type } ){

    return <div className="Card_collection">
        <div className="bg_transp"></div>
        <img src={image} alt="" />
        <NavLink to={category}>
        <button className="goToCat">
            <span className="cat_name"> {capitalizeFirstLetter(type)} </span>
            <span className="icon"> <i className="fa-solid fa-arrow-right"></i> </span>
        </button>
        </NavLink>

    </div>
}

export default Card_collection