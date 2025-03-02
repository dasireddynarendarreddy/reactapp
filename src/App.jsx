import { useEffect, useState } from 'react'

import Filter from './Filter'
function App() {
  const [value, setValue] = useState("")
  const[friends,setFriend]=useState([])
  const[status,setStatus]=useState(false)
  const[old,setold]=useState([])
  const[number,setNumber]=useState('')
   
  
  const setData=(e)=>{
    setValue(e.target.value)

  }
   const setFriends=()=>{
    if(value.trim().length>0&&number.length>=10)
    {
      localStorage.setItem("data", JSON.stringify([...friends,{name:value,number:number}]));
    
    setFriend([...friends,{name:value,number:number}])
   

    }
    else{
      alert("enter name first")
    }
   
 setValue("")
   }
   const removeFriend=(val,name)=>{

    setold([...old,friends[val]])
    localStorage.setItem("old",JSON.stringify([...old,friends[val]]))
    console.log(old)
    setFriend(friends.filter((d,i)=>i!=val))
   let getfriends=JSON.parse(localStorage.getItem("data"));//get localstorage items in order toremove the removed friend localstorag and insert again
   let res=getfriends.filter((data,index)=>index!=val)//filter to remove the element from localstorage and put the data in to localstorage again
   localStorage.setItem("data",JSON.stringify(res))


   }
   const oldFr=(val,status)=>{
    if(status)
    {

    /*setold(old.filter((v,i)=>v!=val))
    setFriend([...friends,val])*/
     setFriend([...friends,old[val]])//we have to update the state we have update localstorage also 
      localStorage.setItem("data",JSON.stringify([...friends,old[val]]))
      //we have to remove the friedn the old friends list 
      setold(old.filter((data,index)=>index!=val))// we have to update the localstorage of the old friends also
       let setoldfriends=old.filter((data,index)=>index!=val)
      localStorage.setItem("old",JSON.stringify(setoldfriends))
    }
    else{
      let setoldfriends=old.filter((data,index)=>index!=val)
      localStorage.setItem("old",JSON.stringify(setoldfriends))
      setold(old.filter((v,i)=>i!=val))
    }

   }
   const MessageFriend=(index,phnumber,platform)=>{
    
    let val="enter message here ✌️"
     /*if(platform=="whatsapp")
      window.location.href=`https://api.whatsapp.com/send?phone=${phnumber}&text=${val}`
      else
      {
      let number='+91'+phnumber
      window.location.href=`https://t.me/${number}`
      }*/
     let number='+91'+phnumber.trim()
     switch(platform)
     {
      case "whatsapp":window.location.href=`https://api.whatsapp.com/send?phone=${number}&text=${val}`
                       break;
      case "telegram": window.location.href=`https://t.me/${number}`
                       break
        case "signal": window.location.href=`https://signal.me/#p/${number}`
        break
     }

   }
   useEffect(()=>{
       console.log("component rendered")
       let getfriends=JSON.parse(localStorage.getItem("data"))
       console.log(getfriends)
       if(localStorage.getItem("data")!=null&&getfriends.length>0)
       {
        setFriend(getfriends)
       }
       let getoldfriends=JSON.parse(localStorage.getItem("old"))
       if(localStorage.getItem("old")!=null&&getoldfriends.length>0)
       {
        setold(getoldfriends)
       }
   },[])
   
  return (
    <>
        
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <div>
          <label>Name</label>
          <input type="text" value={value} onInput={setData} className="form-control mb-2"/>
          </div>
          <div>
            <label>PhoneNumber</label>
          <input type="text" value={number} onChange={(e)=>setNumber(e.target.value)} className="form-control mb-2"/>
          </div>
         
          <button onClick={setFriends} className='btn btn-success mb-3'>AddFriend</button>
          <Filter friends={friends} setfriends={setFriend}/>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>PhoneNumber</th>
              </tr>
            </thead>
            <tbody>
          {
            friends.map((v,index)=>(
              <tr key={index}>
                <td>{v.name}</td>
                <td>{v.number}</td>
                <td><button className="btn btn-danger mx-1" onClick={()=>removeFriend(index,v)}>Remove</button></td>
                <td><button className="btn btn-success mx-1" onClick={()=>MessageFriend(index,v.number,"whatsapp")}><span><i className="bi bi-whatsapp"></i></span></button></td>
                <td><button /*className="btn btn-success mx-1"*/ style={{backgroundColor:"#26A5E4",border:"0px",padding:"8px",borderRadius:"2px"}} onClick={()=>MessageFriend(index,v.number,"telegram")}><span><i className="bi bi-telegram"></i></span></button></td>
                <td><button onClick={()=>MessageFriend(index,v.number,"signal")}><i className="bi bi-signal"></i></button></td>
              </tr>
            ))
          }
          </tbody>
          </table>

          <button className='btn btn-info mt-3' onClick={()=>setStatus(!status)}>
            {status?"Hide Old Friends":"Show Old Friends"}
          </button>

          <table className="table table-bordered mt-3">
            <thead></thead>
            <tbody>
          {
             old.length>0 && status ? old.map((d,index)=>(
              <tr key={index}>
                <td>{d.name}</td>
                <td>{d.number}</td>
                <td>
                  <button onClick={()=>oldFr(index,true)} className='btn btn-success mx-1'>Add</button>
                  <button onClick={()=>oldFr(index,false)} className='btn btn-danger mx-1'>Delete</button>
                </td>
              </tr>
             )) : (
              <tr><td colSpan="3">Removed Friends Appear Here</td></tr>
             )
          }
          </tbody>
          </table>
</div>

    </>
  );
};
export default App
