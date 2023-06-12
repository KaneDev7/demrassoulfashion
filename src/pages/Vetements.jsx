import { useEffect, useState } from "react";
import Filter from "../components/aurtres/Filter"
import axios from "axios";
import Produit_card from "../components/aurtres/Produit_card";
import TopbarFixed from "../components/aurtres/TopbarFixed";
import Topbar from "../components/Topbar/Topbar";
import Title from "../components/aurtres/Title";
import { capitalizeFirstLetter, getUniqueProductArr } from "../util";
import { filter_vetements_arr } from "../cat_db/cat_db_arr";
import { useParams } from "react-router-dom";
import Footer from "../components/aurtres/Footer";
import Wait from "../components/aurtres/Wait";

function Vetements({ page }) {

  const [produits, setProduits] = useState([])
  const [topbarFixVisble, setTopbarFixVisble] = useState(false)
  const [isLoading, setIsloading] = useState(false)

  const { categorie } = useParams()

  const onTopbarFixVisible = (boolean) => {
    // si le valeur boolean est true on le topbar devient visible sinon il devient invisble
    setTopbarFixVisble(boolean)
  }

  useEffect(() => {

  }, [produits])

  useEffect(() => {
    const fetchProducts = async () => {
      setIsloading(true)

      try {
        const res = await axios.get('http://localhost:3001/collection/article_vetement')
        /*recuprèration des données en évitant de dupliquer les articles
         qui partagent le meme nom avec la fonction getUniqueProductArr*/
        const uniqueVetments = getUniqueProductArr(res.data, 'nom')

        // Filtrage des articles selon la catégoreie
        if (categorie !== 'ete' || categorie !== 'hivert' || categorie !== 'Tout') {
          setProduits(uniqueVetments.reverse().filter(p => p['categorie'] === categorie))
          setIsloading(false)


        } if (categorie === 'ete' || categorie === 'hivert') {
          setProduits(uniqueVetments.filter(p => p['saison'] === categorie))
          setIsloading(false)


        } if (categorie === 'Tout') {
          setProduits(uniqueVetments)
          setIsloading(false)


        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchProducts()
  }, [categorie])




  return <>
    {topbarFixVisble && <TopbarFixed deffaulClasse='vetement_actif' />}
    <Topbar onTopbarFixVisible={onTopbarFixVisible} deffaulClasse='vetement_actif' />
    <div className="Produits">
      <Filter filterArr={filter_vetements_arr} page={page} />
      <Title title={categorie !== 'Tout' ?
        capitalizeFirstLetter(categorie) :
        capitalizeFirstLetter(categorie).replace('t', 's') + ' les' +
        page.toLowerCase().replace('/', ' ').replace('_', ' & ')

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
              table_name='article_vetement' // le nom de la table dans la base de donée msql
              deffaulClasse='vetement_actif'
              colorName={p.colorName}
              fromPage='undifined'

            />

          )) :
          <Wait />
        }
      </div>
    </div>
    <Footer />
  </>
}

export default Vetements