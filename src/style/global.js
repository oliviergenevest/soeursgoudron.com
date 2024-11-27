import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`

html { font-family: 'Albert Sans Variable', sans-serif; }

/*overflow hidden pour ne pas avoir de marge dans swiper full screen (projet.js)*/
html,
body {
 /* overflow-x: hidden;*/
}

@supports (font-variation-settings: normal) {
  html { font-family: 'Albert Sans Variable', sans-serif; }
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
	text-decoration:none;
	&:hover {
		text-decoration:none;
		color:inherit;
	}
}

strong {
  font-weight:700;
}

::selection {
  background: #E4FAFC; /* WebKit/Blink Browsers */
  color:#161616;
}



.headroom:not(.headroom--pinned) > div:first-of-type  {
  box-shadow: none;
}
/* Pour la page d'accueil : header transparent en mode initial (avant scroll) */

#splash-headroom:not(.headroom--pinned) > div:first-of-type  {
  /*background:white;
  box-shadow: none;*/
  
}
#splash-headroom:not(.headroom--pinned) li > a {
  /* color:black; */
}



/* READ MORE TEXT COMPONENT */
  .read_more_text .hidden {
    display:none;
  }

  .read_more_text  .button_read_more {
    margin-left:.8rem;
    cursor:pointer;
    color:#6a6a6a;
    &:hover {font-weight:500}
  }

/* VIDEO RESPONSIVE */
.video-responsive { 
  overflow:hidden; 
  padding-bottom:56.25%; 
  position:relative; 
  height:0;
   margin: 3.2rem 0;
  }
  
  .video-responsive iframe {
    left:0; 
    top:0; 
    height:100%;
    width:100%;
    position:absolute;
   
  }

`;


export default Global;
