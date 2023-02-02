import React from 'react'
import { useState } from 'react'
import Timecalcu from './timecalcu'
export default function Todo(props) {
  const{data,token}=props
  const[Start,setStart]=useState(false)
  
  return (
    <div>
      <table>
        <thead>
          <th>Activity</th>
          <th>Status</th>
          <th>Time taken</th>
          <th>Action</th>
        </thead>
      
      <tbody>
        {data.map(data=>{
          return(
            <tr>
              <td>{data.activity}</td>
              <td>{data.status}</td>
              {data.status!="Completed"?<Timecalcu data={data}Start={Start}
              setStart={setStart} 
              token={token}/>:<>
              <td>{data.timetaken}</td><td> </td></>}
              
            </tr>
          )
        })}
      </tbody>
      </table>
    </div>
  )
}
