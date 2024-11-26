import React from "react";
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { colors } from '../consts/style';
import ModalWindow from "./modal/modal-window";
import { useModalWithData } from '../hooks/modal-hook.js'
import { graphql } from "gatsby"
import { StructuredText } from 'react-datocms'
import Video from "./video.js";

const WrapperPersonnage = styled.div`
    
 
    background:white;
    display:inline-flex;
    flex-direction:column;,
    align-items:center;
    padding:.8rem;
 // border:1px dashed transparent;
    
    span {
        max-width:150px;
        text-align:center;
    }

    transform :  translate3d(0 , 0 , 0) ;
    transition-duration:.1s;
    transition-property: transform;
    transition-timing-function: ease-in-out;
    &:hover { 
        cursor:pointer; 
        transform :  translate3d(0 ,-1rem , 0) ;
        transition-duration:.2s;
        transition-property: transform;
        transition-timing-function: ease-in-out;
         //  border:1px dashed ${colors.grey};
         
    }
   
`

const Image = styled(GatsbyImage)`
    width:150px;
    height:150px;
`


export const personnageFragment = graphql`
  fragment Personnage on DatoCmsPersonnage {
        nom
        image {
            gatsbyImageData(
                placeholder: BLURRED,
                forceBlurhash: false,   
                width:500,
            )
        } 
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
                ...on DatoCmsVideo {
                    id: originalId
                    video {
                        url
                    }
                }  
            }
        }
    }
 `
const Personnage = ({ data }) => {
    const {
        modalOpen,
       /* selected,*/
        setSelected,
        setModalState
      } = useModalWithData()
      //console.log("data perso : ",data)
      return (
        <>
        <WrapperPersonnage  
            onClick={(event) => {
                event.preventDefault() 
                setSelected({data})
                setModalState(true)
            }}
         >
        <Image image={data.image.gatsbyImageData} alt={data.nom} />
            <span>{data.nom} </span>

           
        </WrapperPersonnage>
         <ModalWindow isActive={modalOpen}     handleClose={() => setModalState(false)} >
         {data.nom} <br/>
         <Image image={data.image.gatsbyImageData} alt={data.nom} />
         { (data.contenu.blocks.length > 0 || data.contenu.value ) && 
            <StructuredText
                data={data.contenu}
                renderBlock={({record}) => {
                    
                    
                    if (record.__typename === "DatoCmsImage") {
                    return <GatsbyImage image={record.image.gatsbyImageData} alt=""/>
                    }
                    if (record.__typename === "DatoCmsVideo") {
                    return <Video videoSrcURL={record.video.url} videoTitle={record.video.title}/>
                    }
                    
    
                    return (
                    <>
                        <p>bloc inconnu : {record.__typename}</p>
                        <pre>{JSON.stringify(record, null, 2)}</pre>
                    </>
                    )
                }}
            />
        }
     </ModalWindow>
     </>
        )
}

export default Personnage