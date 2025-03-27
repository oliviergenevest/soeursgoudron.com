import React, {  useState, useEffect } from 'react';
import styled from 'styled-components';
import { FormattedMessage} from 'react-intl';
import Link from './ExtendedLink';
import { colors, font,  boxShadow, mq } from '../consts/style';
import { headerTypes } from '../types/propTypes';
import { Menu as MenuAltRight } from '@styled-icons/feather/Menu';

import { XCircle } from '@styled-icons/bootstrap';
import { useSpring, animated } from '@react-spring/web'
import { graphql, useStaticQuery } from "gatsby"
import { Icon } from '@iconify/react';
import facebookRect from '@iconify/icons-brandico/facebook-rect';

import { StaticImage } from "gatsby-plugin-image"


const IconLink = ({to, icon, text}) => {
  return(

    <LinkSocial title={text} href={to} target="_blank"  rel="nofollow noopener noreferrer">
      {icon}
    </LinkSocial>
  )
}



const LinkSocial = styled.a`

`

const Wrapper = styled.div`

  background:#fff;
  ${boxShadow};
  height: 13rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  ${mq.mobile`
      height: 8rem;
      padding: 0;
    `}
  ${mq.desktop`
     padding: 0;
    
    `}
   
`;

const HeaderInner = styled.nav`
position: relative;
  display: flex;
  width: calc( 100% - 6.4rem );
  justify-content: space-between;
  align-items: center;
  padding:  1rem 0;
   ${mq.mobile`
     width:  90%;
    `}
`;



const MainMenu = styled.ul`
  display: none;
  
${mq.tablet_up`
  display: flex;
  list-style: none;
  justify-self: flex-start;
  margin: 0;
  padding:0;
 `}

 
`;

const SubMenu = styled.ul`
  display: none;
  position:absolute;
  top: 100%; left: 0;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  background-color:white;
  padding:3.2rem;
  list-style: none;
  min-width:350px;
  border-radius: .8rem;
  & li {
  white-space:nowrap;
  
  } 
`;


const MenuItem = styled.li`
  position: relative;
  color: ${colors.dark};
  &:hover {
    color: ${colors.dark};
  }
  &:hover ${SubMenu} {
    display:block;
  }
  margin-right:3rem;
     
`;

const LinkHeader = styled(props => <Link {...props} />)`
  position:relative;
  color: ${colors.dark};
 

  ${font.navigationItem}
  &.active {
    color: ${colors.blue};
    font-weight:700;
  }

    
  &:not(.with_submenu):hover { 
    background: url("https://www.datocms-assets.com/144438/1730974893-group-2.png") bottom left no-repeat;
    background-size: 100% 5px;
    padding-bottom: 6px;
  }

`;

const SubLinkHeader = styled(props => <Link {...props} />)`
  position:relative;
  color: ${colors.dark};
 

  ${font.navigationItem}
  &.active {
    color: ${colors.blue};
    font-weight:700;
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
      left: ${props => (props.selected ?"50%": 0 )};
    bottom: -.25rem;
    background-color: #F0F3D3;
    border-radius:3px;
    width: 30px;
    height: 1px;
   
    opacity: ${props => (props.selected ? 1: 0 )};
    transform:translateX(${props => (props.selected ?"-50%": 0 )});
  }

   &:hover:before {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    border-radius:8px;
    bottom: -.25rem;
    background-color: ${colors.dark};
   
    width: 100%;
    height: 2px;
    transform:translateX(-50%);
    transition: all 0.25s;   
    opacity: 1;
  }
`;

const LogoLink = styled(Link)`
 
  height:100%;

 padding-bottom:0;
   ${mq.mobile`
      img { 
        height:5rem;
        width: auto!important;
      }
    `}

  &:hover:before,  &.active:before 
  {
    content:none;
  }
`;

const BurgerMenu = styled.button`
  position:relative;
  border:0;
  margin-right:1rem;
  display:block;
  color:white;
   background-color:transparent;
  &:focus {
    outline:none;
  }
  ${mq.tablet_up` 
   display:none;
 `}
   ${mq.tablet`
     margin-right:0;
         padding: 0;
    `}
`;

const CloseMenuMobile = styled.button`
  position:absolute;
  top:3rem;
  right:2rem;
  display:block;
  border:none;
 & svg { fill:${colors.dark};background:transparent!important;}
  background:transparent;
  &:focus {
    outline:none;
  }
`;

/*MENU MOBILE*/
const StyledMenuAltRight = styled(MenuAltRight)`
  color:${colors.dark};

`
const StyledXCircle = styled(XCircle)`
  color:${colors.dark};
`


const MenuMobile = styled(animated.div)`
  z-index:5;
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  right: 0;
  z-index:10;
  transform: translate3d(0,-100%,0);
`
const ContentMobile = styled(animated.div)`

  height:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  nav {
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
  }
`

