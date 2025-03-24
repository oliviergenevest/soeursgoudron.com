import React from 'react';
import styled from 'styled-components';
import { colors, mq } from '../consts/style'; 
import { GatsbyImage } from 'gatsby-plugin-image'

const ItemWrapper = styled.div`
    
    display:flex;
    position: relative;
    flex-direction:row;
    width:100%;
    gap:3.2rem;
    align-items:center;
    margin-top:3.2rem;
    background-color:white;
    border-radius: 1.6rem;
    ${mq.mobile`
      flex-direction:column;
      gap:0.8rem;
    `}
  `


const Texte =   styled.div`
 flex-basis: 100%;
 ${mq.mobile`
      text-align: center;
    `}
 
`

const Image =   styled.div`
  flex-basis: 250px;
 border-radius: 3.2rem;

  background-color:#fff;
  ${mq.mobile`
       flex-basis: 200px;
    `}
    .gatsby-image-wrapper{border-radius: 3.2rem;}
`



 
const ContactItem = ({data}) => {
  //console.log(data)
  return (
  
        <ItemWrapper >
        
         <Image>
            <GatsbyImage image={data.image.gatsbyImageData} alt=""/>
         </Image>
         
           <Texte dangerouslySetInnerHTML={{__html:data.texte}} />
            
          
     </ItemWrapper>
  )
}
export default ContactItem