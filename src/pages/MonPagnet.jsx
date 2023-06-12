import { useEffect, useState } from "react"
import TopbarFixed from "../components/aurtres/TopbarFixed";
import Bouton_whatsap from "../components/aurtres/Bouton_whatsap";
import Title from "../components/aurtres/Title";
import { reduceTextLength } from "../util";
import Popup_paiement from "../components/aurtres/Popup_paiement";

function MonPagnet (){
    
    const [maPagnet, setMaPagnet] = useState([])
    const [prixTotal,setPrixTotal] = useState(0)
    const [poppubBoxVisble, setPopupBoxVisible] = useState(false)

    const handleClick = () =>{
        setPopupBoxVisible(true)
    }

    const onClosePopupBox = (boulean)=>{
        setPopupBoxVisible(boulean)
    }

    // importataion de tous les commandes dnas le tableau allCommantArr
    const allCommandArr = maPagnet.map(p =>{
        return `
<p><span style="font-weight: bold;"> Nom: </span> ${p.description},</p>
<p><span style="font-weight: bold;"> Catégorie : </span> ${p.category},</p>
<p><span style="font-weight: bold;"> Couleur : </span> ${p.colorNameSelected},</p>
<p><span style="font-weight: bold;"> Taille : </span> ${p.taille ? p.taille : ''},</p>
<p><span style="font-weight: bold;"> Quantité : </span> ${p.quantity},</p>
<p><span style="font-weight: bold;">Prix : </span>  ${p.prix * p.quantity} FCFA </p>
<p>______________________________________</p>
    `
    })

    // Modification de la quantitié
    const handleUpdateQuantity = (id,taille,colorName,e) => {
      // Recupération des données de localStorage precedant
    let prevData = JSON.parse(window.localStorage.getItem('productSelectInfo'))

      // Recupération de l'item qui existe deja dans le localStorage
     const getIdentiqueIdItem = prevData.filter(p => p.id === id && p?.taille === taille && p?.colorNameSelected === colorName) 
    
     // Recupération de l'index de l'item 
     const indexItem = prevData.findIndex((item)=> item === getIdentiqueIdItem[0])

    // Recupération de la précedente valeur pour la quantité
     let prevQuantity = prevData[indexItem].quantity 

     // (Incrémentation / désincrémentation) de la quantité (plus / moins)
     let upDateQuantityNumber = e.target.id === 'reduce' && prevQuantity > 1 ? --prevQuantity :
     e.target.id === 'reduce' && prevQuantity === 1 ? 1:
      ++prevQuantity 

     // Mettre à jour la valeur de la quantité 
     let updateQuantityItem  = {...getIdentiqueIdItem[0],quantity : upDateQuantityNumber}
     prevData[indexItem] = updateQuantityItem

     // Mettre à jour le localStorage
     window.localStorage.setItem('productSelectInfo',JSON.stringify(prevData))
     setMaPagnet(JSON.parse(window.localStorage.getItem('productSelectInfo'))?.reverse())
         
}

    // Supprimer l'item
    const handleRemoveItem = (id,taille,colorName)=>{
    // Recupération des données de localStorage precedant
     let prevData = JSON.parse(window.localStorage.getItem('productSelectInfo'))

    // Recupération de l'item qui existe deja dans le localStorage
     const getIdentiqueIdItem = prevData.filter(p => p.id === id && p?.taille === taille && p?.colorNameSelected === colorName) 
     
     // Recupération de l'index de l'item à supprimer
     const indexItem = prevData.findIndex((item)=> item === getIdentiqueIdItem[0])

     // suppremession de l'item
     prevData.splice(indexItem,1)

     // Mettre à jour le localStorage
     window.localStorage.setItem('productSelectInfo',JSON.stringify(prevData))
    setMaPagnet(JSON.parse(window.localStorage.getItem('productSelectInfo'))?.reverse())
    }

    useEffect(()=>{
        setMaPagnet(JSON.parse(window.localStorage.getItem('productSelectInfo'))?.reverse() || [])
    },[])

    useEffect(()=>{
          // calcule du prix total 
          let total = 0
          maPagnet.forEach(p =>{
             total+=(parseFloat(p.prix)* parseFloat(p.quantity))
          })
          setPrixTotal(total)
    },[maPagnet])

    return  <>
    {poppubBoxVisble &&
    <Popup_paiement commande={allCommandArr} onClosePopupBox={onClosePopupBox} />
    }
    <TopbarFixed />
    <div className="MonPagnet">
        <ul className="MonPagnet_content">
            <Title title='Mon panier'/>
            <p>{maPagnet.length} {maPagnet.length > 1 ? 'Produits' : 'Produit'} | total : {prixTotal} FCFA </p>
        {
           
           maPagnet.map((p, i) =>(
            <li key={i} className="pagnetItem">
             <div className="pagnetItem_left">
             <div className="pagnetItem_image">
                <img  src={require('../images/' + p.imgSrc)} alt="" title={p.description}  />
                </div>
                <div className="pagnetItem_text">
                   <p className="pagnetItem_description">{reduceTextLength(p.description,30)} </p>
                   {p.taille !== '' &&
                   <p className="pagnetItem_prix_taille">Taille: <span>{p.taille}</span> </p>
                   }
                   <p className="pagnetItem_prix_quantity">Quantité: <span>{p.quantity}</span> </p>
                  
                   <p className="pagnetItem_prix">Prix : <span>{p.prix * p.quantity} FCFA</span></p>
                </div>
             </div>
                <div className="pagnetItem_right">
                {/* <Bouton_whatsap phoneNumber={773749383}
                text='Commander'
                message={[`
Nom: ${p.description}.
Catégorie : ${p.category}.
Couleur : ${p.colorNameSelected}
Taille : ${p.taille ? p.taille : ''}.
Quantité : ${p.quantity}
Prix : ${p.prix * p.quantity} FCFA.`
                ]} /> */}
                <div className="choose_Quantity">
                    <span id="reduce" onClick={(e)=> handleUpdateQuantity(p.id,p.taille,p.colorNameSelected,e)}>_</span>
                    <span className='quantity'>{p.quantity}</span>
                    <span id="add" onClick={(e)=>handleUpdateQuantity(p.id,p.taille,p.colorNameSelected,e)}>+</span>
                </div>
                <span className="removeCartBtn" title="Supprimer" onClick={(e)=>handleRemoveItem(p.id,p.taille,p.colorNameSelected)}> 
                   <i className="fa-solid fa-x"></i> 
                </span>
                </div>
               
            </li>
           
           ))
        }
        {maPagnet.length > 0 &&
        <div className="commandAll">
            <button onClick={handleClick} className="ValidBtn">Valider la commande</button>
        </div>
        }
          
        </ul>
    </div>
    </>
  
    
}

export default MonPagnet