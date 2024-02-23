import './App.css';
import { Grid, Divider, Container, Segment, Sticky, Rail } from 'semantic-ui-react';
import MainPanel from './components/MainPanel';
import Menu from './components/Menu';
import InformationSegment from './components/InformationSegment';
import Tagline from './components/Tagline';
import Header from './components/Header';
import Footer from './components/Footer';
import CookiesModal from './components/Cookies';
import React, { createRef } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(
  reducer,
)

const panelStyle = {
  maxWidth: "calc( 723px  +  2rem ) !important",
};


const App = () => {
  return (
  <Provider store={store}>
    <CookiesModal />
    <Grid id='grad' centered padded columns={1} >

      <Grid.Row stretched color='purple'>
        <Grid.Column stretched>
          <Container className='mainPanelContainer'>
            <Header />
          </Container>
        </Grid.Column>
      </Grid.Row>
    

      <Grid.Row>
          <Container className='mainPanelContainer'>
           <Tagline />
          </Container>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column textAlign='center' mobile={16} computer={8}>
          <Menu />
        </Grid.Column>
      </Grid.Row>

        <Grid.Row>
          <Grid.Column mobile={16}>
          <Container className='mainPanelContainer'>
            <MainPanel />
          </Container>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
          <InformationSegment />
          <Divider hidden/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
        <Grid.Column>
          <Footer />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Provider>
)
  }

export default App;
