import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import{useNavigate}from "react-router-dom"
import Todo from './Todo'
export default function Home(props) {
    const nav=useNavigate()
    const[add,setadd]=useState(false)
    const[activity,setactivity]=useState("")
    const[data,setdata]=useState([])

    const{email,token,settoken}=props
    useEffect(()=>{
        fetch("http://localhost:3001/home",{
                method:"GET",
                headers:{
                "Accept":"application/json",
                "Content-Type":"application/json" ,
                "Authorization":token
               }
              
            }).then(response=>response.json()).then(data1=>{
                if(data1.status=="sucess"){
                setdata(data1.data)
                
            }
                else{
                    //console.log(data1)
                    alert(data1.message)
                }
            })
    },[])
    
    const functionhandler=(event)=>{
        event.preventDefault()
        // console.log(activity)
        fetch("http://localhost:3001/home",{
                method:"POST",
                headers:{
                "Accept":"application/json",
                "Content-Type":"application/json" ,
                "Authorization":token
               },
               body:JSON.stringify({status:"Pending",timetaken:" ",activity:activity})
            }).then(response=>response.json()).then(data=>{
                setdata([...data,{status:"Pending",timetaken:" ",activity:activity}])
            })
    }
  return (
    <div className='homeconatiner'>
        <div className='header'>{email}</div>
        <div className='bottom'>
            <div className='nav'>
                <h1>TODOLIST</h1>
                <h3>HISTORY</h3>
                <div>
                    <button onClick={()=>{
                        settoken("")
                        alert("logout")
                        nav("/login")
                    }}>Logout</button>
                </div>
            </div>
            <div className='timercontent'>
                <div className='add'>
                    <div>
                    {add?<form onSubmit={functionhandler}><input type="text" placeholder='activity' 
                    onChange={(e)=>{setactivity(e.target.value);}}/>
                    <button type="submit">Add</button>
                    <button onClick={()=>setadd(!add)}>close</button>
                    </form>:<></>}
                    </div>
                    <div>
                        <button onClick={()=>setadd(!add)}>Add Activity</button>
                    </div>
                </div>
                <div>
                    <Todo data={data} token={token}/>
                </div>
                
            </div>
        </div>

    </div>
  )
}
