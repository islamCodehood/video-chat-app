import React from 'react'
import { Typography, AppBar } from '@mui/material'
import VideoPlayer from './components/videoplayer/videoPlayer.component'
import Options from './components/options/options.component'
import Notifications from './components/notifications/notifications.component'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: '0 100px 30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));
const App = () => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
        <AppBar className={classes.appBar} position="static" color="success">
            <Typography variant="h2" align="center">
                Video Chat App
            </Typography>
        </AppBar>
            <VideoPlayer />
            <Options>
              <Notifications />
            </Options>
    </div>
  )
}

export default App