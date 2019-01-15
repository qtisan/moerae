
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Card, CardHeader, CardContent, CardActions,
  Avatar, Fab, Divider, InputAdornment, TextField
} from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/Navigation';
import AddIcon from '@material-ui/icons/Add';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockRounded from '@material-ui/icons/LockRounded';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: -1,
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    top: 0
  },
  margin: {
    marginBottom: 20,
    width: '90%'
  },
  maskLeft: {
    position: 'absolute',
    left: 0, top: 0,
    width: '35%',
    height: '100%',
    backgroundColor: 'rgba(3, 10, 16, 0.4)',
    zIndex: 100
  },
  maskRight: {
    position: 'absolute',
    left: '35%', top: 0,
    width: '65%',
    height: '100%',
    backgroundColor: 'rgba(252, 254, 255, 0.2)',
    zIndex: 100
  },
  logoLayer: {
    position: 'absolute',
    width: '100%', height: '100%',
    zIndex: 200
  },
  loginPanel: {
    position: 'absolute',
    left: '40%',
    top: '20%',
    maxWidth: 400,
    minWidth: 300,
    zIndex: 1000,
    padding: '24px 8px'
  },
  loginAvatar: {
    margin: 10,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.dark
  },
  loginDivider: {
    marginBottom: 20
  },
  loginFields: {
    padding: '20px 32px'
  },
  loginAction: {
    marginTop: 20,
    padding: '20px 24px'
  },
  loginButton: {
    marginRight: 15,
    padding: '0 32px'
  }
});

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgIndex: 0
    };
  }
  static get defaultProps() {
    return {
      resolutions: [
        {
          color: '#030A10',
          image: '/static/background/autumn.jpg',
          width: 1920, height: 1060,
          logoType: 'secondary',
          logoLeft: '10%', logoTop: '10%',
          logoWidth: '15%'
        },
        {
          color: '#030A10',
          image: '/static/background/fire.jpg',
          width: 1920, height: 1080,
          logoType: 'primary',
          logoLeft: '10%', logoTop: '40%',
          logoWidth: '25%'
        },
        {
          color: '#030A10',
          image: '/static/background/nature.jpg',
          width: 1920, height: 1271,
          logoType: 'highlight',
          logoLeft: '10%', logoTop: '60%',
          logoWidth: '15%'
        }
      ]
    };
  }
  get intervalHandler() {
    return this._intervalHandler;
  }
  set intervalHandler(val) {
    this._intervalHandler = val;
  }
  bgUpdate(count, setState) {
    const { bgIndex } = this.state;
    const newState = { bgIndex: (bgIndex + 1) % count };
    setState(newState);
  }
  componentDidMount() {
    const setState = this.setState.bind(this);
    const { resolutions } = this.props;
    const count = resolutions.length;
    const update = this.bgUpdate.bind(this);
    this.intervalHandler = setInterval(function () {
      update(count, setState);
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalHandler);
  }
  render() {
    const { classes, resolutions } = this.props;
    const { bgIndex } = this.state;
    const bg = resolutions[bgIndex];
    return (
      <div className={classes.root} style={{ backgroundColor: bg.color, transition: 'all 1s' }}>
        {
          resolutions.map((b, i) => (
            <img src={b.image} key={i}
              style={{
                position: 'absolute',
                width: b.width,
                height: b.height,
                marginLeft: - b.width / 2,
                left: '50%',
                top: '50%',
                marginTop: - b.height / 2,
                transition: 'all 1s',
                opacity: bgIndex == i ? 1 : 0
              }}
            />
          ))
        }
        <div className={classes.maskLeft}></div>
        <div className={classes.maskRight}></div>
        <div className={classes.logoLayer}>
          {
            resolutions.map((b, i) => (
              <img src={`/static/logo/logo-${b.logoType}.svg`} key={i}
                style={{
                  position: 'absolute',
                  transition: 'all 1s',
                  width: b.logoWidth, left: b.logoLeft, top: b.logoTop,
                  opacity: bgIndex == i ? 1 : 0
                }} />
            ))
          }
        </div>
        <div>
          <Card className={classes.loginPanel}>
            <CardHeader
              avatar={
                <Avatar className={classes.loginAvatar} src={'/static/logo/logo-white-icon.svg'}>
                </Avatar>
              }
              title="Moerae Login"
              subheader="Login with your account & credential"
            />
            <Divider variant="inset" className={classes.loginDivider} />
            <CardContent className={classes.loginFields}>
              <TextField
                className={classes.margin}
                id="username"
                label="Email/Username/Phone"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                className={classes.margin}
                id="password"
                label="Password"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded />
                    </InputAdornment>
                  )
                }}
              />
            </CardContent>
            <CardActions className={classes.loginAction}>
              <Fab className={classes.loginButton} variant="extended" aria-label="Login" color="primary">
                <NavigationIcon /> Login
              </Fab>
              <Fab className={classes.loginButton} variant="extended" aria-label="Login" color="secondary">
                <AddIcon /> Sign up
              </Fab>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Signin);