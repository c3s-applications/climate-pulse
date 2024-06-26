import React, { useEffect, useState } from 'react'
import TagManager from 'react-gtm-module'
import {
  Sidebar,
  Segment,
  Button,
  Container,
} from 'semantic-ui-react'

function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

const tagManagerArgs = {
    gtmId: 'GTM-WJFFXKH6'
}


function CookiesModal() {
  const cookiesAccepted = (
     getCookie("acceptedCookies") == "true"
  )
  const [visible, setVisible] = useState(!cookiesAccepted)

  const acceptCookies = () => {
    document.cookie = "acceptedCookies=true";
    TagManager.initialize(tagManagerArgs);
    setVisible(false)
  }

  useEffect(() => {
    if (cookiesAccepted) {
        acceptCookies()
    }
  }, []);

  return (
    <div>
        <Sidebar
            as={Segment}
            animation='overlay'
            visible={visible}
            width='thin'
            inverted
            direction="bottom"
            style={{zIndex: 10000}}
        >
            <Container style={{fontSize: "1.4rem"}} textAlign='justified'>
            We use cookies on this website to improve user experience and generate
            aggregated data on website use and statistics. If you choose "Accept
            all", you consent to the use of all cookies.
            </Container>
            <Container textAlign='right'>
            <Button color="purple" size='large' onClick={() => setVisible(false)}>Deny all</Button>
            <Button color="purple" size='large' onClick={() => acceptCookies()}>Accept all</Button>
            </Container>
        </Sidebar>
        </div>
  )
}

export default CookiesModal