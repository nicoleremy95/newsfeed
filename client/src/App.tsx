import * as React from 'react';
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home/Home';
import User from './pages/User/User';
import Login from './pages/Login/Login';
import Appbar from './components/Appbar/Appbar';
import Footer from './components/Footer/Footer';
import './App.css';
import API from './utils/API';

//FC
function App(){
  //DECLARATIONS
  const [currentUser, setCurrentUser] = useState<boolean>(true);

  //TODO: refactor any
  const [currentUserData, setCurrentUserData] = useState<any>({
    username: '',
    email: ''
  });

  useEffect(()=>{
    API.getCurrentUser()
    .then(res => {
          // console.log('app.tsx res.data.user.email', res.data.user.email)
          if(!res.data.user){
            setCurrentUser(false);
          } else {
            setCurrentUser(true);
            setCurrentUserData({
              username: res.data.user.username,
              email: res.data.user.email
            })
          }

    })
  }, [])

  //RENDER 
  return (
    <div className="App">
      <Router>
        <Appbar currentUser={currentUser} currentUserData={currentUserData}/>
        <Switch>
          <Route exact path = '/'>
            <Home currentUser={currentUser} currentUserData={currentUserData}/>
          </Route>
          <Route exact path = '/user'>
            <User />
          </Route>
          <Route exact path = '/login'>
            <Login/>
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
