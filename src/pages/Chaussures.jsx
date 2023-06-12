
import { useEffect, useState } from "react";
import Filter from "../components/aurtres/Filter"
import axios from "axios";
import Produit_card from "../components/aurtres/Produit_card";
import TopbarFixed from "../components/aurtres/TopbarFixed";
import Topbar from "../components/Topbar/Topbar";
import Title from "../components/aurtres/Title";
import {capitalizeFirstLetter, getUniqueProductArr} from "../util";
import { Route, Routes, useParams } from "react-router-dom";
import { filter_chaussures_arr } from "../cat_db/cat_db_arr";
import Footer from "../components/aurtres/Footer";
import Wait from "../components/aurtres/Wait";

function Chaussures({page}) {

  const [produits, setProduits] = useState([])
  const [topbarFixVisble, setTopbarFixVisble] = useState(false)
  const [isLoading, setIsloading] = useState(false)

  const {categorie} = useParams()

  const onTopbarFixVisible = (boolean) => {
    // si le valeur boolean est true on le topbar devient visible sinon il devient invisble
    setTopbarFixVisble(boolean)
  }

  useEffect(() => {
    setIsloading(true)

    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/collection/article_chaussures')
        /*recuprèration des données en évitant de dupliquer les articles
          qui partagent le meme nom avec la fonction getUniqueProductArr*/
        const uniqueVetments = getUniqueProductArr(res.data, 'nom')

        // Filtrage des articles selon la catégoreie
        if (categorie !== 'ete' || categorie !== 'hivert' || categorie !== 'Tout') {
          setProduits(uniqueVetments.reverse().filter(p => p['categorie'] === categorie))
          setIsloading(false)

        }  if(categorie === 'ete' || categorie === 'hivert') {
          setProduits(uniqueVetments.reverse().filter(p => p['saison'] === categorie))
          setIsloading(false)
        
        }if(categorie === 'Tout' ) {
          setProduits(uniqueVetments.reverse())
          setIsloading(false)

        }

      } catch (err) {
        console.log(err)
      }
    
    window.scroll(0, 300)
  }
  fetchProducts()

}, [categorie])


  return <>
    {topbarFixVisble && <TopbarFixed  deffaulClasse='chaussure_actif' />}
    <Topbar onTopbarFixVisible={onTopbarFixVisible}  deffaulClasse='chaussure_actif'/>
    <div className="Produits">
    <Filter  filterArr={filter_chaussures_arr} page={page} />
    <Title title={categorie !== 'Tout' ?
        capitalizeFirstLetter(categorie) :
        capitalizeFirstLetter(categorie).replace('t', 's') + ' les' + 
        page.toLowerCase().replace('/',' ' ).replace('_' ,' & ') 
        
        } />
      <div className="Produits_content">
        {!isLoading ?
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
              table_name='article_chaussures' // le nom de la table dans la base de donée msql
              deffaulClasse='chaussure_actif'
              colorName={p.colorName}
              fromPage='undifined'
              />
          )):
          <Wait/>
        }
      </div>
    </div>
    <Footer/>
  </>
}

export default Chaussures