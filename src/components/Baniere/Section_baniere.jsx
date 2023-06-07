import Bouton from "../aurtres/Bouton"
import Social_icons from "../aurtres/Social_icons"

function Section_baniere ({title, image,link, children} ){

    return <div className={'Section_baniere ' + title } >
    <div className="baniere_text">
        <h1> {title} </h1>
        <p> {children} </p>
    </div>
    <img src={image} alt="" />

    <Social_icons/>

    </div>
}
export default Section_baniere 