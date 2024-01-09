import './App.css';
import { Grid, Divider, Container } from 'semantic-ui-react';
import MainPanel from './components/MainPanel';
import Menu from './components/Menu';
import InformationSegment from './components/InformationSegment';
import Tagline from './components/Tagline';
import Header from './components/Header';
import Footer from './components/Footer';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(
  reducer,
)

const panelStyle = {
  maxWidth: "calc( 723px  +  2rem ) !important",
};

const App = () => (
  <Provider store={store}>
    <Grid centered padded columns={1} >

      <Grid.Row color='purple'>
        <Grid.Column>
          <Container className='mainPanelContainer'>
            <Header />
          </Container>
        </Grid.Column>
      </Grid.Row>

    <Grid.Row textAlign='left'>
      <Tagline />
    </Grid.Row>

      <Grid.Row>
        <Grid.Column computer={10} mobile={16} widescreen={8}>
          <Menu />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
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

export default App;
