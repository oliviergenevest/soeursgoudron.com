import React, { Fragment } from 'react';
import {  graphql } from 'gatsby';
import styled from 'styled-components';
import _map from 'lodash/map';

import {  PageWrapper, PageInner,Spacer,Flex, ArrowLeftLink, ArrowRightLink, ArrowLeftIcon, ArrowRightIcon,Text } from '../components/Elements';
import { colors, mq } from '../consts/style';
import Seo from '../components/Seo';
import { GatsbyImage } from 'gatsby-plugin-image';
import {StructuredText} from "react-datocms";
import Video from '../components/video';

import Agenda from '../components/agenda/agenda';
import ContactItem from '../components/ContactItem';
import Personnage from '../components/personnage';

import BtnRounded from '../components/buttons/ButtonRounded';
import {Reveal} from "react-awesome-reveal"
import { fadeInDown, fadeInUp } from "../style/animations"

import ListeSpectacles from '../components/spectacles/listeSpectacles';


const ListeMembres = ({membres}) => {
  //console.log(membres)

  return (membres.length > 0) && 
  <Liste>
   { membres.map((membre, i) => {
      return (  <Personnage data={membre} key = {i} /> )
    }
  
  )}
  </Liste>
}

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

const Liste = styled.div`
 display:flex;
  flex-wrap: wrap;
  //justify-content: center;
  width:100%; 
  gap:.8rem;
  margin:3.2rem 0;
   & .gatsby-image-wrapper {
     border-radius:.8rem;
     }
   ${mq.mobile`
     flex-basis:45%;
    
    `}
`


const Page = ({ data, pageContext, location }) => {

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
        <Reveal keyframes={fadeInDown} >
              {(contenu.blocks.length > 0 || contenu.value) && <StructuredText
                  data={contenu}
                  renderBlock={({record}) => {
                  
                    if (record.__typename === "DatoCmsContactItem") {
                      return <ContactItem data={record}/>
                    }
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
                    if (record.__typename === "DatoCmsListePersonnage") {
                      //console.log(record.spectacle)
                      return <ListeMembres membres={record.personnages}/>
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
                 /* renderInlineRecord={({ record }) => {
                    switch (record.__typename) {
                      case 'DatoCmsAlbum':
                        return <Album data={record}/>;
                      default:
                        return null;
                    }
                  }}*/
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
           ...on DatoCmsContactItem {
            id: originalId
            texte
            image {
              gatsbyImageData (
                width:250
              )
            } 
          }         
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
          ...on DatoCmsVideo {
            id: originalId
            video { 
              url
            }
          }    
            
          ...on DatoCmsListePersonnage {
            id: originalId
            personnages {
              ...Personnage
            }
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


export default Page;
 

export const Head = (props) => (
  <Seo meta={props.data.page.seoMetaTags} />
)