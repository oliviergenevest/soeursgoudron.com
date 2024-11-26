import React from 'react';
import styled from 'styled-components';
import { colors } from '../consts/style'; 
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
    
  `


const Texte =   styled.div`
 flex-basis: 100%;
`

const Image =   styled.div`
  flex-basis: 250px;
  border-radius:50%;
  background-color:#f8f8f8;
`



 
const ContactItem = ({data}) => {
  console.log(data)
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