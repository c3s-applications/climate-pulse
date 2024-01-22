import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, Icon, Header, Segment, Popup, Container } from 'semantic-ui-react'

const TaglineSegment = (props) => (
    <Segment {...props} attached color='purple' ></Segment>
)

const LatestData = ({maxDate}) => (
    <>
    <Popup
          trigger={<Header color='blue' as='h3' style={{display: 'inline'}}>
          <Icon name='calendar alternate' /> Latest data: {maxDate.toLocaleDateString("en-GB", {day: 'numeric', month: 'long', year: 'numeric'})}
          </Header>}
          content={
            <p>
            <b>Climate Pulse</b> is driven by global <b>ERA5 reanalysis</b> data from
            C3S, which lags approximately two days behind real-time
            </p>
          }
          position='bottom'
        />
    </>
)

const Tagline = () => {
    const maxDate = useSelector(state => state.maxDate)
    return (
        <Container textAlign='left'>
             <Segment attached color='purple' >
            <Grid centered stackable divided verticalAlign='middle'>
                <Grid.Row verticalAlign='middle' textAlign='center' columns={2}>
                    <Grid.Column textAlign='left' computer={10} tablet={16} mobile={16}>
                    <Container>
                    <Header as={'h3'} style={{fontWeight: 'normal', fontSize: '1.2rem', fontFamily: 'Lato'}}>
                        Near-real time updates of key global climate variables from the
                        the <span style={{color: '#941933', fontWeight: 'bold'}}>Copernicus Climate Change Service (C3S)</span>
                    </Header>
                    </Container>
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle' computer={6} tablet={16} mobile={16}>
                        <LatestData maxDate={maxDate} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </Segment>
        </Container>
    )
}

export default Tagline