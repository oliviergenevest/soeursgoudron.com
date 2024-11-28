/* TODO : ajouter composant SEO avec les valeurs du site global */

import React from 'react';
/*import Link from '../components/ExtendedLink';*/
import {IntlProvider} from 'react-intl'
// Messages
import en from '../translations/en.json';
import fr from '../translations/fr.json';
import Headroom from 'react-headroom';
import styled from 'styled-components';
import Header from '../components/header';
import Footer from '../components/footer';

import Reboot from '../style/reboot';
import Global from '../style/global';
/*import ModalContext from '../store/modalContext';
import Modals from '../modals';*/
/*import CookieConsent from 'react-cookie-consent';*/
/*import { FormattedMessage} from 'react-intl';*/
import { layoutTypes } from '../types/propTypes';

/*import {Text} from '../components/Elements'*/
const messages = { en, fr };


const SiteWrapper = styled.div`
  background: #fff;
  background: linear-gradient(180deg, rgba(215,214,237,1) 0%, rgba(255,255,255,1) 100%);
`;

const Layout = ({ children, pageContext, location }) => {



  return (
    <IntlProvider locale="fr" key="fr"  messages={messages["fr"]}  defaultLocale="fr" >
      <SiteWrapper id="top">
        <Reboot />
        <Global />
        {!(/*location.pathname === '/' ||*/ location.pathname ==='/en' || location.pathname ==='/en/') && 
        <Headroom  id={(location.pathname === '/' || location.pathname ==='/en' || location.pathname ==='/en/') ? "splash-headroom" : undefined}>  
          <Header location={location}   />
        </Headroom>
}
        {children}
     
        <Footer  location={location} />
        
      {/*  <CookieConsent 
          enableDeclineButton 
          flipButtons
          location="bottom"
          buttonText="Ok"
        
          buttonStyle={{ color: "#161616", borderRadius:"4px", background: "#F2E20F", margin:"5px" }}
          style={{background:'#161616e3'}}
          declineButtonText="Refuser"
          cookieName="gatsby-gdpr-google-tagmanager">
            <Text  style={{ color:"white" }}>
              <FormattedMessage id="cookies__content-banner"/> 
              <Link to="/protection-des-donnees" style={{ color:"white" }}> <FormattedMessage id="more"/></Link>
            </Text>
        </CookieConsent> */}
      </SiteWrapper>
    </IntlProvider>
   
  );
};

Layout.propTypes = layoutTypes;

export default Layout;
