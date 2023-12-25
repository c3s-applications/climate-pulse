import './App.css';
import { Grid, Divider } from 'semantic-ui-react';
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

const App = () => (
  <Provider store={store}>
    <Grid centered padded columns={1} >
      <Grid.Row>
        <Grid.Column>
          <Header />
          <Divider />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column computer={10} mobile={16}>
          <Menu />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
        <MainPanel />
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
