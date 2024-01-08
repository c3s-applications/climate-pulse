import React from 'react'
import { Container, Header, TabPane, Tab, Segment, Button } from 'semantic-ui-react'

const Methodology = (
  <TabPane>
    This is how we did it.
  </TabPane>
)

const Attribution = (
  <TabPane>
    This is the attribution.
  </TabPane>
)

const About = (
  <TabPane>
    This is who we are.
  </TabPane>
)

const panes = [
  { menuItem: 'Methodology', render: () =>  Methodology},
  { menuItem: 'Attribution', render: () => Attribution },
  { menuItem: 'About C3S', render: () => About },
]

const InformationSegment = () => (
  <Container textAlign='justified'>
    <Segment secondary color='purple'>
    <Tab panes={panes} />
    </Segment>
  </Container>
)

export default InformationSegment