import { NavLink } from "react-router-dom"
import Bouton from "./Bouton"
import axios from "axios"
import { useRef, useState } from "react"
import FlasInfo from "./FlashInfo"
import { isValidEmail } from "../../util"

function Footer() {
    const [message, setMessage] = useState('')
    const [newSubscribes, setNewSubscribe] = useState(false)
    const [messageType, seMessageType] = useState('')
    const input = useRef()


    // Activation désactivation du onFlashInfoActif
   const onFlashInfoActif = (boulean) =>{
        setNewSubscribe(boulean)
    }

    // Abonnement des utilisateurs
    const onSubscribe = (mail) => {
        if(!isValidEmail(mail)){
            setMessage("Veillez entrer une email valide")
            seMessageType('error')
            return setNewSubscribe(true)
        }

        const postData = async () => {
            try {
               const response = await axios.post(`http://localhost:3001/clientabonne/${mail}`,);
               setMessage(response.data.message)
               response.data.message !== 'Cette email existe deja sur la liste de nos abonnés'? seMessageType('success') : seMessageType('attention')
               setNewSubscribe(true)
               input.current.value =''
            } catch (error) {
                console.error(error);
            }
        };
        postData();
    }

    return <div className="Footer">
        {newSubscribes && <FlasInfo onFlashInfoActif={onFlashInfoActif} info={message} messageType={messageType} />}
        
        <div className="footer_content">
            <div className="new_letter">
                <div className="new_letter_content">
                    <p>Abonnez-vous aujourd'hui pour en savoir plus sur nos ventes</p>
                    <div className="input_box">
                        <input ref={input} id="email" type="text"  placeholder="votre email" />
                        <Bouton onSubscribe={onSubscribe} text="S'abonner" />
                    </div>
                </div>
            </div>
            <div className="footer_bottom">
                <span >© 2003 </span>
                <NavLink to={'About'}>A propos de nous</NavLink>
                <a href="">FAG</a>
                <a href="">Contactez nous</a>
                <a href="">Politique de retour</a>

            </div>
        </div>
    </div>
}

export default Footer