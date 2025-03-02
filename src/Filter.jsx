import React, { useState } from 'react'

function Filter({friends,setfriends,orgf}) {
    const[byname,setByName]=useState('')
    
   
    const searchByName=(e)=>{
       
        setByName(e.target.value)
        let dup=[...friends]
        const data=dup.filter((d,i)=>d.name.startsWith(byname))
        console.log(friends)
        setfriends(data)
    
        
             

    }
  return (
    <div>
      <input type="text" value={byname} onChange={(e)=>searchByName(e)} placeholder='search by name'/>
      {/*<button onClick={()=>searchByName()}>Search</button>*/}
    </div>
  )
}

export default Filter
