import React from 'react'
import axios from 'axios'
import {Navbar,Nav,Container} from 'react-bootstrap'
import {LinkContainer,useHistory} from 'react-router-bootstrap'
import {Link} from 'react-router-dom'

const Header =({isLoggedIn,setIsLoggedIn})=> {

  const logout=async()=>{
    try{
    await fetch("http://localhost:4000/api/user/logout",{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials:'include'});
      setIsLoggedIn(false);
      
    }
    catch(error)
    {
      alert(error)
    }
    }
    localStorage.setItem('data',JSON.stringify(isLoggedIn))
  
  let menu;
  if(isLoggedIn){
    menu=(
      <>
       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    
    <Nav className="ml-auto">
        
     <LinkContainer to='/login'><Nav.Link  onClick={logout}>Log Out</Nav.Link></LinkContainer>
   
     
      
    </Nav>
  </Navbar.Collapse>
  </>
    )}
    else{
      menu=(
        <>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    
    <Nav className="ml-auto">
        
     <LinkContainer to='/login'><Nav.Link>Log In</Nav.Link></LinkContainer>
   
      <LinkContainer to='/'><Nav.Link >Sign Up</Nav.Link></LinkContainer>
      
    </Nav>
  </Navbar.Collapse>
  </>

      )
    }


   
    return (
      <>
        
        
   
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <LinkContainer to='/dashboard'><Navbar.Brand >Home</Navbar.Brand></LinkContainer>
 {menu}
</Navbar>
</>
      


  
        
    )
}
export default Header
