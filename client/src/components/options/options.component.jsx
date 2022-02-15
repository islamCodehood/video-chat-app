import React, { useContext } from 'react'
import { Grid, Paper, Container, Typography, TextField, Button } from '@mui/material'
import { Assignment, Phobe, PhoneDisabled } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import CopyToClipboard from 'react-copy-to-clipboard'
import { SocketContext } from '../../context'

const useStyles = makeStyles((theme) => ({
  
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
 }));

const Options = ({ children }) => {
  const { me, callAccepted, callEnded, name, setName, callUser, endCall } = useContext(SocketContext)  
  const classes = useStyles()
  return (
    <div>{children}</div>
  )
}

export default Options