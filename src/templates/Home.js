import React, { Fragment } from 'react';
import {  graphql } from 'gatsby';
import styled from 'styled-components';
import _map from 'lodash/map';

import {  PageWrapper, PageInner,Spacer,Flex, ArrowLeftLink, ArrowRightLink, ArrowLeftIcon, ArrowRightIcon,Text } from '../components/Elements';
import { colors, mq } from '../consts/style';
import Seo from '../components/Seo';
import { GatsbyImage } from 'gatsby-plugin-image';
import {StructuredText} from "react-datocms";
import Headroom from 'react-headroom';

import Agenda from '../components/agenda/agenda';


import BtnRounded from '../components/buttons/ButtonRounded';
import {Reveal} from "react-awesome-reveal"
import { fadeInDown, fadeInUp } from "../style/animations"

import ListeSpectacles from '../components/spectacles/listeSpectacles';
import Header from '../components/header';




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
justify-content:center;
  gap:3.2rem;
  position:relative;
  margin:0; 
  height:calc(100vh - 130px);
  width:100%;
  min-width:100%;
  min-height:384px;
  text-align:center;
  background:white;
  .logo {
    mix-blend-mode: multiply;
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

        <GatsbyImage image={data.backgroundhome.gatsbyImageData} className="bg_image" alt="Logo Compagnie Les Soeurs Goudron"/>
               <GatsbyImage image={data.logo.gatsbyImageData} className="logo" alt="Logo Compagnie Les Soeurs Goudron"/>

     
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
        width:200,
            imgixParams: {    
            
              auto: "compress",
            }
          )
        id
      }

     backgroundhome: datoCmsAsset(basename: {eq: "fond-sg-accueil-1"}) {
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