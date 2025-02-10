import React from "react";
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { colors, mq } from '../consts/style';
import ModalWindow from "./modal/modal-window";
import { useModalWithData } from '../hooks/modal-hook.js'
import { graphql } from "gatsby"
import { StructuredText } from 'react-datocms'
import Video from "./video.js";

const WrapperPersonnage = styled.div`  
    border-radius:.8rem;
   // background:white;
    display:inline-flex;
    flex-direction:column; 
    padding:.8rem;
    margin-bottom: .8rem;
    ${mq.mobile`
        flex-basis:45%;
    `}
    
    span {
        max-width:100%;
        text-align:center;
    }

    transform :  translate3d(0 , 0 , 0) ;
    transition-duration:.1s;
    transition-property: transform;
    transition-timing-function: ease-in-out;
    &:hover { 
        cursor:pointer; 
        transform :  translate3d(0 ,-.8rem , 0) ;
        transition-duration:.2s;
        transition-property: transform;
        transition-timing-function: ease-in-out; 
    }
`

const StyledContent = styled.div `
    display:flex;
    flex-wrap:nowrap;
    flex-direction:row;
    gap:3.2rem;
    align-items:flex-start;
    width:100%;
    ${mq.tabletSmall`
        flex-direction:column;
          flex-wrap:wrap;
        gap:1.6rem;
        display:flex;
    `}

`


const Image = styled(GatsbyImage)`

    width:150px;
    height:150px;
    height:auto;
    ${mq.mobile` 
      width:100%;
      height:auto;
    `}
`

const ModalImage = styled(GatsbyImage)`
flex-shrink:0;
    width:250px;
    //height:150px;
    align-items:flex-start; 
    ${mq.tabletSmall` 
      width:100%;
      height:auto;
    `}
`
const Content  = styled.div`
    padding-top:3.2rem;
    width:100%;
`

export const personnageFragment = graphql`
  fragment Personnage on DatoCmsPersonnage {
        nom
        image {
            gatsbyImageData(
                placeholder: BLURRED,
                forceBlurhash: false,   
                width:250,
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
         {/* {data.nom} <br/>*/}
         <StyledContent>
         
            <ModalImage image={data.image.gatsbyImageData} alt={data.nom} />
            { (data.contenu.blocks.length > 0 || data.contenu.value ) && <Content>
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
            </Content>
        }
        </StyledContent>
     </ModalWindow>
     </>
        )
}

export default Personnage