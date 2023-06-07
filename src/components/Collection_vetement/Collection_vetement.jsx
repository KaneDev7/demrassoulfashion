//import Swiper core and required modules
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Bouton from "../aurtres/Bouton"
import Card_collection from "../aurtres/Card_collection"

import enssemble_imgSrc from '../../images/collection vetement/Enssembles.png'
import combinaison_imgSrc from '../../images/collection vetement/combinaison.png'
import robe_imgSrc from '../../images/collection vetement/robe-noemie.png'
import traditionnel_imgSrc from '../../images/collection vetement/traditionel.png'

// Import Swiper styles
import 'swiper/scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Title from '../aurtres/Title';
import { forwardRef } from 'react';

const Collection_vetement = forwardRef((props, ref) => {
  
  const { titre } = props

  return <section className="Collection_vetement" ref={ref}>
    <Title title={titre} />
    <p>Découvrez notre collection de vêtements pour femmes, alliant élégance et style. Que ce soit pour une <strong>robe chic</strong> , une <strong>combinaison tendance </strong> ou un <strong>ensemble moderne</strong> , nous avons tout ce qu'il vous faut. Exprimez votre personnalité avec nos <strong>vêtements traditionnels</strong> . Faites-vous plaisir avec nos créations uniques</p>
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
          <Card_collection image={enssemble_imgSrc} category='/Vetements/enssemble' type='enssemble' />
        </SwiperSlide>

        <SwiperSlide>
          <Card_collection image={combinaison_imgSrc} category='/Vetements/combinaison' type='combinaison' />
        </SwiperSlide>

        <SwiperSlide>
          <Card_collection image={robe_imgSrc} category='/Vetements/robe' type='robe' />
        </SwiperSlide>

        <SwiperSlide>
          <Card_collection image={traditionnel_imgSrc} category='/Vetements/traditionel' type='traditionel' />
        </SwiperSlide>

      </Swiper>
    </div>

    <Bouton text='Afficher tout' link='/Vetements/Tout'/>
  </section>

})









export default Collection_vetement