const ItemMobileNav = styled(animated.div)` 
  padding:1.5rem;
  margin-bottom:.5rem;
 a {
  font-size:4rem;
  font-weight:300;
  color:${colors.dark};
  &:hover, &.active {
     color:${colors.dark};
    }
  } 
`

export default function Header({ location }) {
 
  const data = useStaticQuery(graphql`
    query navigation {
        allDatoCmsNavigation(filter: { root: { eq: true } }, sort: {position: ASC}) {
            nodes {
                id
                root
                position
                menuItem {  
                 ... on DatoCmsPage {
                    id
                    slug
                    titre
                  }
                } 
                
                treeChildren {
                  position
                  menuItem {
                    ... on DatoCmsSpectacle {
                      id
                      slug
                      titre: nom
                    }
                  }
                } 

            }

        }
    }
  `)

 // console.log(data.allDatoCmsNavigation.nodes)

  const [mobileNavOpen, setMobileNavOpen] = useState(false) // mobile menu closed by default
  const MenuAnimation = useSpring({
  native: true,
  to: { opacity: mobileNavOpen ? 1 : 0, transform: mobileNavOpen ? 'translate3d(0,0,0)' : 'translate3d(0,-100%, 0)', background: mobileNavOpen ? '#e9e9f1' : '#fff'},
  })

  useEffect(() => {
    mobileNavOpen ? document.body.style.overflow = 'hidden': document.body.style.overflow = 'unset';
    
}, [mobileNavOpen]);
   

  return (
    <> 
   
    <Wrapper>
      <HeaderInner>
        <LogoLink to="/" title="Retour à l'accueil" >
       {/*  <Boop scale={1.01} timing={200}>*/}
          <StaticImage src="../images/Logo_SG_B_Header.jpg" quality={100} alt="Cie Les Soeurs Goudron" />
      {/*  </Boop> */}
        </LogoLink>
       
      
        <MainMenu>

          {data.allDatoCmsNavigation.nodes.map( item => {
            const slug = (item.menuItem.slug==='index') ? '' : item.menuItem.slug 
            return (
              <MenuItem  key={item.id}>
              
              { item.treeChildren.length > 0 ? 
                <>
                  <LinkHeader to={`/${slug}`} activeClassName="active" className="with_submenu">{item.menuItem.titre} <Icon icon="ion:chevron-down-outline" style={{color: "inherit", fontSize: '1.6rem'}}/></LinkHeader>
                  

                  <SubMenu className="sub_menu">
                    {item.treeChildren.sort((a, b) => a.position - b.position).map( subItem => { return(
                    <li  key={subItem.menuItem.id}>
                   
                    <SubLinkHeader to={`/${slug}/${subItem.menuItem.slug}`} activeClassName="active">{subItem.menuItem.titre}</SubLinkHeader>
                    
                    </li>)})}
                  </SubMenu>
                </>
                :   <LinkHeader to={`/${slug}`} activeClassName="active">{item.menuItem.titre} </LinkHeader>
              } 
            
              </MenuItem>
            )}
          )}
          
        </MainMenu>
      
        
        <BurgerMenu  onClick={() => {setMobileNavOpen(true)}}
    aria-label="Navigation"><StyledMenuAltRight title="Navigation" size="48"/></BurgerMenu>
      </HeaderInner>
    </Wrapper>

    <MenuMobile style={ MenuAnimation}> 
        <ContentMobile>
        
          <nav>
          {data.allDatoCmsNavigation.nodes.map( item => {
            const slug = (item.menuItem.slug==='index') ? '' : item.menuItem.slug 
            return (

            <ItemMobileNav onClick={() => {setMobileNavOpen(!mobileNavOpen)}} key={item.id}>
              
              { item.treeChildren.length > 0 ? 
                <>
                  <LinkHeader to={`/${slug}`} activeClassName="active">{item.menuItem.titre}</LinkHeader>
                  <SubMenu className="sub_menu">
                    {item.treeChildren.map( subItem => { return(
                    <li  key={subItem.menuItem.id}>
                    <SubLinkHeader to={`/${slug}/${subItem.menuItem.slug}`} activeClassName="active">{subItem.menuItem.titre}</SubLinkHeader>
                    
                    </li>)})}
                  </SubMenu>
                </>
                :   <LinkHeader to={`/${slug}`} activeClassName="active">{item.menuItem.titre} </LinkHeader>
              } 
            
              </ItemMobileNav>


            )
            })
            }
           
          </nav>
         
          <CloseMenuMobile 
          aria-label="Fermer"
          onClick={() => {setMobileNavOpen(false)}} 
           ><StyledXCircle size="48"  title="Fermer le menu" /></CloseMenuMobile>
        </ContentMobile>    
      </MenuMobile>  
      </>

  );
}

Header.propTypes = headerTypes;
