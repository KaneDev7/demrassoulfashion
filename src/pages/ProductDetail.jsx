import { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";

import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import TopbarFixed from "../components/aurtres/TopbarFixed";
import { capitalizeFirstLetter, reduceTextLength, rgbToHex } from "../util";
import Bouton_whatsap from "../components/aurtres/Bouton_whatsap";
import Shopping from "../components/aurtres/Shopping";
import Bouton_telephone from "../components/aurtres/Bouton_telephone"
import Pehabs_like from "../components/aurtres/Pehabs_like";

import waveIcon from '../images/mode paiement icon/wave.png'
import omIcon from '../images/mode paiement icon/om.png'
import cashIcon from '../images/mode paiement icon/cash.png'


// Import Swiper styles
import 'swiper/scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import FlasInfo from '../components/aurtres/FlashInfo';
import Footer from '../components/aurtres/Footer';

function ProductDetail() {

  const { productName, firstProductImgSrc, description, prix, taille,
    category, table_name, colorName, deffaulClasse, fromPage, id } = useParams()
  const [produits, setProduits] = useState([])
  const [isMounted, setIsMounted] = useState(false);
  const [selectImage, setSelectImage] = useState(firstProductImgSrc)
  const [sizeArr, setSiseArr] = useState([])
  const [seletedSize, setSelectedSize] = useState(taille)
  const [colorArr, setColorArr] = useState([])
  const [colorNameSelected, setColorNameSelected] = useState(colorName)
  const [storageState, setStorageState] = useState(0)
  const [flashInfoActif, setFlahInfoActif] = useState(false)
  const [messageType, seMessageType] = useState('')
  const [message, setMessage] = useState('')

  
  const siezTag = useRef()
  const colorTag = useRef()
  const imgRef = useRef();

  // flash info
  const onFlashInfoActif = (boolean)=>{
    setFlahInfoActif(boolean)
  } 

  // mettre à jour le type d'info sur le composant flashInfo (erreur, acertissement, succée)
  const onMessageType = (msgType)=>{
    seMessageType(msgType)
  }

  // mettre à jour le contenu d'info sur le composant flashInfo
  const onInfoFlashContent = (msg)=>{
    setMessage(msg)
  }

  //  mettre à jour le nombre de produit existant dans le panier
  const onAddLocalStorage = (length)=>{
    setStorageState(length)
  }

  // Zoom sur l'image
  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: img } = imgRef;

    if (img) {
      const value = make3dTransformValue({ x, y, scale });
      img.style.setProperty("transform", value);
    }
  }, []);


  const handleColorSelected = ({ target }) => {
    // activation du focus
    target.parentElement.querySelector('.colorSelected').classList.remove('colorSelected')
    target.classList.add('colorSelected')

    // Recupèration de chaque valeur rgb
    const val1 = window.getComputedStyle(target, null).backgroundColor.split(',')[0].split('(')[1]
    const val2 = window.getComputedStyle(target, null).backgroundColor.split(',')[1]
    const val3 = window.getComputedStyle(target, null).backgroundColor.split(',')[2].replace(')', '')

    // fusion et conversion des valeurs de rgb  en hexadecimal
    const colorSelectedCode = rgbToHex(parseFloat(val1), parseFloat(val2), parseFloat(val3))

    // Affichage de l'image correspondant au couleur selectionnée 
    produits.map(p => {
      if (p.couleur === colorSelectedCode) {
        setSelectImage(p.imgSrc)
      }
    })

    // Mettre à jour le nom de la couleur selectionnée
    produits.forEach(p => {
      if (colorSelectedCode === p.couleur) {
        setColorNameSelected(p.colorName)
      }
    })
  }


  // Mettre à jour le nom de la couleur selectionnée
  const handleSizeSelected = ({ target }) => {
  // activation du focus
  target.parentElement.querySelector('.siezSelected').classList.remove('siezSelected')
  target.classList.add('siezSelected')

  // Mettre à jour le state
    setSelectedSize(target.innerText)
  }


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/collection/${table_name}`)
        // Recupèration des articles qui partagent le meme nom 
        const productOnThisPage = res.data.filter(p => p.nom === productName)

        // configuration des tailes disponibles pour cet article
        const filterSize = []
        // introduction de tous les tailes disponibles pour cet article dans le tableau filterSize
        productOnThisPage.map((p, i) => {
          if (!filterSize.includes(p.taille)) {
            filterSize.push(p.taille)
          }
        })

        // Selection du premier element de la taille sur le DOM
        siezTag.current = document.querySelectorAll('.size').forEach((size, i) => {
          size.classList.remove('siezSelected')
          if (i === 0) {
            size.classList.add('siezSelected')
          }
        })

        // configuration des couleurs disponibles pour cet article
        const filtercolor = []
        const filterColorName = []

        // introduction de tous les couleurs disponibles pour cet article dans les tableau filtercolor,filterColorName
        productOnThisPage.map((p, i) => {
          if (!filtercolor.includes(p.couleur)) {
            filtercolor.push(p.couleur)
            filterColorName.push(p.colorName)
          }
        })

        // Selection du premier element de la couleur sur le DOM
        colorTag.current = document.querySelectorAll('.color').forEach((color, i) => {
          color.classList.remove('colorSelected')
          if (i === 0) {
            color.classList.add('colorSelected')
          }
        })

        // mettre à jour de tous les etats 
        setSelectImage(productOnThisPage.at(0).imgSrc)
        setProduits(productOnThisPage)
        setSiseArr(filterSize)
        setColorArr(filtercolor)
        setSelectedSize(filterSize[0])
        setColorNameSelected(filterColorName[0])
        setIsMounted(true);

      } catch (err) {
        console.log(err)
      }
    }
    fetchProducts()
  }, [productName, firstProductImgSrc, colorName,taille])

  useEffect(() => {
    window.scroll(0, 0)
  }, [productName])


  return <div className="ProductDetail">
            
    {flashInfoActif && <FlasInfo 
    info={message}
    messageType={messageType}
    onFlashInfoActif={onFlashInfoActif}
    />}
    <TopbarFixed deffaulClasse={deffaulClasse} storageState={storageState}  />
    <div className="productDetail_content">
      <div className="productDetail_image">
        <p className='nav'>
          <NavLink to={'/'}  >
            <a href="#">Accueil</a> <i className="fa-solid fa-chevron-right"></i>
          </NavLink>

          <NavLink to={deffaulClasse === 'vetement_actif' && fromPage !== 'new_product' ? `/Vetements/Tout` :
            deffaulClasse === 'chaussure_actif' && fromPage !== 'new_product' ? '/Chaussures/Tout' :
              deffaulClasse === 'sacs_accessoires_actif' && fromPage !== 'new_product' ? '/Sacs_accessoires/Tout' :
                `/NewProducts/${category.toLocaleLowerCase() === 'robe' ||
                 category.toLocaleLowerCase() === 'combinaison' ||
                  category.toLocaleLowerCase() === 'traditionnel' ||
                   category.toLocaleLowerCase() === 'enssemble'? 'vetement' : 

                   category.toLocaleLowerCase() === 'talon' ||
                   category.toLocaleLowerCase() === 'sandale' ||
                    category.toLocaleLowerCase() === 'chaussure de sport'? 'chaussure':
                  'sac & accessoire'
                  } `

          } >

            <a href="#"> {deffaulClasse === 'vetement_actif' && fromPage !== 'new_product' ? `Vetements` :
              deffaulClasse === 'chaussure_actif' && fromPage !== 'new_product' ? `Chaussures` :
                deffaulClasse === 'sacs_accessoires_actif' && fromPage !== 'new_product' ? `Sacs & accessoires` :

                  'Nouvelles arrivages'} </a><i className="fa-solid fa-chevron-right"></i>
          </NavLink>
          { (fromPage !== 'new_product') &&
            <NavLink to={deffaulClasse === 'vetement_actif' ? `/Vetements/${category}` :
              deffaulClasse === 'chaussure_actif' ? `/Chaussures/${category}` :
                `/Sacs_accessoires/${category}`
            } >
              <a href="#"> {capitalizeFirstLetter(category)} </a><i className="fa-solid fa-chevron-right"></i>
            </NavLink>
          }


          <a className='productNameActive' href="#">
            {category === 'chaussure de sport' || deffaulClasse === 'sacs_accessoires_actif' ?
              reduceTextLength(description, 15) : reduceTextLength(description, 20)} </a>
        </p>

        <div  className="image">
        <QuickPinchZoom
         onUpdate={onUpdate}
         doubleTapZoomOutOnMaxScale={true}
         maxZoom={3}
         inertiaFriction={0.93}
         tapZoomFactor={1}
         zoomOutFactor={1.3}
         animationDuration={50}
         >

        <img ref={imgRef}
          src={require('../images/' + selectImage)} alt="" />
        </QuickPinchZoom>
        
        </div>

        <div className="productDetail_pagination">
          <Swiper

            // install Swiper modules
            modules={[Autoplay, Navigation, Pagination, A11y]}
            spaceBetween={5}
            slidesPerView={4}
            navigation
          >
            {
              produits.map((p,i) => (
                <SwiperSlide>
                  <img key={i} src={require('../images/' + p.imgSrc)} alt="" onClick={() => { setSelectImage(p.imgSrc) }} />
                </SwiperSlide>
              ))
            }

          </Swiper>

        </div>
      </div>

      <div className="ProductDetail_tetxt">
        <p className="ProductDetail_descript"> {capitalizeFirstLetter(description)} </p>
        <h1 className="ProductDetail_prix"> {prix} FCFA</h1>

        <div className="size_color_boxe">
          {deffaulClasse !== 'sacs_accessoires_actif' ?
            <div className="ProductDetail_size">
              <p>Tailles disponibles</p>
              <div className="selectSize" ref={siezTag}>
                {
                  sizeArr.map((size, i) => (
                    <div key={i} className={i === 0 ? 'size siezSelected' : 'size'}
                      onClick={handleSizeSelected}
                      ref={siezTag}
                    >
                      <span> {size} </span>
                    </div>

                  ))
                }

              </div>
            </div> :
            ''
          }

          <div className="ProductDetail_color">
            <p>Couleurs disponibles</p>
            <p></p>
            <div className="selectColor">
              {
                colorArr.map((color, i) => (
                  <div key={i} className={i === 0 ? 'color colorSelected' : 'color'}
                    style={{ background: color }} onClick={handleColorSelected}
                    ref={colorTag}
                  >
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <div className="produtDetail_contact">

          {deffaulClasse !== 'sacs_accessoires_actif' ?
            <p>Vous êtes intéressé par notre produit ? Nous vous invitons 
               à sélectionner la taille et la couleur qui vous conviennent
               le mieux. Vous pouvez passer votre commande en toute simplicité 
               via WhatsApp. Vous avez également la possibilité de l'ajouter directement à votre panier.
            </p> :
            <p>Vous êtes intéressé par notre produit ? Nous vous invitons 
            à sélectionner la couleur qui vous conviennent
            le mieux. Vous pouvez passer votre commande en toute simplicité 
            via WhatsApp. Vous avez également la possibilité de l'ajouter directement à votre panier.

            </p>
          }

          <div className="ProductDetail_boutons">
            <Bouton_telephone 
            imgSrc={selectImage} 
            description={description}
            category={category}
            prix={prix}
            taille={seletedSize ? seletedSize : ''}
            colorNameSelected={colorNameSelected}
            productName={productName}
            id={id}
            deffaulClasse={deffaulClasse}
            onAddLocalStorage={onAddLocalStorage}
            onFlashInfoActif={onFlashInfoActif}
            onMessageType={onMessageType}
            onInfoFlashContent={onInfoFlashContent}
            />

            <Bouton_whatsap imgSrc={selectImage} phoneNumber={773749383}
              text='Commander '
              message={[
                `
Nom: ${description}.
Catégorie : ${category}.  
Couleur : ${colorNameSelected}
Taille : ${seletedSize ? seletedSize : ''}.
Prix : ${prix} FCFA.
______________________________________
`
]} />
          </div>
        </div>
        <Shopping />
        <div className="paiementMode">
          <p>Modes de paiements</p>
          <div className="paiementModeIcon">
            <div className="image"> <img src={omIcon} alt="" /> </div>
            <div className="image"> <img src={waveIcon} alt="" /></div>
            <div className="image"> <img src={cashIcon} alt="" /></div>

          </div>
        </div>
      </div>
    </div>
    <Pehabs_like category={category} description={description} table_name={table_name} deffaulClasse={deffaulClasse} />
    <Footer/>
  </div>
}

export default ProductDetail
