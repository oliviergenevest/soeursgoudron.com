import React, { Fragment } from 'react';
import {  graphql } from 'gatsby';
import Link from '../components/ExtendedLink';
import styled from 'styled-components';
import _map from 'lodash/map';
import { FormattedMessage} from 'react-intl';
import {  PageWrapper, PageInner,Spacer,Flex, ArrowLeftLink, ArrowRightLink, ArrowLeftIcon, ArrowRightIcon,Text } from '../components/Elements';
import { colors, mq } from '../consts/style';
import { Icon } from '@iconify/react';
import Seo from '../components/Seo';
import Boop from '../components/boop';
import { GatsbyImage } from 'gatsby-plugin-image';
import {StructuredText} from "react-datocms";
import Video from '../components/video';
import Album from '../components/album';
import {Reveal} from "react-awesome-reveal"
import { fadeInDown, fadeInUp } from "../style/animations"
import  AgendaItemLight  from '../components/agenda/agendaItemLight';
import  ReadMore  from '../components/readMore/readMore';
// import Swiper core and required modules
import { Navigation, Autoplay, FreeMode, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import Personnage from '../components/personnage';


const PageInnerProject = styled.div`

  width: 100%;
  position: relative;
  display: grid;

  grid-template-columns: 1fr 2fr;
  grid-template-areas: "main" "encart";
  grid-template-columns:  minmax(0, 2fr) minmax(350px, 1fr) ;
  grid-gap: 5rem;
align-items: start;
  ${mq.tablet` 
  grid-template-columns: 1fr;
  grid-template-columns:minmax(0, 1fr);
  grid-gap:1rem;
  grid-template-areas: "main" "encart";
  `}
`

const ColEncart = styled.div`

  background-color: #f8f8f8;
  padding:3.5rem;
  ${mq.tabletSmall` 
    padding:2rem;
    grid-area: encart;
  `}

`

const DiaporamaFullWidth = styled.div`
z-index:0;
display: block;
position:relative;
width:calc(100% + 8rem);
margin-left:-4rem;
margin-right:-4rem;
margin-top:-4rem;
margin-bottom:12rem; 
${mq.tabletSmall` 
    width:calc(100% + 4rem);
  `}


 .swiper { 
  width: 100%;
  max-height: 522px;
  min-height: 0;
  min-width: 0;
 }
  .swiper-slide .gatsby-image-wrapper  {
     transition:all .4s ease;
     height:522px;
  }
  .swiper-slide-active .gatsby-image-wrapper {
    transition:all .4s ease;
  }

  .swiper-slide {
      transition:opacity .4s ease;
      width: auto;
      flex-shrink: 0;
      display: block;
      height: 100%;
      max-height: 100%;
  }
   .swiper-slide-active {
    opacity:1;
    transition:opacity .4s ease;
   }

  .swiper-button-next{  
    display:none;
  }

   .swiper-button-prev {
    display:none;
   }

`;

const ArrowLeftLinkNav = styled(ArrowLeftLink)`
  position:absolute;
  bottom:50%;
  left:1rem;
  z-index:1;
  cursor:pointer;
  transform: translate3d(0, 50%, 0);
  &.swiper-button-disabled{
    opacity:0;
  }
`;

const ArrowRightLinkNav = styled(ArrowRightLink)`
  position:absolute;
  bottom:50%;
  right:1rem;
  transform: translate3d(0, 50%, 0);
  z-index:1;
  cursor:pointer;
  &.swiper-button-disabled{
    opacity:0;
  }
`

const HeaderSpectacle  = styled(Flex)`
  justify-content:space-between;
  gap:5rem;
  align-items: flex-start; 
  margin-bottom:5rem;
  ${mq.tabletSmall` 
    gap:1rem;
    margin-bottom:1rem;
  `}
`

const DecoSpectacle  = styled.div`
  mix-blend-mode: multiply;
  position:absolute;
  height:500px;
  height:auto;
  left: calc(50% - 9px);
    transform: translateX(-50%);
    width: 100vw;
  ${mq.tabletSmall` 
    
  `}
`
const TitleSpectacleWrapper  = styled.div`
  
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;

  left: 7rem;
  position: absolute;
  z-index: 2;
  background: #ffffff;
  padding: 1.6rem 3.2rem 1.6rem 0.8rem;
  bottom: 1.6rem;
  border-radius:0.8rem;
   ${mq.tabletSmall` 
    position:relative;
    border-radius:0;
    left:0;
  `}
`

const TitleSpectacle  = styled.h1`
  color:${colors.dark};

  //font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  line-height: 38px;
  margin-bottom: 0;
  padding-bottom:.8rem;
`




const TeaserSpectacle  = styled.div`
  font-style: italic;
 
  font-size: 18px;
  line-height: 140%;
  color:${colors.dark};
   font-weight: 500;
  /*border-left: 2px dashed ${colors.greyLight};
  padding-left: 1.6rem;
  margin-top: 1.6rem;*/
 
  ${mq.tabletSmall` 
   text-align:left;
   max-width:100%;
  `}
  
`

const AgendaListWrapper =   styled.div`
  display:flex;
  flex-direction:column;
  width:100%; 
  /*gap:5rem;*/
  margin-top:1rem;
`

const ListePersonnages =   styled.div`
  display:flex;
  flex-wrap: wrap;
  width:100%; 
  gap:.8rem;
  margin-top:1.6rem;
   ${mq.mobile` 
   justify-content: center;
  `}
`

const SpectacleSplash  = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  position:relative;
  margin:0;
  height:calc(100vh - 130px);
  width:100%;
  min-width:100%;
  text-align:center;
  background:white;

  .bg_image {
    position:absolute!important;
    width:100%;
   // height:100%;
    top:0;
    left:0;
    right:0;
  }
`
const TitleSplash  = styled.div`
  background:#ffffff;
  padding:3.2rem;
  z-index:1;
  border-radius:0.8rem;
`


const Spectacle = ({ data, pageContext, location }) => {

  const {  nom, teaser, content, slogan, diaporama, encart,seoMetaTags, backgroundImage} = data.spectacle;
/*
  const prevRef = useRef(null);
  const nextRef = useRef(null);*/
  //console.log(content.value)
  return (
    <Fragment>
      <Seo meta={seoMetaTags} />
      <SpectacleSplash>
      <GatsbyImage objectPosition="0 0" image={backgroundImage.gatsbyImageData} alt="" className="bg_image"/>
      <TitleSplash>
                      
            <Reveal keyframes={fadeInUp} ><TitleSpectacle>{nom}</TitleSpectacle></Reveal>
            <Reveal keyframes={fadeInDown} ><TeaserSpectacle dangerouslySetInnerHTML={{ __html:slogan }} /></Reveal>
          
      </TitleSplash>
      
      </SpectacleSplash>
      <PageWrapper>
        
        <DiaporamaFullWidth>
          <Swiper
            modules={[Navigation, FreeMode, Keyboard, Autoplay]}
            navigation={{
              prevEl:'.prev',
              nextEl:'.next',
            }}
            spaceBetween={5}
            slidesPerView={1}
            keyboard={{enabled:true,}}
            grabCursor
            
            
            breakpoints={{
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
                spaceBetween : 2,
              },
              // when window width is >= 1024px
              1024: { 
                slidesPerView: 2.5,
                spaceBetween : 3,
              },
            }}
           
              >
              {
                  _map(diaporama, ( image, key) => (      
                    <SwiperSlide key={key}>
                       <GatsbyImage image={image.gatsbyImageData} alt=""/>
                    </SwiperSlide>
                  )
                  )
                }

                      <ArrowLeftLinkNav className='prev' >
                        <Boop x={-3}  timing={200} >
                          <FormattedMessage id="previous">{txt =><ArrowLeftIcon title={txt}/>}</FormattedMessage>
                        </Boop>
                      </ArrowLeftLinkNav>
                      <ArrowRightLinkNav className='next' >
                        <Boop x={3}  timing={200} >
                          <FormattedMessage id="next">{txt =><ArrowRightIcon title={txt}/>}</FormattedMessage>
                        </Boop>
                      </ArrowRightLinkNav>
              </Swiper>

              <TitleSpectacleWrapper>
                <Link to='./..' title="retour à la liste des spectacles">
                  <Boop x={-3}  timing={200} >
                    <Icon icon="ion:caret-back-outline" style={{color: colors.orange, fontSize: '3.2rem'}}/>
                  </Boop> 
                </Link>
                <div>              
                  <Reveal keyframes={fadeInUp} triggerOnce ><TitleSpectacle>{nom}</TitleSpectacle></Reveal>
                  <Reveal keyframes={fadeInDown} triggerOnce><TeaserSpectacle dangerouslySetInnerHTML={{ __html:teaser }} /></Reveal>
                </div> 
            </TitleSpectacleWrapper>
            {/* <DecoSpectacle> <GatsbyImage image={backgroundImage.gatsbyImageData} alt=""/></DecoSpectacle> */}
        </DiaporamaFullWidth>
          
        <PageInner>
        
          <div>Home / Spectacles / {nom}</div>
  
          {/*<HeaderSpectacle>
            
           
       
          </HeaderSpectacle> */}
          <PageInnerProject>
 
            <div>         
              {(content.blocks.length > 0 || content.value) && <StructuredText
                  data={content}
                  renderBlock={({record}) => {
                    if (record.__typename === "DatoCmsReadmoreTexte") {
                      return <ReadMore id={record.id} amountOfWords={record.nombreDeMots} text={record.texte}/>
                    
                  }
                    if (record.__typename === "DatoCmsImage") {
                      return <GatsbyImage image={record.image.gatsbyImageData} alt=""/>
                    }
                    if (record.__typename === "DatoCmsVideo") {
                      return  <Video
                      videoSrcURL={record.video.url}
                      //videoSrcURL={record.video.url.replace('watch?v=', 'embed/')}
                      videoTitle={record.video.title}
                      />
                  }
                  

                    return (
                      <>
                        <p>bloc inconnu</p>
                        <pre>{JSON.stringify(record, null, 2)}</pre>
                      </>
                    )

                  }}
                  renderInlineRecord={({ record }) => {
                    switch (record.__typename) {
                      case 'DatoCmsAlbum':
                        return <Album data={record}/>;
                      default:
                        return null;
                    }
                  }}
                />
              }

    
           <h2>Les personnages</h2>
           <ListePersonnages>
              {(data.spectacle.personnages.length > 0) &&
                data.spectacle.personnages.map((personnage, i) => {
                  return (  <Personnage data={personnage} key = {i} /> )
                }
              
              )}
            </ListePersonnages>
                  
            </div>
          
            
            <ColEncart>
             <Text dangerouslySetInnerHTML={{ __html:encart }} style={{"textAlign":"left"}}/>
            </ColEncart>
        </PageInnerProject>


      

        {(data.dates.nodes.length > 0) &&  
                    <><Spacer/>
                      <h2>Les prochaines dates </h2>   
                      <br/>
                      <AgendaListWrapper>
                      
                    { data.dates.nodes.map((item, i) => {
                        return (  <AgendaItemLight key={i} item={item} /> )
                    })
                    }
                    
                      </AgendaListWrapper>
                    </>
                  }
        </PageInner>  
        <Spacer/>
      </PageWrapper>
    </Fragment>
  );
};

export const projectQuery = graphql` 
  query($slug: String!) {
    dates: allDatoCmsAgenda(filter: {spectacle: {slug: {eq: $slug}}, isFuture:{eq: true}}, sort: {dateDebutEvenement: ASC}){
      nodes {
        id
        ville
        details
        dateDebutEvenement
        dateFinEvenement
       
      }
    }
    spectacle: datoCmsSpectacle(slug: { eq: $slug }) {
      nom
      slogan
      teaser
      encart
      diaporama {
        gatsbyImageData (
        
           imgixParams: {
                
                auto: "compress",
                h:"522",
                w: "784",
                crop: "focalpoint",
                fit:"crop" 
              }
        )
      }
      teaser 
      content {
        value      
        blocks {
          __typename
          ...on DatoCmsImage {
            id: originalId
            image {
              gatsbyImageData (
                width:770
              )
            } 
          }         
          ...on DatoCmsVideo {
            id: originalId
            video {
              url
            }
          }         
          ...on DatoCmsReadmoreTexte {
           ...ReadmoreTexte

          }         
        }
      }
      
      personnages {
        ...Personnage
      }
      image {
        gatsbyImageData(
          placeholder: BLURRED,
          forceBlurhash: false,   
          width:825,
        )
      } 
      backgroundImage {
        gatsbyImageData(
          placeholder: BLURRED,
          forceBlurhash: false,   

        )
      } 
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }        
    }
  }
`;


export default Spectacle;