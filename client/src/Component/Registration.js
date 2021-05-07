// import React,{useState} from "react";
// import {Button,Form,Container} from 'react-bootstrap';
// import {Link,useHistory} from 'react-router-dom'
// import axios from 'axios'



// const Register= () => {
 
//   const  history =useHistory()
//   const[isRegistered,setIsRegistered]=useState(false)
//   const[data,setData]=useState({
//    Name:"",
//     userName:"",
//     email:"",
//     password:""
//   })
//   const submit= async(e)=>{
   
//     e.preventDefault()
//     if(data.password.length<6) return alert("Password too short")
//     try{
//    await axios.post("http://localhost:4000/api/user/register",{
//       name:data.name,
//       userName:data.userName,
//       email:data.email,
//       password:data.password
//     ,withCredentials:true})
//      setIsRegistered(true)
//     // history.push("/login")

//   }
 
//   catch(error){
//    alert(error)
//   }
//     setData({
//        name:"",
//     userName:"",
//     email:"",
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
//       <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
//      <div className="conatiner">
//      <div className="form-div">
//   <form onSubmit={(e)=>submit(e)}>
//     <div>
//         <label htmlFor="Name">Name :</label>
//       <input type="text" id="name"  required onChange={(e)=>handle(e)} value={data.name||""}  className="form-control form-group" />
//     </div>
//      <div>
//       <label htmlFor="userName">User Name :</label>
//       <input type="text" id="userName" required onChange={(e)=>handle(e)} value={data.userName||""}  className="form-control form-group"/>
//     </div>
//      <div>
//       <label htmlFor="email">Email :</label>
//       <input type="email" id="email"  required onChange={(e)=>handle(e)} value={data.email||""}  className="form-control form-group"/>
//     </div>
//      <div>
//       <label htmlFor="password">Password :</label>
//       <input type="password" id="password"  required onChange={(e)=>handle(e)} value={data.password||""}  className="form-control form-group"/>
//     </div>
//    <button className="btn btn-dark mt-3" type="submit">Register</button>
//     <p>Already have account? <Link to="/login">login</Link></p>
//   </form>
//   </div>
//   </div>
//   {isRegistered? <h3>Please verify your email sent at ur email address to login.</h3> : " "}

//   </div>
  
  
// )

// }
   
// export default Register;

import React,{useState} from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import axios from 'axios'
import {GoogleLogin} from 'react-google-login'
import {GoogleButton} from 'react-google-button'
import {Alert} from 'react-bootstrap'
import {useHistory,Link} from 'react-router-dom'


 const Register = () => {
   const history=useHistory()
   const [isRegistered,setIsRegistered]=useState(false)
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
        console.log(error
          )
      }
  const validate = Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    userName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
   
  })
  return (
    <>
    <Formik
      initialValues={{
        
        name: '',
        userName:'',
        email: '',
        password: '',
        
      }}
      validationSchema={validate}
      onSubmit={async(values,{resetForm}) => {
        console.log(values)
        try{
        await axios.post("http://localhost:4000/api/user/register",
          values,
         {withCredentials:true}
        )
        setIsRegistered(true)
        resetForm({})
      }
      catch(error){
        alert(error)
      }
      }}
    >
      {formik => (
        <div style={{width:"50vh",margin:"auto"}} >
          <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
          <Form>
           
            <TextField label="Name" name="name" type="text" />
             <TextField label="UserName" name="userName" type="text" />
            <TextField label="Email" name="email" type="email" />
            <TextField label="Password" name="password" type="password" />
            
            <button className="btn btn-dark mt-3" type="submit"  style={{width:'40%',marginLeft:"8%",marginRight:"2%"}}>Register</button>
            <button className="btn btn-danger mt-3 ml-3" type="reset" onClick={()=>setIsRegistered(false)}
             style={{width:'40%'}}>Reset</button>
          </Form>
          <p></p>
          <h5 style={{marginLeft:"40px"}}>Already have account? <Link to="/login">Login</Link></h5>
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
    
    <br></br>
     {isRegistered ?<Alert  variant="info" >
    Please Verify your email sent at your Email Address to continue further!
  </Alert> : " "}
  </>
  )
}
export default Register