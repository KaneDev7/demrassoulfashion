//import Swiper core and required modules
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import imgae_vetement from '../../images/banieres/vetement.png'
import imgae_chaussure from '../../images/banieres/chaussure.png'
import imgae_sac from '../../images/banieres/sacs.png'
import imgae_accessoire from '../../images/banieres/accessoire.png'


// Import Swiper styles
import 'swiper/scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Section_baniere from './Section_baniere';

function Baniere () {
  return (
    <div className="Baniere">
    <Swiper
      // install Swiper modules
      modules={[Autoplay,Navigation, Pagination, A11y]}
      autoplay={{
        delay: 7000,
        disableOnInteraction: false,
      }}
      loop={true}
      spaceBetween={0}
      slidesPerView={1}
      navigation 
      pagination={{ clickable: true }}
     // onSwiper={(swiper) => console.log(swiper)}
     // onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide> 
        <Section_baniere title='VETEMENTS'  image={imgae_vetement}  link='Vetements/Tout'  >
        Exprimez votre personnalité avec notre gamme de vêtements à la pointe de la mode
        </Section_baniere >   
        </SwiperSlide>

      <SwiperSlide> 
         <Section_baniere title='CHAUSSURES' image={imgae_chaussure}  link='Chaussures/Tout'  >
         Osez faire la différence avec nos Chaussures originaux et uniques
        
        </Section_baniere> 
        </SwiperSlide>

      <SwiperSlide> 
        <Section_baniere title='SACS' image={imgae_sac} link='Sacs_accessoires/Tout'  >
        Des sacs chic et élégants pour ajouter une touche sophistiquée à votre tenue
        </Section_baniere> 
      </SwiperSlide>

      <SwiperSlide> 
        <Section_baniere title='ACCESSOIRES' link='Sacs_accessoires/Tout' image={imgae_accessoire}  >
        Notre collection d'accessoires est parfaite pour compléter votre look de tous les jours
        </Section_baniere> 
      </SwiperSlide>
    </Swiper>
    </div>

  );
};

export default Baniere