import React, {  useEffect, useRef , Fragment} from 'react';
/*import { fr } from 'date-fns/locale';
import { format } from 'date-fns';*/
import styled from 'styled-components';
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from 'gatsby';
import _map from 'lodash/map'
// import Swiper core and required modules
import {  Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/autoplay'
import 'swiper/scss/effect-fade'
import { register } from 'swiper/element/bundle';
import { mq, colors, font } from '../../consts/style'; 
import {
    Text,
  } from "../Elements"
/*
const ItemWrapperOld = styled(Link)`
  display:flex;
  position: relative;
  flex-direction:column;

  margin-bottom:1rem;
  background:white;
  justify-content: center;
  align-items:${props => (props.format === 'short'  ? 'flex-start' : 'center' )};
  & div:first-of-type{padding:1rem;}
  
  ${mq.mobile`
    width: 100%;
  `}
`*/

const ItemWrapper = styled(Link)`
  display:block;
  position: relative;
  margin-bottom:4rem;
  background-color:${props => (props.backgroundColor  ? props.backgroundColor : 'inherit' )};
  border-radius:0.8rem;
  height:512px;
 
  ${mq.tablet`
    
  `}
  ${mq.tabletSmall`
    
  `}
 /* &:hover img:not(:first-child) {
    transform:scale(1.1);
    transition:.3s transform ease-in-out;
  }
  & img:not(:first-child) {
    transition:.3s transform ease-in-out;
  }

  &:hover h2 {
    color:${colors.blue};

  }*/

  .swiper  { 
    /*height:512px;*/
    height:100%;
    width:100%;
    border-radius:0.85rem;

    .gatsby-image-wrapper {height:100%;}
}

 &:after {
    border-radius:0.8rem;
    z-index:1;
    display:block;
    content:"";
    width:100%;
    height:100%;
    top:0;
    position:absolute;
    background-image: linear-gradient(
        180deg,
        hsla(0, 0%, 35.29%, 0) 0%,
        hsla(0, 0%, 34.53%, 0.034375) 16.36%,
        hsla(0, 0%, 32.42%, 0.125) 33.34%,
        hsla(0, 0%, 29.18%, 0.253125) 50.1%,
        hsla(0, 0%, 24.96%, 0.4) 65.75%,
        hsla(0, 0%, 19.85%, 0.546875) 79.43%,
        hsla(0, 0%, 13.95%, 0.675) 90.28%,
        hsla(0, 0%, 7.32%, 0.765625) 97.43%,
        hsla(0, 0%, 0%, 0.8) 100%
      );
    }
 
`


const VignetteImage =   styled(GatsbyImage)`
  width:100%;
  border-radius:0.8rem;
  
`

const VignetteInfosWrap = styled.div`

  position: absolute;
  bottom: 0;
  z-index: 2;
  color: white;
  width: 100%;
  padding: 1.6rem;

`
const VignetteTeaser =  styled(Text)`
  line-height: 22px;
  font-size:1.6rem;
  text-align:left;
`
const VignetteNom =   styled.h2`
  font-weight:900;
  text-transform:uppercase;
  font-size:3.6rem;
  line-height: 1.01;
  letter-spacing:0;
  margin-bottom:0;
  margin-top:1rem;
`



// - slideshow : diaporama d'images du spectacle au survol de la vignette

const VignetteProjetPerso = ({item}) => {

   // const swiper = useSwiper()
    const swiperInstance = useRef(null);
   
    /*const handleOnSwiper=(swiper)=>{ 
      console.log("handleOnSwiper")
      console.log("swiper : ", swiper)
      swiperInstance.value = swiper 
      console.log("swiperInstance : ", swiperInstance)
      swiper.autoplay.stop(); //WORKS mais avec du délai
    }*/

   
    useEffect(() => {
      //swiperInstance.current.swiper.slideToLoop(0);

      // manage autoplay on hover
          const instance = swiperInstance.current;
          console.log("useEffect mouse enter leave")
         
          instance.addEventListener('mouseEnter', handleMouseEnter);
          instance.addEventListener('mouseLeave', handleMouseLeave);
          return () => {
            instance.removeEventListener('mouseEnter', handleMouseEnter);
            instance.removeEventListener('mouseLeave', handleMouseLeave);
          };
        
       
    }, []);

      const handleMouseEnter = () => {

       swiperInstance.current.swiper.params.autoplay.delay = 650;
        swiperInstance.current.swiper.autoplay.start();
        
      //  console.log("MouseEnter : ",swiperInstance.current.swiper.params.autoplay.delay)
        //console.log(swiperInstance)
      };
      const handleMouseLeave = () => {
      //  console.log("MouseLeave : autoplay will stop after resetting slideshow",swiperInstance.current.swiper.params.autoplay.delay)

        //if (swiperRef.current) swiperRef.current.autoplay.stop();
        setTimeout(function () {swiperInstance.current.swiper.autoplay.stop();
        }, 175);
        
          swiperInstance.current.swiper.slideToLoop(0);
      //  console.log(swiperInstance)
      };
   
 
  
    return (
       
          
      
          
      <ItemWrapper to={`/spectacles/${item.slug}`} className={''} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    
            <Swiper
             onSlideChange={() => console.log('slide change')}
              ref={swiperInstance}
              loop= {1}
              modules={[ Autoplay, EffectFade]}
              effect = "fade"
              spaceBetween = {0}
              slidesPerView = {1}
           
             
            >  <SwiperSlide key={item.id}>
                <VignetteImage image={item.image.gatsbyImageData} alt={item.nom}/>
               </SwiperSlide>
              {
                _map(item.diaporama, ( image, key) => (      
                  <SwiperSlide key={key}>
                     <GatsbyImage image={image.gatsbyImageData} alt={item.nom}/>
                  </SwiperSlide>
                )
                )
              }

 
    
             

 
            </Swiper>
             <VignetteInfosWrap>
                <VignetteNom $center>{item.nom}</VignetteNom>
                <VignetteTeaser dangerouslySetInnerHTML={{ __html:item.slogan }}/>
              </VignetteInfosWrap>
           
      
         </ItemWrapper>
          
        
       
    )
}
export default VignetteProjetPerso;