import './App.css';
import { Grid, Divider, Container, Segment } from 'semantic-ui-react';
import MainPanel from './components/MainPanel';
import Menu from './components/Menu';
import Methodology from './components/Methodology';
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

      <Container textAlign='left' >
        <Segment secondary color='purple'>
            <p>
            <b>Climate Pulse</b> tracks the latest global temperature and sea surface
            temperature information from the <b>Copernicus Climate Change Service (C3S)</b>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
            ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
            ultricies nec, pellentesque eu, pretium quis, sem.        
            </p>
        </Segment>
      </Container>
      <Divider />
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
        <Methodology />
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
