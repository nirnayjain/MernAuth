import React,{useState} from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Registration from './Component/Registration'
import Nav from './Component/Nav'
import Dashboard from './Component/Dashboard'
import Login from './Component/Login'
import './App.css'
import Confirm from './Component/confirm'
function App() {
  let value=JSON.parse(localStorage.getItem("data"))||false
  
 const [isLoggedIn,setIsLoggedIn]=useState(value
  )
 
  return (
   <>
 
     <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    
     
       <Switch>
         <Route exact path="/" component={Registration} />
          <Route path="/login" component={()=><Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
           <Route path="/dashboard" component={()=><Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route  path="/confirm:confirmationCode" component={Confirm} />
       </Switch>
  
   </>
  );
}

export default App;
