import Logo from "./Lgo"
import Nav from "./Nav"

function TopbarFixed ({deffaulClasse,storageState}){
  
    return <div  className="Topbar TopbarFixed">
        <div className="topbar_content">
        <Logo />
        <Nav  deffaulClasse={deffaulClasse} storageState={storageState} />
        </div>
    </div>
}

export default TopbarFixed