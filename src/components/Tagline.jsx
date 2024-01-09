import React from 'react'
import { useSelector } from 'react-redux';
import { Container, Divider, Header, Icon, Segment } from 'semantic-ui-react'


const Tagline = () => {
    const maxDate = useSelector(state => state.maxDate)
    return (
        <>
        <Container text textAlign='left' >
                <Header as='h3' style={{fontWeight: 'normal', fontFamily: 'Lato'}}>
                    <Divider />
                    <span style={{color: '#941933', fontWeight: 'bold'}}>Climate Pulse</span> provides
                    near real-time updates of global average air- and sea-surface temperatures from
                    the <span style={{color: '#941933', fontWeight: 'bold'}}>Copernicus Climate Change Service (C3S)</span>.
                </Header>
        </Container>
        <Container text>
            <Divider />
            <Header as='h3' color='teal'>
                <Icon name='calendar alternate' />Latest data: {maxDate.toLocaleDateString("en-GB", {day: 'numeric', month: 'long', year: 'numeric'})}
            </Header>
        </Container>
        </>
    )
}

export default Tagline