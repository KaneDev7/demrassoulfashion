import { useEffect, useState } from "react"
import Topbar from "../components/Topbar/Topbar"
import TopbarFixed from "../components/aurtres/TopbarFixed"
import Produit_card from "../components/aurtres/Produit_card";
import axios from "axios";
import { calculerDifferenceEnJours, capitalizeFirstLetter, getUniqueProductArr } from "../util"
import Filter from "../components/aurtres/Filter";
import Title from "../components/aurtres/Title";
import { useParams } from "react-router-dom";
import { filter_new_product_arr } from "../cat_db/cat_db_arr";
import Footer from "../components/aurtres/Footer";
import Wait from "../components/aurtres/Wait";

function New_products ({page} ){

    const {categorie}=useParams()

    const [topbarFixVisble, setTopbarFixVisble] = useState(false)
    const [newProducts, setNewProduct] = useState([])
    const [numOfDay, setNumOfDay] = useState(null)
    const [isLoading, setIsloading] = useState(false)


    
    const onTopbarFixVisible = (boolean)=>{
      setTopbarFixVisble(boolean)
    }

   useEffect(()=>{
    if(newProducts.length > 0){
      window.scroll(0, 300)
    }
   },[newProducts])
    


    useEffect(() => {
      
        const fetchProducts = async () => {
          setIsloading(true)
            let table_name = categorie === 'vetement' ? 'article_vetement' :
            categorie === 'chaussure' ? 'article_chaussures' :
            'article_sacs_accessoires'
          try {
            const param = await axios.get(`http://localhost:3001/paramettre`)
            setNumOfDay(param.data[0].numOfDay)

            const res = await axios.get(`http://localhost:3001/collection/${table_name}`)
            const uniqueVetments = getUniqueProductArr(res.data, 'nom')

            setNewProduct(uniqueVetments.reverse().filter(p =>
                calculerDifferenceEnJours(new Date(p.date).toLocaleDateString() ,
                new Date().toLocaleDateString()) <= numOfDay
           ))
           
           setIsloading(false)
          } catch (err) {
            console.log(err)
          }
      }
   
      fetchProducts()

    }, [categorie,numOfDay])

    return <>
        {topbarFixVisble && <TopbarFixed  deffaulClasse='derniers_arrivages' />}
    <Topbar onTopbarFixVisible={onTopbarFixVisible} deffaulClasse='derniers_arrivages' />
       <div className="Produits">

    <Filter  filterArr={filter_new_product_arr} page={page} />
      <Title title={capitalizeFirstLetter(categorie) + 's ajoutés récements'} />
    <div className="Produits_content">
        {!isLoading ?
            
      newProducts.map(p => (
              p.imgSrc && <Produit_card 
              key={p.id}
              id={p.id}
              image={p.imgSrc}
              nom={p.nom}
              description={p.description} 
              prix={p.prix} 
              taille={p.taille}
              category={p.categorie}
              table_name = {categorie === 'vetement' ? 'article_vetement' :
              categorie === 'chaussure' ? 'article_chaussures' :
              'article_sacs_accessoires'}
              deffaulClasse={categorie === 'vetement' ? 'vetement_actif' :
              categorie === 'chaussure' ? 'chaussure_actif' :
              'sacs_accessoires_actif'}
              colorName={p.colorName}
              fromPage='new_product'
              />
          )):
          <Wait/>
        }
      </div>
    </div>
    <Footer/>
    </>
 
}

export default New_products