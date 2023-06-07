//import Swiper core and required modules
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Bouton from "../aurtres/Bouton"
import Card_collection from "../aurtres/Card_collection"

import bijoux_imgSrc from '../../images/collection sac et accessoire/bijoux.jpg'
import pochette_imgSrc from '../../images/collection sac et accessoire/pochette.jpg'
import sac_a_dos_imgSrc from '../../images/collection sac et accessoire/sac a dos.jpg'
import sac_de_voyage_imgSrc from '../../images/collection sac et accessoire/sac de voyage.jpg'
import sac_a_main_imgSrc from '../../images/collection sac et accessoire/sac a main.jpg'





// Import Swiper styles
import 'swiper/scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Title from '../aurtres/Title';
import { forwardRef } from 'react';

const Collection_sac_accessoire = forwardRef((props, ref) => {
  const { titre } = props

  return <section className="Collection_vetement" ref={ref}>
    <Title title={titre} />
    <p>Découvrez notre collection <strong>d'accessoires</strong> de mode pour femmes. Des <strong>sacs à main élégants</strong> aux <strong>sacs à dos pratiques</strong>, des <strong>sacs de voyage fonctionnels</strong> aux <strong>pochettes chic</strong>, nous avons tout ce qu'il vous faut pour compléter votre look. Exprimez votre style personnel avec nos <strong>bijoux tendance </strong> qui ajoutent une touche d'éclat à vos tenues</p>
    <div className="vetement_cards">
      <Swiper
        // install Swiper modules
        modules={[Autoplay, Navigation, Pagination, A11y]}
        centeredSlides={false}
        slidesPerGroupSkip={3}
       
        breakpoints={{
          400: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1300: {
              slidesPerView: 4,
              spaceBetween: 50,
            }
          }}

        spaceBetween={20}
        navigation

      >
        <SwiperSlide>
          <Card_collection image={sac_a_dos_imgSrc} category='/Sacs_accessoires/sac à dos' type='sac à dos' />
        </SwiperSlide>

        <SwiperSlide>
          <Card_collection image={sac_a_main_imgSrc} category='/Sacs_accessoires/sac à main' type='sac à main' />
        </SwiperSlide>

        <SwiperSlide>
          <Card_collection image={pochette_imgSrc} category='/Sacs_accessoires/pochette' type='pochette'  />
        </SwiperSlide>

        <SwiperSlide>
          <Card_collection image={bijoux_imgSrc} category='/Sacs_accessoires/bijoux' type='Bijoux'  />
        </SwiperSlide>

          <SwiperSlide>
          <Card_collection image={sac_de_voyage_imgSrc} category='/Sacs_accessoires/sac de voyage' type='sac de voyage'  />
        </SwiperSlide>

      </Swiper>
    </div>

    <Bouton text='Afficher tout' link='/Sacs_accessoires/Tout'/>
  </section>

})









export default Collection_sac_accessoire

