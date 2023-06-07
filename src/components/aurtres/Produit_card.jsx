import axios from "axios"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { capitalizeFirstLetter } from "../../util"

function Produit_card( {image, nom, description,prix,taille,category,table_name,colorName,deffaulClasse,fromPage,id} ){

    const [dynamicImg, setDynamicImg] = useState(image)  
    
    const handleMouseEnter = ()=>{
        const fetchProducts = async () => {
        try{
        setDynamicImg(image)
        const res = await axios.get(`http://localhost:3001/collection/${table_name}`)

        // Recupèration des articles qui partagent le meme nom 
        const productOnThisPage = res.data.filter(p => p.nom === nom)

        // changement d'image de meme type au survol de l'article si y'a plus d'une image
        productOnThisPage.length > 1 &&  setDynamicImg(productOnThisPage.at(0).imgSrc)

        }catch(err){
            console.log(err)
        }
    }
    fetchProducts()
    }

    const handleMouseLeave = ()=>{
        const fetchProducts = async () => {
            try{
            const res = await axios.get(`http://localhost:3001/collection/${table_name}`)
            // Recupèration des articles qui partagent le meme nom 
            const productOnThisPage = res.data.filter(p => p.nom === nom)
            
           // changement d'image de meme type au survol de l'article si y'a plus d'une image
            productOnThisPage.length > 1 && setDynamicImg(productOnThisPage.at(-1).imgSrc)

            }catch(err){
                console.log(err)
            }
        }
        fetchProducts()
    }

    return <div className="Produit_card">
    <div className="produit_image"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    >
        <NavLink to={`/ProductDetail/${nom}/${image}/${description}/${prix}/${taille}/${category}/${table_name}/${colorName}/${deffaulClasse}/${fromPage}/${id}`}>
        <img src={require('../../images/'+dynamicImg)} alt="" />
        </NavLink>
    </div>
    <div className="produit_text">
        <p className="produit_description"> {capitalizeFirstLetter(description)} </p>
        <p className="produit_nom"> {prix} fcfa</p>

    </div>
    </div>
}

export default Produit_card