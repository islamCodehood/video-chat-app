import React, { useContext } from 'react'
import { Button } from '@mui/material'
import { SocketContext } from '../../context'
const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext)
  return (
    <>
      {
        call.isReceivingCall && !callAccepted && (
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <h2>{call.name} is calling</h2>
            <Button variant="contained" color="primary" onClick={answerCall}>Answer</Button>
          </div>
        )
      }
    </>
  )
}

export default Notifications