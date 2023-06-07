import { useEffect, useState } from "react";
import Title from "./Title";
import Produit_card from "./Produit_card";
import { capitalizeFirstLetter, getUniqueProductArr } from "../../util";
import axios from "axios";


function Pehabs_like({category, description,table_name,deffaulClasse,id}){
   
  const [produits, setProduits] = useState([])

    useEffect(() => {
          const fetchProducts = async () => {
            try {
              const res = await axios.get(`http://localhost:3001/collection/${table_name}`)
              /*recuprèration des données en évitant de dupliquer les articles
              qui partagent le meme nom avec la fonction getUniqueProductArr*/
              const uniqueVetments = getUniqueProductArr(res.data, 'nom')

              // Filtrage des articles selon la catégoreie
              setProduits(uniqueVetments.filter(p =>  p['categorie'] === category && 
              p['description'].trim() !== description.trim()))
             
            } catch (err) {
              console.log(err)
            }
          }
          fetchProducts()
        
      }, [category,description])

    return <div className="Pehabs_like">
      {produits.length > 0 && <Title title={capitalizeFirstLetter("produits similaires")} />}
        
        <div className="Vetements_content">

        {
          produits.map(p => (
              p.imgSrc && <Produit_card 
              key={p.id}
              id={p.id}
              image={p.imgSrc}
              nom={p.nom}
              description={p.description} 
              prix={p.prix} 
              taille={p.taille}
              category={p.categorie}
              table_name={table_name}  // le nom de la table dans la base de donée msql
              deffaulClasse={deffaulClasse}
              colorName={p.colorName}
              />

          ))
        }
      </div>
    </div>
}

export default Pehabs_like