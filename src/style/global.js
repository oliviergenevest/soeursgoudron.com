import { createGlobalStyle } from 'styled-components';
import { font, colors } from '../consts/style';
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

h1 {
  ${font.title}
}

h2 {
  ${font.h2}
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


/* arrow */
/* From Uiverse.io by Nawsome */ 
.arrow {
  cursor: pointer;
  height: 60px;
  transform: rotate(90deg);
  transition: transform 0.1s;
  width: 30px;
  margin:0 auto;
}

.arrow-top, .arrow-bottom {
  background-color: #585656;
  height: 4px;
  left: -5px;
  position: absolute;
  top: 50%;
  width: 100%;
}

.arrow-top:after, .arrow-bottom:after {
  background-color: #000;
  content: "";
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.15s;
}

.arrow-top {
  transform: rotate(45deg);
  transform-origin: bottom right;
}

.arrow-top:after {
  left: 100%;
  right: 0;
  transition-delay: 0s;
}

.arrow-bottom {
  transform: rotate(-45deg);
  transform-origin: top right;
}

.arrow-bottom:after {
  left: 0;
  right: 100%;
  transition-delay: 0.15s;
}

.arrow:hover .arrow-top:after {
  left: 0;
  transition-delay: 0.15s;
}

.arrow:hover .arrow-bottom:after {
  right: 0;
  transition-delay: 0s;
}

.arrow:active {
  transform:  scale(0.9);
  transform: rotate(90deg);
}
`;


export default Global;
