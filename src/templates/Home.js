import React, { Fragment } from 'react';
import {  graphql } from 'gatsby';
import styled from 'styled-components';
import _map from 'lodash/map';

import {  PageWrapper, PageInner,Spacer,Flex, ArrowLeftLink, ArrowRightLink, ArrowLeftIcon, ArrowRightIcon,Text } from '../components/Elements';
import { colors, mq } from '../consts/style';
import Seo from '../components/Seo';
import { GatsbyImage } from 'gatsby-plugin-image';
import {StructuredText} from "react-datocms";


import Agenda from '../components/agenda/agenda';


import BtnRounded from '../components/buttons/ButtonRounded';
import {Reveal} from "react-awesome-reveal"
import { fadeInDown, fadeInUp } from "../style/animations"

import ListeSpectacles from '../components/spectacles/listeSpectacles';




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



const HomeSplash  = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  flex-basis:auto;
  gap:3.2rem;
  position:relative;
  margin:0;
  height:100vh;
  width:100%;
  min-width:100%;
  text-align:center;
  background:white;
  .logo {
    mix-blend-mode: multiply;
    margin-top:10vh;
  }
  .bg_image {
   
    position:absolute!important;
    width:100%;
    height:100%;
    top:0;
    left:0;
    right:0;
  }
`



const Home = ({ data, pageContext, location }) => {

  const {  titre, slug, contenu, seoMetaTags} = data.page;

  //console.log(content.value)
  return (
    <Fragment>
      <Seo meta={seoMetaTags} />
      <HomeSplash>
      <GatsbyImage objectPosition="0 0" image={data.backgroundImage.gatsbyImageData} alt="" className="bg_image"/>

        <GatsbyImage image={data.logo.gatsbyImageData} className="logo" alt="Logo Compagnie Les Soeurs Goudron"/>
        <h1>MENU</h1>
      </HomeSplash>
     
      <PageWrapper>

        <PageInner>
       
        
        <Reveal keyframes={fadeInDown} >
              {(contenu.blocks.length > 0 || contenu.value) && <StructuredText
                  data={contenu}
                  renderBlock={({record}) => {

                    if (record.__typename === "DatoCmsAgendaGlobal") {
                      return <Agenda settings={record} />
                    }
                    if (record.__typename === "DatoCmsBouton") {
                      return <BtnRounded   external={record.lienExterne === true ? +true : +false} to={record.lienExterne === true ? record.lien : `/${record.lien}`} >{record.texte}</BtnRounded>
                    }
                    if (record.__typename === "DatoCmsListeSpectacle") {
                      //console.log(record.spectacle)
                      return <ListeSpectacles spectacles={record.spectacle}/>
                    }
                   
                    if (record.__typename === "DatoCmsImage") {
                      return <GatsbyImage image={record.image.gatsbyImageData} alt=""/>
                    }

                    return (
                      <>
                        <p>bloc inconnu</p>
                        <pre>{JSON.stringify(record, null, 2)}</pre>
                      </>
                    )

                  }}
                
                />
              }
        </Reveal>

        </PageInner>  
        <Spacer/>
      </PageWrapper>
    </Fragment>
  );
};

export const projectQuery = graphql` 
  query($slug: String!) {
    logo: datoCmsAsset(basename: {eq: "logo-sg"}) {
        gatsbyImageData (
        width:400,
            imgixParams: {    
              auto: "compress",
              
            }
          )
        id
      }

    backgroundImage: datoCmsAsset(basename: {eq: "bingo-guirlande-confetti-2-1"}) {
        gatsbyImageData (
            imgixParams: {    
              auto: "compress",
              
            }
          )
        id
      }

    page: datoCmsPage(slug: { eq: $slug }) {
      titre
      slug
      contenu {
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
          ...on DatoCmsBouton {
            id: originalId
            texte
            lien
            lienExterne
          }         
        
      
             
          ...on DatoCmsAgendaGlobal {
            id: originalId
            afficherLeNomDuSpectacle
            datesPassees
            nombreDeDates
          }     

          ...on DatoCmsListeSpectacle {
            id: originalId
            spectacle {
              id
              slug
              nom
              teaser
              slogan
              featured
              diaporama {
                gatsbyImageData (
                
                  imgixParams: {
                        
                    auto: "compress",
                    h:"812",
                    w: "1204",
                    crop: "focalpoint",
                    fit:"crop"
                       
                  }
                )
              }
              image {
                gatsbyImageData (  
                  placeholder: BLURRED,
                  forceBlurhash: false,   
                  imgixParams: {
                    auto: "compress",
                    h:"812",
                    w: "1204",
                    crop: "focalpoint",
                    fit:"crop"
                  } 
                )
              }
            }
          }

        }
      }
     
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }        
    }
  }
`;


export default Home;
 

export const Head = (props) => (
  <Seo meta={props.data.page.seoMetaTags} />
)