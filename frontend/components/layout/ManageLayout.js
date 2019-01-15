
import React from 'react';

import { AppBar, Toolbar, withWidth, Hidden, Badge, Avatar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/More';

import Logo from '../element/Logo';

class ManageLayout extends React.Component {
  render() {
    const { custom } = this.props.pageContext.theme;
    const MenuButton = <IconButton color="inherit">
      <MenuIcon />
    </IconButton>;
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Hidden smDown>
              <Logo type="standard" height={custom.appBar.logoHeight} />
              {MenuButton}

              <div style={{ flexGrow: 1 }}></div>
              <IconButton color="inherit">
                <SearchIcon />
              </IconButton>
              <div style={{ width: custom.appBar.iconGutter }}></div>
              <IconButton color="inherit">
                <Badge badgeContent={7} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <div style={{ width: custom.appBar.iconGutter }}></div>
              <IconButton color="inherit">
                <Avatar src="/static/default-user.jpg"></Avatar>
              </IconButton>
            </Hidden>
            <Hidden mdUp>
              {MenuButton}
              <Logo type="icon" height={custom.appBar.logoHeight} />
            </Hidden>
          </Toolbar>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}

export default ManageLayout;