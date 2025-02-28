import { useState } from 'react'
import './App.css'
function App() {
  const [value, setValue] = useState("")
  const[friends,setFriend]=useState([])
  const[status,setStatus]=useState(false)
  const[old,setold]=useState([])
  const setData=(e)=>{
    setValue(e.target.value)

  }
   const setFriends=()=>{
    if(value.trim().length>0)
    {
    
    
    setFriend([...friends,value])
    }
    else{
      alert("enter name first")
    }
   
 setValue("")
   }
   const removeFriend=(val,name)=>{
    setold([...old,name])
    let res=friends.filter((d,index)=>index!=val)
    setFriend(res)

   }
   const oldFr=(val,status)=>{
    if(status)
    {

    setold(old.filter((v,i)=>v!=val))
    setFriend([...friends,val])
    }
    else{
      setold(old.filter((v,i)=>v!=val))
    }

   }
   
  return (
    <>
      <div className="container">
          <input type="text" value={value} onInput={setData}/>
          <button onClick={setFriends}>AddFriend</button>
          {
            friends.map((v,index)=>(
              <div key={index} className='friends'><span>
                {v}</span>
                <button onClick={()=>removeFriend(index,v)}>X</button>
                </div>
            ))
          }
          <button onClick={()=>setStatus(!status)}>{status?"hideoldfriends":"showoldfriends"}</button>
          {
             status?old.map((d,index)=>(
              <div key={index} className='oldfriends'>
                <span>{d}</span>
                <button onClick={()=>oldFr(d,true)}>add</button>
                <button onClick={()=>oldFr(d,false)}>delete</button>
                </div>
              
             )):" "
          }
          </div>
    </>
  )
}

export default App
