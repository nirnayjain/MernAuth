import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


const Confirm=({match})=> {
    
    
       axios.get(`http://localhost:4000/api/user/confirm/${match.params.confirmationCode}`).then(response=>console.log(response)).catch(error=>alert(error))
    
       
      
     
      
      // ...
   
    



    
    return (
        <div>
            <div className="alert-success jumbotron" >
           <h1>Acount Confirmed</h1>
           </div>
           <h2>Click here to login <Link to="/login">login</Link></h2>
          
        </div>
    )
}
export default Confirm
