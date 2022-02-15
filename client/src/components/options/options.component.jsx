import React, { useContext, useState } from 'react'
import { Grid, Paper, Container, Typography, TextField, Button } from '@mui/material'
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material'
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
  const [ idToCall, setIdToCall ] = useState('')
  const classes = useStyles()
  console.log(me)
  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={10}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">Account Info</Typography>
              <TextField variant="standard" label="name" value={name} onChange={e => setName(e.target.value)} fullWidth />
              <CopyToClipboard text={me} className={classes.margin}>
                <Button className={classes.margin} variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />} >
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">Make a Call</Typography>
              <TextField variant="standard" label="ID To Call" value={idToCall} onChange={e => setIdToCall(e.target.value)} fullWidth />
              {
                callAccepted && !callEnded ? (
                  <Button variant="contained" 
                  color="secondary" 
                  startIcon={<PhoneDisabled />}
                  fullWidth
                  onClick={endCall}
                  className={classes.margin}
                  >
                    Hang Up
                  </Button>
                ) : (
                  <Button variant="contained" 
                  color="primary" 
                  startIcon={<Phone />}
                  fullWidth
                  onClick={() => callUser(me)}
                  className={classes.margin}
                  >
                    Call
                  </Button>
                )
              }
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  )
}

export default Options