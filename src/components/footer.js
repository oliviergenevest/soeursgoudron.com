import React from 'react';
import styled from 'styled-components';
import Link from './ExtendedLink';
import { GatsbyImage } from 'gatsby-plugin-image';
import { colors, mq, font } from '../consts/style';
import { graphql, useStaticQuery } from "gatsby"
import {StructuredText} from "react-datocms"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const WrapperFooter = styled.div`
  background:white;
  display: flex;

  justify-content: center;
  align-items: center;
  position:relative;
  padding:4rem;
 justify-content:space-between;
 ${mq.tabletSmall`
           flex-direction:column;
          `}
`;



const FooterLeft = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:center;
//gap:0.8rem;
   text-align: left;
   a {
   flex-shrink:0;
    padding:1.6rem;
    // color:${colors.dark};
  
       font-size: 4.5rem;
       &:hover {
        background:#f9f9fc;
       }
    }
`

const FooterRight = styled.div`
 
 
  a {
     color:${colors.dark};
     &:hover {
     text-decoration:underline;
     }
  }
  ${font.text};
  font-size:1.4rem;
  color:${colors.dark};
  text-align: right;
  ${mq.tabletSmall` text-align:center;`}
`;




const Footer= ({ location }) => {

  /*const today = new Date();
  const year = today.getFullYear();
*/

  const data = useStaticQuery(graphql`
    query footer {
        datoCmsAsset(basename: {eq: "logo-la-curieuse-small"}) {
          gatsbyImageData (
          
              imgixParams: {    
                auto: "format",
                w: "50"
              }
            )
          id
        }
        datoCmsFooter {
           footer
           structuredFooter {
            value
            blocks
            links {
              __typename 
              ... on DatoCmsPage {
                id: originalId
                titre
                slug
              }

            }
           }
           socials {
            lien
            icone
          }
        }
    }
  `)
//console.log(data.datoCmsFooter.structuredFooter)

  return (
    <WrapperFooter>   
      
    <FooterLeft>
      <a href="https://www.la-curieuse.com" target="_blank" rel="noopener noreferrer" title="La Curieuse" key={data.datoCmsAsset.id}>
        <GatsbyImage image = {data.datoCmsAsset.gatsbyImageData} alt="La Curieuse" />
      </a>
    
      {data.datoCmsFooter.socials.map((socialIcon, id) => 
        <a href={socialIcon.lien} target="_blank" rel="noopener noreferrer" key={id} title={JSON.parse(socialIcon.icone).iconName}>
          <FontAwesomeIcon icon={JSON.parse(socialIcon.icone)} />
        </a>
      )}
     
    </FooterLeft>
      <FooterRight>
        <StructuredText
          data={data.datoCmsFooter.structuredFooter}
          renderInlineRecord={({ record }) => {
            switch (record.__typename) {
              case 'DatoCmsPage':
                return <Link to={`/${record.slug}`}>{record.titre}</Link>;
              default:
                return null;
            }
          }}
        />
      </FooterRight>
    </WrapperFooter>
  );
};

export default Footer;
