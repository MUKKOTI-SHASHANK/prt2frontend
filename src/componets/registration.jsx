import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
export default function Registration() {
    
    // const nav=useNavigation()
    const nav=useNavigate()
    const[details,setdetails]=useState({email:"",password:"",confirmpassword:""})
    const eventhandler=(e)=>{
        e.preventDefault()
        // console.log(details)
        if(details.password!=details.confirmpassword){
            alert("password doesn't match")
        }else{
            fetch("http://localhost:3001/register",{
                method:"POST",
                headers:{
                "Accept":"application/json",
                "Content-Type":"application/json" 
               },
               body:JSON.stringify({email:details.email,password:details.password,confirmpassword:details.confirmpassword})
            }).then(x=>x.json()).then(y=>{
                if(y.status=="sucess"){
                    alert(y.message)
                    nav("/login")
                }else{
                    alert(y.message)
                }
            })
        }
    }
  return (
    <div className='s-parent'>
        <div className="container">
            <h1>Register</h1>
            <form onSubmit={eventhandler}>
                <div>
                    <input type="email" style={{width:"175px", height:"30px"}} required placeholder='example@email.com' onChange={(event)=>setdetails({...details,email:event.target.value})}/>
                </div>
                <div>
                    <input type="password" style={{width:"175px", height:"30px"}} required placeholder='password'onChange={(event)=>setdetails({...details,password:event.target.value})}/>
                </div>
                <div>
                    <input type="password" style={{width:"175px", height:"30px"}} required placeholder='confirm password'onChange={(event)=>setdetails({...details,confirmpassword:event.target.value})}/>
                </div>
                <button type="submit" style={{width:"175px", height:"30px", background:"lightblue"}} >register</button>
            </form>
            <p>alreday an user?</p>
            <Link to="/login" className='link'>login</Link>
        </div>
    </div>
  )
}
