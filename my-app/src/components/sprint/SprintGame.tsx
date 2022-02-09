import { Container } from '@mui/material'
import React from 'react'

interface SprintGameProps {

}

const SprintGame = (props: SprintGameProps) => {

  return (
    <Container maxWidth="md" style={{ background: 'yellow' }}>
      <div>* * *</div>
      <div>IMAGE WILL BE HERE</div>
      <p>WORD</p>
      <p>IN RUSSIAN</p>
      <div>BUTTONS</div>
    </Container>
  )
}

export default SprintGame