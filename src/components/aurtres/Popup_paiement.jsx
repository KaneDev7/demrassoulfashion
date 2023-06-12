import { useState } from "react"
import Bouton from "./Bouton"
import axios from "axios"
import FlasInfo from "./FlashInfo"
import Title from "./Title"
import { isValidEmail } from "../../util"

function Popup_paiement ({commande,onClosePopupBox}){
    const [message, setMessage] = useState('')
    const [newCommande, setNewCommande] = useState(false)
    const [messageType, seMessageType] = useState('')
    const [isLoading ,setIsloading] = useState(false)
    const [inputValue, setInputValue] = useState({
        name : '',
        phone : '',
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

        const postData = async () => {
            try{
                setIsloading(true)
                const response = await axios.post(`http://localhost:3001/getCommand/${inputValue.name}/${inputValue.phone}`,{commande})
            
            setMessage(response.data.message)
            response.data.message !== 'Une erreur est survenue, veillez ressayer plus tard'? seMessageType('success') : seMessageType('error')
            setNewCommande(true)
            setIsloading(false)

            }catch(err){
                console.log(err)
            }
        }
        if(inputValue.phone.trim() !== '' && inputValue.name.trim() !== '' ){
            postData()
            inputValue.phone  = '' 
             inputValue.name  = '' 
        }

    }

    return <div className="Popup_paiement" onClick={handleClosePopup}>
        {newCommande && <FlasInfo onFlashInfoActif={onFlashInfoActif} info={message} messageType={messageType} />}
        <form action="">
        <div className="Popup_paiement_content">
        <h2 style={{textAlign:'center'}}>Finaliser la commande</h2>
            <div className="Popup_paiement_content_input">
                <label htmlFor="name" >Votre nom</label>
                <input type="text" name="name" required={true} value={inputValue.name} onChange={handleChange} />
            </div>

            <div className="Popup_paiement_content_input">
                <label htmlFor="name">Votre Numèro de télèphone</label>
                <input type="number" name="phone" required={true} value={inputValue.phone} onChange={handleChange} />
            </div>

            <button onClick={handleClick} type="submit" className={!isLoading? 'commandBtn ' : 'commandBtn loading'}>
                {!isLoading ? 'Passer la commande': 'Patientez...'}
            </button>
            
        </div>
        </form>
 

    </div>
}

export default Popup_paiement