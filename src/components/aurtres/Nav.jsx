
import { NavLink } from 'react-router-dom'
import Sous_categorie from './Sous_categorie'
import { useEffect, useState } from 'react'
import { cat_vetement, cat_chaussurre, cat_sac_accessoire } from '../../cat_db/cat_db_arr'
import Search from './Search'
import axios from 'axios'
import { getUniqueProductArr } from '../../util'
import Nav_mobile from './Nav_mobile'

function Nav({ deffaulClasse, storageState }) {

    const [allProducts, setAllProduct] = useState([]) //l'état qui gère la recherche des produits
    const [isSearchBoxVisble, setSearchBoxVisible] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [showMenuMobile, setShowMenuMobile] = useState(false) // l'état qui gère  la visiblité du menu pour les mobiles 
    const [category, setCategorie] = useState({
        vetements: false,
        chaussures: false,
        sacs_accessoirs: false,
    })

    useEffect(() => {
        if (window.matchMedia("(min-width: 1050px)").matches) {
            // activation de la version mobile
            setIsMobile(true)
        } else {
            // désactivation de la version mobile
            setIsMobile(false)
        }
    }, [])


    const handleMenuMobileClicked = () => {
        // activatoin de la visiblité du menu pour les mobiles 
        setShowMenuMobile(true)
    }

    const onShowMenuMobile = (value) => {
        // activation / désactivation de la visiblité du menu pour les mobiles 
        setShowMenuMobile(value)
    }

    // foncton pour faire une recherche de produit 
    const onTextChange = (value) => {
        async function fetchTablesData() {
            try {
                // recupératon de tous les produts de vetements
                const response1 = await axios.get('http://localhost:3001/collection/article_vetement');
                let data1 = getUniqueProductArr(response1.data, 'nom'); 

                // recupératon de tous les produts de chaussures
                const response2 = await axios.get('http://localhost:3001/collection/article_chaussures');
                let data2 = getUniqueProductArr(response2.data, 'nom'); 

                // recupératon de tous les produts de sacs et d'accessoires
                const response3 = await axios.get('http://localhost:3001/collection/article_sacs_accessoires');
                let data3 = getUniqueProductArr(response3.data, 'nom'); 

                // fusion des tableaux de produit
                const tablesData = [...data1, ...data2, ...data3];

                // resultats de la recherche en cours
                const searchResults = tablesData.filter(p => {
                    // recherche par categorie, nom et description des produits
                    if (value.trim() !== '' &&
                        (p['categorie'].includes(value) || p['nom'].includes(value) || p['description'].includes(value))
                    ) {
                        return p['categorie'].includes(value) || p['nom'].includes(value) || p['description'].includes(value)

                    } else {
                        // si la recherche ne correspond pas on cache le conteneur des resultats de la recherche
                        // et on vide l'état qui gère la recherche de produits
                        setSearchBoxVisible(false)
                        setAllProduct([])
                    }
                })

                setSearchBoxVisible(true)
                searchResults.length > 0 ? setSearchBoxVisible(true) : setSearchBoxVisible(false)
                setAllProduct(searchResults)


            } catch (error) {
                console.error(error);
            }
        }
        fetchTablesData()      
    }

    // Fermeture du conteneur des resultats de la recherche lorsqu'on click ailleurs 
    isSearchBoxVisble && document.addEventListener('click',closeSearchBox)
   
    function closeSearchBox  ({ target }){

        // verification des elements qui sont dans le conteneur 
         if(target.className !== 'search_item' && 
           target.className !== 'search_product_text' &&
           target.className !== 'serach_box'&&
           target.className !== 'searCheInput' 
           ){
            setSearchBoxVisible(false)
            setAllProduct([])
            document.removeEventListener('click',closeSearchBox)
           }
    }
   
    
    window.addEventListener('resize', () => {
        if (window.matchMedia("(min-width: 1050px)").matches) {
        // activatoin de la visiblité du menu pour les mobiles 
            setIsMobile(true)
        } else {
        // désactivatoin de la visiblité du menu pour les mobiles 
            setIsMobile(false)
        }
    })

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
        let newState = Object.assign({ ...state },targetActif )
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

    return <nav className="Nav">
        {showMenuMobile && <Nav_mobile onShowMenuMobile={onShowMenuMobile} />}
        {isMobile ?
            <div className="nav_content">
                <ul>
                    <li>
                        <NavLink to={'/'} className={({ isActive }) => isActive ? 'navActive' : ''} >Accueil</NavLink>
                    </li>

                    <li>
                        <NavLink to={'/NewProducts/vetement'} className={deffaulClasse === 'derniers_arrivages' ? 'navActive' : ''}>Nouvelles arrivages</NavLink>
                    </li>

                    <li onMouseLeave={handleMouseLeave} id='vetements'  >
                        <a id='vetements' onMouseEnter={handleMouseEnter} className={deffaulClasse === 'vetement_actif' ? 'navActive' : ''}> Vetements</a>
                        {
                            category.vetements &&
                            <Sous_categorie
                                onSousCatLeave={onSousCatLeave}
                                sousCat={cat_vetement} 
                                link='/Vetements'

                            />
                        }
                    </li>

                    <li onMouseLeave={handleMouseLeave} id='chaussures'>
                        <a id='chaussures' onMouseEnter={handleMouseEnter} className={deffaulClasse === 'chaussure_actif' ? 'navActive' : ''} >Chaussures</a>

                        {
                            category.chaussures &&
                            <Sous_categorie onSousCatLeave={onSousCatLeave}
                                sousCat={cat_chaussurre}
                                link='/Chaussures'
                            />
                        }
                    </li>


                    <li onMouseLeave={handleMouseLeave} id='sacs_accessoirs'>
                        <a id='sacs_accessoirs' onMouseEnter={handleMouseEnter} className={deffaulClasse === 'sacs_accessoires_actif' ? 'navActive' : ''} >Sacs & Accessoires</a>

                        {
                            category.sacs_accessoirs &&
                            <Sous_categorie
                                onSousCatLeave={onSousCatLeave}
                                sousCat={cat_sac_accessoire}
                                link='/Sacs_accessoires'

                            />
                        }

                    </li>
                </ul>
            </div> :
            <span onClick={handleMenuMobileClicked}><i className="fa-solid fa-bars"></i></span>
        }

        <div className="nav_right">
            <Search onTextChange={onTextChange} placeholder='Recherche' />
            {isSearchBoxVisble &&
                <div className="serach_box">

                    <div className="search_box_container">
                        <div className="search_box_content">
                            {
                                allProducts.map(p => (
                                    <div className="search_item">
                                        <div className="search_product_image"><img src={require('../../images/' + p.imgSrc)} alt="" /></div>
                                        <div className="search_product_text">
                                            <NavLink to={`/ProductDetail/${p.nom}/${p.imgSrc}/${p.description}/${p.prix}/${p.taille}/${p.categorie}/${(p.categorie.toLowerCase() === 'combinaison' ||
                                                p.categorie.toLowerCase() === 'enssemble' ||
                                                p.categorie.toLowerCase() === 'traditionel' ||
                                                p.categorie.toLowerCase() === 'robe'
                                            ) ? 'article_vetement' :
                                                (p.categorie.toLowerCase() === 'sandale' ||
                                                    p.categorie.toLowerCase() === 'chaussure de sport' ||
                                                    p.categorie.toLowerCase() === 'talon'
                                                ) ? 'article_chaussures' : 'article_sacs_accessoires'}/${p.colorName}/${(p.categorie.toLowerCase() === 'combinaison' ||
                                                    p.categorie.toLowerCase() === 'enssemble' ||
                                                    p.categorie.toLowerCase() === 'traditionel' ||
                                                    p.categorie.toLowerCase() === 'robe'
                                                ) ? 'vetement_actif' :
                                                    (p.categorie.toLowerCase() === 'sandale' ||
                                                        p.categorie.toLowerCase() === 'chaussure de sport' ||
                                                        p.categorie.toLowerCase() === 'talon'
                                                    ) ? 'chaussure_actif' : 'sacs_accessoires_actif'
                                                }/undefined/${p.id}`}>
                                                <p className="search_product_description" > {p.description} </p>
                                            </NavLink>
                                            <p className="search_product_prix"> {p.prix} FCFA</p>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            }
            <div className="shopping">
                <NavLink to={'/MonPagnet'}>
                    <i title='voir le panier' className="fa-solid fa-cart-shopping"></i>
                </NavLink>
                {(storageState > 0 || JSON.parse(window.localStorage.getItem('productSelectInfo')).length > 0) &&
                    <span className='notification'>
                        {storageState || JSON.parse(window.localStorage.getItem('productSelectInfo')).length}
                    </span>

                }
            </div>
        </div>

    </nav>
}

export default Nav