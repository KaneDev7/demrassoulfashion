
function Bouton_telephone(props){
 const  {
   imgSrc,
   description,
   prix,
   category,
   taille,
   colorNameSelected,
   productName,
   id,
   onAddLocalStorage,
   onFlashInfoActif,
   onMessageType,
   onInfoFlashContent
   } = props

   const handleClik = ()=>{
      // Recupération des données de localStorage precedant
     const prevData = JSON.parse(window.localStorage.getItem('productSelectInfo')) || [] 

     if(prevData.length > 0){
      // Recupération de l'item qui existe deja dans le localStorage
     const getIdentiqueIdItem = prevData.filter(p => p.id === id && p?.taille === taille && p?.colorNameSelected === colorNameSelected) 
     
     // si l'item existe deja dans le localStorage on lance une avertissement et retourne la fonction
      if(getIdentiqueIdItem[0]?.taille === taille && getIdentiqueIdItem[0]?.colorNameSelected === colorNameSelected ){
         onInfoFlashContent('Votre panier contient deja ce produit')
         onMessageType('attention')
         onFlashInfoActif(true)
         return
      }     
   }
   // nouvel article pour le panier
       let infoObject = {
         imgSrc,
         description,
         prix,
         category,
         taille,
         colorNameSelected,
         productName,
         quantity : 1,
         id 
      }

      // Ajout de nouvel article dans localStorage
      prevData.push(infoObject)
         window.localStorage.setItem('productSelectInfo',JSON.stringify(prevData))
         onAddLocalStorage(prevData.length)
         onInfoFlashContent('Produit ajouté au panier avec succée')
         onMessageType('success')
         onFlashInfoActif(true)
  }

   return <button className="Bouton_pagnier"title="Ajouter au panier" onClick={handleClik}>
    <span><i className="fa-solid fa-cart-shopping"></i></span>Ajouter au panier
   </button>
}

export default Bouton_telephone
