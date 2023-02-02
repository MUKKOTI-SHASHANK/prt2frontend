import React from 'react'
import { useState } from 'react'
import {Link,useNavigate} from"react-router-dom"
export default function Login(props) {
    const nav=useNavigate()
    const{settoken,setemail}=props
    const[details,setdetails]=useState({email:"",password:""})
    const eventhandler=(event)=>{
        event.preventDefault()
        fetch("http://localhost:3001/login",{
            method:"POST",
            headers:{
            "Accept":"application/json",
            "Content-Type":"application/json" 
           },
           body:JSON.stringify(details)
        }).then(x=>x.json()).then(y=>{
            if(y.status=="sucess"){
                setemail(details.email)
                settoken(y.token)
                nav("/home")
            }else{
                alert(y.message)
            }
            })
    }
  return (
    <div className='l-parent'>
        <div className="container">
            <h1>login</h1>
            <form onSubmit={eventhandler}>
                <div>
                    <input type="email" style={{width:"175px", height:"30px"}} required placeholder='example@email.com' onChange={(event)=>setdetails({...details,email:event.target.value})}/>
                </div>
                <div>
                    <input type="password" style={{width:"175px", height:"30px"}} required placeholder='password'onChange={(event)=>setdetails({...details,password:event.target.value})}/>
                </div>
                <button type="submit" style={{width:"175px", height:"30px", background:"lightblue"}}>login</button>
            </form>
            <p><Link to="/" className='link'>Not an user? Signup</Link></p>
        </div>
    </div>
  )
}
