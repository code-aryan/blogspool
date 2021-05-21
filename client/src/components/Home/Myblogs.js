import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';
import { getMyApprovedPosts } from '../../actions/posts';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Myblogs = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const user = JSON.parse(localStorage.getItem('profile'));
  const userid = (user?.result._id)?user?.result._id : user?.result?.googleId;
 
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const history = useHistory();


  useEffect(() => {
    if (page) {
      
      dispatch(getMyApprovedPosts(userid,page));
    }
  }, [dispatch, page]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} /> 
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Myblogs;
