import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { cat_vetement, cat_chaussurre, cat_sac_accessoire } from '../../cat_db/cat_db_arr'
import Sous_categorie_mobile from "./Sous_categorie_mobile";


function Nav_mobile({onShowMenuMobile}) {

    const [category, setCategorie] = useState({
        vetements: false,
        chaussures: false,
        sacs_accessoirs: false,
    })
    
    const handleClick = ()=>{
        // désactivation de la visiblité du menu pour les mobiles 
        onShowMenuMobile(false)
    }

    const handleMouseEnter = (e) => {
     // recupèration de l'id correspondant au nom du produit (proprieté de l'objet state)
        const { id } = e.target

    //Réinitialisation de tous les proprietés du state
        let state = {
            vetements: false,
            chaussures: false,
            sacs_accessoirs: false,
        }

    // nouvel objet avec l'id target comme proprieté
        const targetActif = { [id]: true }

    // fusion de l'obj du state et le nouvel obj targetActif 
        let newState = Object.assign({ ...state }, targetActif)
        setCategorie(newState)
    }

    // le procedure opposé du foncton handleMouseEnter
    const handleMouseLeave = (e) => {
        const { id } = e.target
        setCategorie(state => Object.assign({ ...state }, { [id]: false }))
    }

    // fermeture du menu deroulant lorsqu'on sorte du menu
    const onSousCatLeave = () => {
        let state = {
            vetements: false,
            chaussures: false,
            sacs_accessoirs: false,
        }
        setCategorie(state)
    }

    return <div className="Nav_mobile">
    <span className='close' onClick={handleClick}><i class="fa-solid fa-x"></i></span>
    <ul>
        <li>
            <NavLink to={'/'} >Accueil</NavLink>
        </li>

       <li>
          <NavLink to={'/NewProducts/vetement'} className={({ isActive }) => isActive ? 'navActive' : ''} >Nouvelles arrivages</NavLink>
      </li>

        <li onMouseLeave={handleMouseLeave} id='vetements'  >
            <a id='vetements' onMouseEnter={handleMouseEnter}>
                 Vetements
                 {
                category.vetements ? 
                <i class="fa-solid fa-chevron-up"></i> : 
                <i class="fa-solid fa-chevron-down"></i>
                 }
                </a>
            {
               category.vetements &&
                <Sous_categorie_mobile
                    onSousCatLeave={onSousCatLeave}
                    sousCat={cat_vetement}
                    link='/Vetements'

                />
            }
        </li>

        <li onMouseLeave={handleMouseLeave} id='chaussures'>
            <a id='chaussures' onMouseEnter={handleMouseEnter} >
                Chaussures
                {
                category.chaussures ? 
                <i class="fa-solid fa-chevron-up"></i> : 
                <i class="fa-solid fa-chevron-down"></i>
                 }
                </a>

            {
                category.chaussures &&
                <Sous_categorie_mobile onSousCatLeave={onSousCatLeave}
                    sousCat={cat_chaussurre}
                    link='/Chaussures'
                />
            }
        </li>


        <li onMouseLeave={handleMouseLeave} id='sacs_accessoirs'>
            <a id='sacs_accessoirs' onMouseEnter={handleMouseEnter} >
                Sacs & Accessoires
                {
                category.sacs_accessoirs ? 
                <i class="fa-solid fa-chevron-up"></i> : 
                <i class="fa-solid fa-chevron-down"></i>
                 }
                </a>

            {
                category.sacs_accessoirs &&
                <Sous_categorie_mobile
                    onSousCatLeave={onSousCatLeave}
                    sousCat={cat_sac_accessoire}
                    link='/Sacs_accessoires'

                />
            }

        </li>
    </ul>
</div>
    
}


export default Nav_mobile