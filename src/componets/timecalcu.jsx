import React from 'react'

import { useEffect } from 'react';
import { useState } from 'react'

export default function Timecalcu(props) {
  const{Start,setStart,data,token}=props
    const[sec,setsec]=useState(0)
    const[min,setmin]=useState(0)
    const[running,setrunning]=useState(false)
    
    useEffect(()=>{
        if(running){
            setTimeout(()=>{
                 setsec(pre=>pre+1)
                 if(sec%59===0){
                    setsec(0)
                    setmin(min+1)
                 }
            },1000)}
    },[running,sec])
   
  const startfunction=()=>{
   if(Start)
   alert("other task is running")
   else{
    setStart(true)
     setrunning(true)
     data.status="Ongoing"
  }
}
const stopfunction=()=>{
  fetch(`http://localhost:3001/home/${data._id}`,{
    method:"PUT",
    headers:{
    "Accept":"application/json",
    "Content-Type":"application/json" ,
    "Authorization":token
   },
   body:JSON.stringify({timetaken:`${min}:${sec}`,status:"Completed"})
}).then((response)=>response.json()).then(data1=>{
    if(data1.status!="sucess"){
      alert(data1.message)
    }
})
}
  return (
    <>
    <td>
    <div>{min>9?min:"0"+min}:{sec>9?sec:"0"+sec}</div>
    </td>
    <td>{!running? <button style={data.status=="Completed"?{display:"none"}:{display:"inline"}} 
    onClick={()=>startfunction()}>start</button>:<>
    <button style={data.status=="Completed"?{display:"none"}:{display:"inline"}} 
    onClick={()=>{setrunning(!running);setStart(!Start)}}>pause</button>
    <button style={data.status=="Completed"?{display:"none"}:{display:"inline"}} 
    onClick={()=>{setrunning(false);
      setStart(false);
      data.status="Completed"
      stopfunction()
      data.timetaken=`${min}:${sec}`
      }}>stop</button>
    </>
    }
    </td>
    </>
    
  )
}

