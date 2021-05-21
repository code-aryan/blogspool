import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memoriesText from '../../images/memoriesText.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={memoriesText} alt="icon" height="70px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Button variant="contained" className={classes.logout} color="secondary" component={Link} to="/">Home</Button>
            <Button variant="contained" className={classes.logout} color="secondary" component={Link} to="/posts/myblogs">My Blogs</Button>
            <Button variant="contained" className={classes.logout} color="secondary" component={Link} to="/posts/mypendings">Pending</Button>

            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <div>
          <Button variant="contained" style={{marginRight: '10px'}} color="secondary" component={Link} to="/">Home</Button>
          <Button variant="contained" color="primary"  component={Link} to="/auth" >Sign In</Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
