//import Swiper core and required modules
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Bouton from "../aurtres/Bouton"
import Card_collection from "../aurtres/Card_collection"

import nue_pied_imgSrc from '../../images/collection chaussures/nue pied.jpg'
import tallon_imgSrc from '../../images/collection chaussures/tallon.jpg'
import sport_imgSrc from '../../images/collection chaussures/sport.jpg'

// Import Swiper styles
import 'swiper/scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Title from '../aurtres/Title';
import { forwardRef } from 'react';

const Collection_chaussures = forwardRef((props, ref) => {
  const { titre} = props


    return  <section className="Collection_vetement" ref={ref}>
        <Title title={titre}/>
        <p>Découvrez notre gamme de chaussures pour femmes, alliant confort et style. Que vous recherchiez des <strong>talons élégants</strong> , des <strong> sandales estivales </strong> ou des <strong>chaussures de sport fonctionnelles</strong>, nous avons tout ce dont vous avez besoin pour compléter votre look
        Avec notre sélection de chaussures de qualité, vous serez prête à affronter toutes les occasions, que ce soit une soirée spéciale, une journée décontractée ou une séance d'entraînement intense.
        </p>
        <div className="vetement_cards">
        <Swiper
      // install Swiper modules
      modules={[Autoplay,Navigation, Pagination, A11y]}
      centeredSlides={false}
      slidesPerGroupSkip={3}
   
      breakpoints={{
      500: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      spaceBetween={20}
      navigation 
      //onSwiper={(swiper) => console.log(swiper)}
      //onSlideChange={() => console.log('slide change')}
    >  
    <SwiperSlide>
    <Card_collection image={nue_pied_imgSrc} category='/Chaussures/sandale' type='sandale'  />
    </SwiperSlide>

    <SwiperSlide>
    <Card_collection image={tallon_imgSrc} category='/Chaussures/talon'  type='talon' />
    </SwiperSlide>

    <SwiperSlide>
    <Card_collection image={sport_imgSrc} category='/Chaussures/chaussure de sport' type='chaussure de sport'/>
    </SwiperSlide>


    </Swiper>  
    </div>

        <Bouton text='Afficher tout' link='/Chaussures/Tout' />
    </section>
})

export default Collection_chaussures