import React from "react";
import ReactPlayer from 'react-player'


const Video = ({ videoSrcURL, videoTitle, ...props }) => (
  <><div className="player-wrapper">
   
  <ReactPlayer url={videoSrcURL}
   controls 
   className="react-player"
height="100%"
      width="100%"
       />
  {/*  <iframe
      src={videoSrcURL}
      title={videoTitle}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
       width="450"
/>*/}
    
  </div>
  <span>{videoTitle}</span>
  </>
)
export default Video