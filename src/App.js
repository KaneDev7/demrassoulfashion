import {useEffect, useRef, useState } from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import New_products from './pages/New_products';
import Chaussures from './pages/Chaussures';
import Sacs_accessoirs from './pages/Sacs_accessoirs';
import Vetements from './pages/Vetements';
import Not_found from './pages/Not_found';
import ProductDetail from './pages/ProductDetail';
import MonPagnet from './pages/MonPagnet';
import Footer from './components/aurtres/Footer';
import About from './pages/About';




function App() {
  
  const scrollToTop = useRef()

  const handleScroll = () => {
    if (window.scrollY >= 1000) {
        scrollToTop.current.classList.add('scrollToTopVisble')

    } else {
      scrollToTop.current.classList.remove('scrollToTopVisble')
    }
}

useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    }
}, []);

const handleToTopClick = ()=>{
  window.scroll(0,0)
}


  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Home  />} />
      <Route path='/NewProducts/:categorie' element={<New_products page='/NewProducts'/>} />
      <Route path='/Vetements/:categorie' element={<Vetements  page='/Vetements' />}  />
      <Route path='/Chaussures/:categorie' element={<Chaussures page='/Chaussures'  />} />
      <Route path='/Sacs_accessoires/:categorie' element={<Sacs_accessoirs page='/Sacs_accessoires'/>} />
      <Route path='/ProductDetail/:productName/:firstProductImgSrc/:description/:prix/:taille/:category/:table_name/:colorName/:deffaulClasse/:fromPage/:id' element={<ProductDetail />} />
      <Route path='/MonPagnet' element={<MonPagnet  />} /> 
      <Route path='/About' element={<About/>} /> 

     </Routes>
     <div ref={scrollToTop} className='scrollToTop' onClick={handleToTopClick}><i className="fa-solid fa-chevron-up"></i></div>
   
    </div>
  );
}

export default App;
