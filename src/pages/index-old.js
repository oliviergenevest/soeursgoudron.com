import React, { Fragment} from 'react';
import { graphql } from 'gatsby';
//import {useSpring, animated} from '@react-spring/web';
import _map from 'lodash/map';
import { FormattedMessage} from 'react-intl';
import styled from 'styled-components';
/*import { Icon } from '@iconify/react';
import FormatDate  from '../components/formatDate'*/
import { colors ,mq} from '../consts/style';
import {Reveal} from "react-awesome-reveal"
import { fadeInUp, fadeInDown } from "../style/animations"
import { GatsbyImage } from 'gatsby-plugin-image';
import {
  
  Spacer,
  Flex,
  SectionTitle,
} from '../components/Elements';
import  BtnPrimary  from '../components/buttons/ButtonRounded';
import  NavHomepage  from '../components/navHomepage';
import Seo from '../components/Seo';
import VignetteSpectacleHomepage from '../components/spectacles/vignetteSpectacleHomepage';
import  AgendaItem  from '../components/agenda/agendaItem';

export const indexQuery = graphql`
 query datoCmsHomepage {
    datoCmsHomepage{
      slogan
      
      logo {
        title
        gatsbyImageData (
          width:330,
          placeholder: BLURRED,
          forceBlurhash: false,
        )
      }
      spectacles {
        slug
        nom
        teaser
        
        image {  
          gatsbyImageData(
            placeholder: BLURRED,
            forceBlurhash: false,   
           
             imgixParams: {
                q:80,
                auto: "compress",
                h:"350",
                w: "350",
                crop: "focalpoint",
                fit:"crop" 
              }
          )
        }
    }
     
     
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    


    agenda: allDatoCmsAgenda( 
       filter: {isFuture: {eq: true}} ,
       sort: {dateDebutEvenement: ASC} , 
       limit:6){
      nodes {
        id
        ville
        details
        dateDebutEvenement
        dateFinEvenement
        spectacle {
          nom
          slug
          background { hex }
          
        }
      }
    }
  }
`;


 

const AgendaListWrapper =   styled.div`
display:flex;
flex-direction:column;
width:100%; 
margin-top:2rem;
`


const StyledGrid2Col = styled.div`
  display: grid;
  height:auto;
  
  background:white;
  grid-template-columns: 1fr; 
  grid-template-areas: "edito" "logo";
                        
  ${mq.tablet_up`
   // max-height:100vh;
    
    grid-template-columns: 3fr 2fr;
    align-items: stretch; // 100% de la hauteur pour les 2 colonnes
    justify-content:center;
    grid-template-areas: "edito logo";
 `}
      justify-content:center;
      align-items:center;
      ${mq.tablet`
          max-width:100%;
      `}
     
      overflow:hidden;
`

const IntroNewsEdito = styled.div`
grid-area: edito;

padding:4rem 4rem 4rem 6rem;
display:flex;
flex-direction: column;
align-items:center;
justify-content:flex-start;



`
const IntroColDroite = styled.div`

padding:3rem 4rem 4rem 4rem;
width:100%;
display:flex;
align-items:center;
flex-direction:column;
background:#f8f8f8;
  ${mq.tablet`
          padding:3rem;
  `}
`

const LogoWrapper = styled.div`
 display:flex;
 flex-direction:column;
 align-items:center;
 ${mq.tablet`         
      gap:1rem;
  `}
`


const Teaser = styled.h1`
  color:${colors.dark};
  font-family: 'Raleway';
  font-weight: 700;
  font-size:2.4rem; 
  text-align:center;
  max-width:862px;
  margin-top:2rem;
`;

const Logo = styled(GatsbyImage)`
  //width:100%;
  z-index:1;
`;



const FlexListeSpectacle = styled(Flex)`
  column-gap:.5rem;
  align-items:flex-start;
  margin-bottom:2rem;
  padding-top:6rem;
  padding-bottom:2rem;
  flex-wrap:wrap;
  justify-content:center;
  ${mq.tablet`
          
  padding-top:6rem;
         
      `}
  ${mq.tabletSmall`
      display:none;         
  `}
  
`;



const IndexPage = ({ data, pageContext, location }) => {


  const {
    slogan,
    logo,
    spectacles,
    } = data.datoCmsHomepage;
  const { nodes } = data.agenda; // toutes les dates

 
  const dateDuJour = new Date();
  dateDuJour.setHours(0, 0, 0, 0);
  function dateFuture(itemAgenda) {
    return (new Date(itemAgenda.dateDebutEvenement) >= dateDuJour || new Date(itemAgenda.dateFinEvenement) >= dateDuJour )  ? itemAgenda : null;
  }
  var dateFutures = nodes.filter(dateFuture);


  return (
    <Fragment>  
      
        <StyledGrid2Col>  
              
          <IntroNewsEdito>

            <NavHomepage/>
            <Reveal keyframes={fadeInUp}  triggerOnce>
            <LogoWrapper>
             
                <Logo image={logo.gatsbyImageData} alt="Cie Les Soeurs Goudron" />
             
            </LogoWrapper>
            </Reveal>
            <Teaser>{slogan}</Teaser>
            <Reveal keyframes={fadeInDown}  triggerOnce>
            <FlexListeSpectacle>
              { _map(spectacles, (item, i) => (
                    <VignetteSpectacleHomepage key={i} item={item} format="full"/>
              ))}
            </FlexListeSpectacle>
           </Reveal>
          </IntroNewsEdito>
       
          <IntroColDroite>
              <Reveal keyframes={fadeInDown}  triggerOnce>
                <SectionTitle>Agenda</SectionTitle>
              </Reveal>
              <Reveal keyframes={fadeInUp}  triggerOnce>
                <AgendaListWrapper>
                  { _map(dateFutures.slice(0,6), (item, i) => (
                      <AgendaItem key={i} item={item} displayName={true} path="spectacles/"/> 
                  
                  ))}
                </AgendaListWrapper> 
                <Spacer/>
              <BtnPrimary to={`/agenda`}><FormattedMessage id="btn__toutes les dates"/></BtnPrimary>
              </Reveal> 
          </IntroColDroite>  
          
        </StyledGrid2Col>
        
      
  
     
    </Fragment>
  );
}


export default IndexPage

export const Head = (props) => (

  <Seo meta={props.data.datoCmsHomepage.seoMetaTags} />

)