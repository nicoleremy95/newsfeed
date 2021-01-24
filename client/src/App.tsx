import * as React from 'react';
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home/Home';
import User from './pages/User/User';
import Login from './pages/Login/Login';
import Appbar from './components/Appbar/Appbar';
import Account from './pages/Account/Account'
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

  const [currentUserNewsDB, setCurrentUserNewsDB] = useState([]);

  useEffect(()=>{
    API.getCurrentUser()
    .then(res => {
          console.log('App.tsx res.data.user', res.data.user)
          if(!res.data.user){
            setCurrentUser(false);
          } else {
            setCurrentUser(true);
            setCurrentUserData({
              username: res.data.user.username,
              email: res.data.user.email,
              userId: res.data.user.id
            })
          }

    })
  }, [])

  //TODO: useEffect running non stop with dependency, but issues without it as well 
  // useEffect(()=>{
  //   // console.log('Account.tsx currentUserData.userId', currentUserData.userId)
  //   API.getNewsbyUser(currentUserData.userId)
  //   .then(res=>{
  //       // console.log('Account.tsx res', res)
  //       setCurrentUserNewsDB(res.data);
  //   })
  //   .catch(err=>{console.log('err', err)})
  // }, [])

  //RENDER 
  return (
    <div className="App">
      <Router>
        <Appbar currentUser={currentUser} currentUserData={currentUserData}/>
        <Switch>
          <Route exact path = '/'>
            <Home currentUser={currentUser} currentUserData={currentUserData}/>
          </Route>
          <Route exact path = '/new-account'>
            <User />
          </Route>
          <Route exact path = '/login'>
            <Login/>
          </Route>
          <Route exact path = '/account'>
            <Account currentUserNewsDB={currentUserNewsDB} currentUser={currentUser} currentUserData={currentUserData}/>
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
