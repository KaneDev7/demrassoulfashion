import { useEffect, useRef, useState } from "react"
import Baniere from "../components/Baniere/Baniere"
import Collection_vetement from "../components/Collection_vetement/Collection_vetement"
import Topbar from "../components/Topbar/Topbar"
import TopbarFixed from "../components/aurtres/TopbarFixed"
import Collection_chaussures from "../components/Collection_vetement/Collection_chaussures"
import Collection_sac_accessoire from "../components/Collection_vetement/Collection_sac_accessoire"
import Footer from "../components/aurtres/Footer"

function Home ( {onUpdateFilterFocus, onUpdateFilterTitle } ){

    const [topbarFixVisble, setTopbarFixVisble] = useState(false)

    const onTopbarFixVisible = (boolean)=>{
      setTopbarFixVisble(boolean)
    }
    
    let collection = useRef()

    useEffect(()=>{
      collection = document.querySelectorAll('.Collection_vetement .vetement_cards')
       let observer = new IntersectionObserver((entries, observe)=>{

          for(const entrie of entries){
            // On ajoute la class card_collection_visible si l'emplacement 
            // de l'element en question est intercepté (obsrveer) sur l'écran
            if(entrie.isIntersecting){
              entrie.target.classList.add('card_collection_visible')
              // on arrete l'observation une fois que l'element devient visible
              observe.unobserve(entrie.target)
            }
          }
        },{ 
          root: null,
          rootMargin : '-50%',
        })
        collection.forEach(element => {
          observer.observe(element)
        })
    })

    return <div className="Home">
    {topbarFixVisble  && <TopbarFixed  /> }
    <Topbar onTopbarFixVisible={onTopbarFixVisible}  />
    <Baniere />
    <Collection_vetement ref={collection} titre='Nos collections de vetements'   />
    <Collection_chaussures ref={collection} titre='Nos collections de chaussures' />
    <Collection_sac_accessoire ref={collection} titre="Nos collections de sacs et d'accessoires"/>
    <Footer/>
    </div>
}

export default Home
