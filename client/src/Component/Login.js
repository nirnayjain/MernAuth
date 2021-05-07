// import React,{useState} from "react";
// import {Button,Form,Container} from 'react-bootstrap';
// import {Link,useHistory,Redirect} from 'react-router-dom'
// import axios from 'axios'

// export default function Login() {
//      const  history =useHistory()
//     const[data,setData]=useState({
//     userName:"",
//     password:""
//   })
//   const submit= async(e)=>{
    
   
//     e.preventDefault()
//     try{
//      await axios.post("http://localhost:4000/api/user/login",{
//       userName:data.userName,
//       password:data.password}
//     ,{withCredentials:true})
  
//      history.push('/dashboard')

//     }

//   catch(error ){
//   if(error.response) { 
//     /* the request was made and the server responded
//     with a status code that falls out of the range of 2xx */
//     console.log(error.response.data)
//   }
// }

  
  
//   // catch(error){
//   //  if(error.response && error.response.data){
//   //    console.log(error.response.data.message)
//   //  }
//   // }
//     setData({
//     userName:"",
//     password:"" 
//     })
    


//   }
//   const handle=(e)=>{
//     const newData={...data}
//     newData[e.target.id]=e.target.value
//     setData(newData)
//   }
// return (
//   <div>
//       <h1 className="my-4 font-weight-bold .display-4">Sign In</h1>
//      <div className="conatiner">
//      <div className="form-div">
//   <form onSubmit={(e)=>submit(e)}>
//      <div>
//       <label htmlFor="userName">User Name :</label>
//       <input type="text" id="userName" required onChange={(e)=>handle(e)} value={data.userName||""}  className="form-control form-group"/>
//     </div>
//      <div>
//       <label htmlFor="password">Password :</label>
//       <input type="password" id="password"  required onChange={(e)=>handle(e)} value={data.password||""}  className="form-control form-group"/>
//     </div>
//    <button className="btn btn-dark mt-3" type="submit">Login In</button> 
//    <p></p>
//     <p>Not Registered? <Link to="/">Register</Link></p>
//   </form>
//   </div>
//   </div>

//   </div>
  
  
// )

// }
import React,{useEffect} from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import axios from 'axios'
import {useHistory,Redirect} from 'react-router-dom'
import {GoogleLogin} from 'react-google-login'
import {GoogleButton} from 'react-google-button'
import dotenv from 'dotenv'

 const Login = ({isLoggedIn,setIsLoggedIn}) => {
   const history=useHistory()
   useEffect(()=>{
     if(isLoggedIn)
    history.push("/dashboard")
   },[])
   
   const responseGoogle=(response)=>{
     console.log(response)
  
       axios({
         method:"POST",
         url:'http://localhost:4000/api/user/googleLogin',
         data:{tokenId:response.tokenId},
         withCredentials:true
       }).then(response=>{
         console.log(response)
         history.push("/dashboard")

       })
        
         
      
     
      }
      const responseGoogleFailure=(error)=>{
        console.log(error)
      }
  const validate = Yup.object({
    
    userName: Yup.string()
      
      .required('Required'),
    
    password: Yup.string()
       
      .required('Password is required'),
   
  })
  return (
    
    <Formik
      initialValues={{
        
        
        userName:'',
       
        password: '',
        
      }}
      validationSchema={validate}
      onSubmit={async(values) => {
        console.log(values)
        try{
        await axios.post("http://localhost:4000/api/user/login",
          values,
         {withCredentials:true}
        )
        
        
          localStorage.setItem('data',true)
        
         
          
           history.push('/dashboard')
          
        }
      catch(error){
        if(error.response) { 
//     /* the request was made and the server responded
//     with a status code that falls out of the range of 2xx */
  console.log(error.response.data)}
      }
      }}
    >
      
      {formik => (
        <div style={{width:"50vh",margin:"auto"}} >
          <h1 className="my-4 font-weight-bold .display-4">Sign In</h1>
          <Form>
           
            
             <TextField label="UserName" name="userName" type="text" />
            
            <TextField label="password" name="password" type="password" />
            
            <button className="btn btn-dark mt-3" type="submit" style={{width:'40%',marginLeft:"8%"}}>Login</button>
            <button className="btn btn-danger mt-3 ml-3" type="reset"  style={{width:'40%'}}>Reset</button>
          </Form>
          <p></p>
          <p style={{marginLeft:"50%"}}>Or</p>
          
          
          <GoogleLogin
    clientId={process.env.GOOGLE_CLIENT_ID}
     render={renderProps => (
      <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled} style={{width:'100%'}}>Sign in with Google</GoogleButton>
    )}
    onSuccess={responseGoogle}
    onFailure={responseGoogleFailure}
    cookiePolicy={'single_host_origin'}
  />
        </div>
      )}
    </Formik>
  )
}
export default Login
