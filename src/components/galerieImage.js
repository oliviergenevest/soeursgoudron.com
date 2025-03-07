import React , { useState } from 'react';
import styled from 'styled-components';
import { colors, mq } from '../consts/style'; 
import { GatsbyImage } from 'gatsby-plugin-image'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

/*
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
*/


 
const GalerieImage = ({images}) => {
  //console.log("images",images)
  const [index, setIndex] = useState(-1);



  const items = images.map( asset  => {
    return {src: asset.gatsbyImageData.images.fallback.src,
        width:asset.gatsbyImageData.width,
        height:asset.gatsbyImageData.height,
        srcset:asset.gatsbyImageData.images.fallback.srcSet
    } 
})
 // console.log("items : " , items)
 

  return (
  
     <>
      <RowsPhotoAlbum
        photos={items}
        targetRowHeight={250}
        onClick={({ index: current }) => setIndex(current)}
      />

      <Lightbox
        index={index}
        slides={items}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
      </>
  )

}

export default GalerieImage