import React,{useEffect,useState} from 'react'
import {useHistory,Redirect,Link} from 'react-router-dom'
import axios from 'axios'
import {Alert} from 'react-bootstrap'

const Dashboard=({isLoggedIn,setIsLoggedIn})=>{
  
     const history=useHistory()
   useEffect(() => {
  const source = axios.CancelToken.source();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/user/auth", {
        cancelToken: source.token,
        withCredentials:true
      });
      setIsLoggedIn(true)
      //  localStorage.setItem('data',JSON.stringify(isLoggedIn))
      
      
      // ...
    } catch (error) {
      if (axios.isCancel(error)) {
        //cancelled
      } else {
        throw error;
      }
    }
  };

  fetchData()

  return () => {
    source.cancel();
  };
},[]);
    return (
        <div>
          <br/>
          {isLoggedIn ?
            <h1>Welcome</h1>:
            <Alert  variant="danger">
         Log in to continue <Link to='/login'>Log In</Link>
  </Alert> }
        </div>
    )
}
export default Dashboard
