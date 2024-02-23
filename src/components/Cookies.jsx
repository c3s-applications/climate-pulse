import React, { useEffect } from 'react'
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
} from 'semantic-ui-react'

function exampleReducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { open: true, dimmer: action.dimmer }
    case 'CLOSE_MODAL':
      return { open: false }
    default:
      throw new Error()
  }
}

function CookiesModal() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  })
  const { open, dimmer } = state

  useEffect(() => dispatch({ type: 'OPEN_MODAL' }), []);

  return (
    <div>
      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      >
        <ModalHeader>Cookies</ModalHeader>
        <ModalContent style={{fontSize: "1.2rem"}}>
        We use cookies on this website to improve user experience and generate
        aggregated data on website use and statistics. If you choose "Accept
        all", you consent to the use of all cookies.
        </ModalContent>
        <ModalActions>
          <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            Deny all
          </Button>
          <Button positive onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            Accept all
          </Button>
        </ModalActions>
      </Modal>
    </div>
  )
}

export default CookiesModal