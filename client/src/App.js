import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Myblogs from './components/Home/Myblogs';
import MyPendings from './components/Home/Mypendings';
import Auth from './components/Auth/Auth';

const App = () => {
  
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/myblogs" exact component={() => (JSON.parse(localStorage.getItem('profile')) ? <Myblogs /> : <Redirect to="/auth" />)} />
          <Route path="/posts/mypendings" exact component={() => ((JSON.parse(localStorage.getItem('profile'))) ? (<MyPendings />) : (<Redirect to="/auth" />) )} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/auth" exact component={() => ((JSON.parse(localStorage.getItem('profile'))) ? (<Redirect to="/posts" />) : (<Auth />) )} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
