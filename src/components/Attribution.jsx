import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

const Attribution = () => (
    <Modal
    closeIcon
    trigger={<Button><Icon name='list'/>Attribution</Button>}
    >
        <Modal.Header>Climate Pulse Attribution</Modal.Header>
        <Modal.Content>
            <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo.
            </p>
        </Modal.Content>
    </Modal>
)

export default Attribution