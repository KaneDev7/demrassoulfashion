
import { NavLink } from "react-router-dom"
import { capitalizeFirstLetter } from "../../util"

function Sous_categorie_mobile ( {onSousCatLeave,sousCat,link} ){

    const mouseLeave = () =>{
        onSousCatLeave()
    }

    return <ul className='Sous_Categorie_mobile' onMouseLeave={mouseLeave}>
        {
            sousCat.map((cat, i) =>(
                <li key={i} className="sous_cat_iteme_mobile" > <NavLink to={link+'/'+cat} >{capitalizeFirstLetter(cat)}</NavLink>  </li>
            ) )
        }

   </ul>
}

export default Sous_categorie_mobile