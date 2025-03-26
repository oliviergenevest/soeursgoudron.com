import React from "react";
import ReactPlayer from 'react-player'
import { Grid2Col } from "./Elements";


const DoubleVideo = ({ video1SrcURL, video1Title, video2SrcURL, video2Title,...props }) => (
  <Grid2Col>
    <div className="player-wrapper">
      <ReactPlayer url={video1SrcURL}
        controls 
        className="react-player"
        height="100%"
        width="100%"
      />
    </div>

    <div className="player-wrapper">
        <ReactPlayer url={video2SrcURL}
          controls 
          className="react-player"
          height="100%"
          width="100%"
        />
    </div>
  </Grid2Col>
)
export default DoubleVideo