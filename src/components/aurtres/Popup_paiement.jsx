import { useState } from "react"
import Bouton from "./Bouton"
import axios from "axios"
import FlasInfo from "./FlashInfo"

function Popup_paiement ({commande,onClosePopupBox}){
    const [message, setMessage] = useState('')
    const [newCommande, setNewCommande] = useState(false)
    const [messageType, seMessageType] = useState('')
    const [inputValue, setInputValue] = useState({
        name : '',
        phone : '',
        email : ''
    })

   // Activation désactivation du onFlashInfoActif
   const onFlashInfoActif = (boulean) =>{
    setNewCommande(boulean)
}

    const handleChange = ({target})=>{
        const name = target.name
        setInputValue(state => Object.assign({...state}, {[name]: target.value }))
    }

    const handleClosePopup = ({target})=>{
        if(target.className === 'Popup_paiement'){
            onClosePopupBox(false)
        }
    }


    const handleClick = (e)=>{
        e.preventDefault()
        let commandText = ''
        commande.forEach(c => {
            commandText+=c
        });
        console.log(commandText)

        if(inputValue.phone.trim() !== '' && inputValue.name.trim() !== '' && inputValue.email.trim() !== '' ){
            const response = axios.post(`http://localhost:3001/getCommand/${commandText}/${inputValue.name}/${inputValue.email}/${inputValue.phone}`,);
            setMessage(response.data.message)
            response.data.message !== 'Une ereur est survenue reseyer plus tard'? seMessageType('success') : seMessageType('attention')
            setNewCommande(true)
        }

    }

    return <div className="Popup_paiement" onClick={handleClosePopup}>
        {newCommande && <FlasInfo onFlashInfoActif={onFlashInfoActif} info={message} messageType={messageType} />}
        <form action="">
        <div className="Popup_paiement_content">
            <div className="Popup_paiement_content_input">
                <label htmlFor="name" >Votre Nom</label>
                <input type="text" name="name" required={true} value={inputValue.name} onChange={handleChange} />
            </div>

            <div className="Popup_paiement_content_input">
                <label htmlFor="name">Votre eamil</label>
                <input type="email" name="email" required={true} value={inputValue.email} onChange={handleChange} />
            </div>

            <div className="Popup_paiement_content_input">
                <label htmlFor="name">Votre Numèro de télèphone</label>
                <input type="number" name="phone" required={true} value={inputValue.phone} onChange={handleChange} />
            </div>

            <button onClick={handleClick} type="submit" className="commandBtn">Valider</button>

        </div>
        </form>
 

    </div>
}

export default Popup_paiement