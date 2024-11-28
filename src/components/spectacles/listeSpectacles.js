import React, { Fragment } from "react"
import { graphql } from "gatsby"


import VignetteProjetPerso from "./vignetteProjetPerso"
import {Reveal} from "react-awesome-reveal"
import { fadeInUp, fadeInDown } from "../../style/animations"
import _map from 'lodash/map'
import styled from 'styled-components'
import { colors, mq } from '../../consts/style'; 
import {
  
  Grid3Col,
} from "../Elements"


const FlexListeSpectacle = styled(Grid3Col)` 
    column-gap:1.6rem;
    position:relative;
    margin-bottom:3.2rem;
    display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    & :first-child {
        grid-column: 1 / -1;
    }

      ${mq.mobile`
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    `}
`;



const ListeSpectacles = ({spectacles, format}) => {
    //console.log(spectacles)
    return (
      
        <Reveal keyframes={fadeInDown}  triggerOnce>
            <FlexListeSpectacle>
                { _map(spectacles, (item, i) => (
                    <VignetteProjetPerso key={i} item={item}/>
                ))}
            </FlexListeSpectacle>
        </Reveal>
       
    )
}
export default ListeSpectacles;
