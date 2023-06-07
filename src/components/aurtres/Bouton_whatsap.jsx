
function Bouton_whatsap({phoneNumber, message,text}){
    let myCommande = ''
    message.forEach(msg => {myCommande+=msg });

    const handleClik = ()=>{
        let link = document.createElement('a')
        link.href =`https://wa.me/${phoneNumber}?text=${encodeURIComponent(`Bonjour, je suis intéresser par le${message.length > 1 ?'s':''} produit suivant${message.length > 1 ?'s':''} : ${myCommande}`  )}`
        link.target = '_blank'
        link.click()
    }

    return <button className="Bouton_whatsap" title="Commander par Whatsapp" onClick={handleClik}>
           {text} <span><i className="fa-brands fa-whatsapp"></i></span>
    </button>
 }
 
 export default Bouton_whatsap