
import { NavLink } from "react-router-dom"
import { capitalizeFirstLetter } from "../../util"

function Sous_categorie ( {onSousCatLeave,sousCat,link} ){

    const mouseLeave = () =>{
        onSousCatLeave()
    }
  
    return <ul className='Sous_Categorie' onMouseLeave={mouseLeave}>
        {
            sousCat.map((cat, i) =>(
                <li key={i} className="sous_cat_iteme" > <NavLink to={link+'/'+cat} >{capitalizeFirstLetter(cat)}</NavLink>  </li>
            ))
        }

   </ul>
}

export default Sous_categorie