import { NavLink } from "react-router-dom"
import logo from "../../images/logo/drfb.png"

function Logo (){
    return <div className="Logo"><NavLink to={'/'}> <img src={logo}  alt="" /> </NavLink> </div>
}

export default Logo