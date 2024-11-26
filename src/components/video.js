import React from "react";
import ReactPlayer from 'react-player'


const Video = ({ videoSrcURL, videoTitle, ...props }) => (
  <><div className="video-responsive">
   
  <ReactPlayer url={videoSrcURL} controls/>
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