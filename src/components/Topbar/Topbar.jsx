import { useEffect, useRef, useState } from "react"
import Logo from "../aurtres/Lgo"
import Nav from "../aurtres/Nav"

function Topbar ( {onTopbarFixVisible, deffaulClasse} ){
    
    const handleScroll = () => {
        if (window.scrollY >= 500) {
            // si le scrollY est superieur a 500 et que le callback 
            //onTopbarFixVisible exite on l'appele avec la parametre ture
            onTopbarFixVisible &&  onTopbarFixVisible(true)
        } else {
            // si le scrollY est inferieur a 500 et que le callback 
            //onTopbarFixVisible exite on l'appele avec la parametre false  
           onTopbarFixVisible &&  onTopbarFixVisible(false)
        }
        
    }

    useEffect(() => {
        //  écoute du sccroll sur la page
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return <div className="Topbar ">
        <div className="topbar_content">
        <Logo/>
        <Nav deffaulClasse={deffaulClasse}/>
        </div>

    </div>
}

export default Topbar