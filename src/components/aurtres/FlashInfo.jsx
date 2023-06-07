import { useEffect, useRef, useState } from "react"

function FlasInfo ({info, onFlashInfoActif, messageType}){


    const [count, setCount] = useState(100);
    const flasInfoTag = useRef()


    useEffect(() => {
      const interval = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 50);
  
      if (count === 0) {
        // Fermeture de la flashInfo si le déchargement est terminé
        flasInfoTag.current.classList.add('FlasInfo_hideden')
        setTimeout(()=>{
            onFlashInfoActif(false)
            flasInfoTag.current.classList.remove('FlasInfo_hideden')
            setCount(100);
            clearInterval(interval);
        },2000)
      }
  
      return () => {
        clearInterval(interval);
      };
    }, [count]);

    // Fermeture de la flashInfo lorsque le bouton close est  cliqué
    const handleClick = ()=>{
        flasInfoTag.current.classList.add('FlasInfo_hideden')
        setTimeout(()=>{
            onFlashInfoActif(false)
            flasInfoTag.current.classList.remove('FlasInfo_hideden')
        },2000)
    }

    return <div ref={flasInfoTag} className="FlasInfo">
        <div className="flasInfo_content">
            <p>{info}</p>
            <div className="flasInfo_chargement">
                <div className="progresse" 
                style={{width: count+'%',
                background : messageType === 'error' ? 'red': 
                messageType === 'attention' ? '#eccb7c' : 'green' }}>
                </div>
            </div>
        </div>
        <span className="close" onClick={handleClick}> <i className="fa-solid fa-x"></i> </span>

    </div>
}

export default FlasInfo