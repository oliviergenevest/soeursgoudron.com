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



const TitleSpectacle  = styled.h1`
  color:${colors.dark};
  font-size:3.2rem;
 // font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  line-height: 38px;
  margin-bottom: 0;
`



const Home = ({ data, pageContext, location }) => {

  const {  titre, slug, contenu, seoMetaTags} = data.page;

  //console.log(content.value)
  return (
    <Fragment>
      <Seo meta={seoMetaTags} />
      <PageWrapper>

        <PageInner>
        {!(location.pathname === '/' || location.pathname ==='/en' || location.pathname ==='/en/') && 
          <Reveal keyframes={fadeInUp} ><h1>{titre}</h1></Reveal>
        }
        <h1>HOMEPAGE TEMPLATE</h1>
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