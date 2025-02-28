import React, { useEffect, useState } from 'react'
import './Books.css'
import NavBar from './NavBar'
function Books() {

    const[books,setBooks]=useState([])
    const[count,setCount]=useState(0)
    const[bookstoread,setBooksToRead]=useState([])
 
    function addBook(data)
    {
        setBooksToRead([...bookstoread,data])
        setCount(pre=>pre+1);
        console.log(bookstoread)
    }
    useEffect(()=>{
        const getData=async ()=>
            {
                const get=await  fetch("https://www.dbooks.org/api/recent")
                const result=await get.json();
                console.log(result)
                setBooks(result.books);
            }
           
            getData();
           
            

    },[])
  return (
    
     <>
     <NavBar/>
    {
      
  books.map((data) => (
    <div key={data.id}>  {/* Added a key for better rendering performance */}
      <img src={data.image || 'default-image-path'} alt={data.title} /> {/* Added fallback for image */}
      {
        bookstoread.find(d => d.id === data.id) ? (  // Using find() instead of filter()
          <button>Remove</button>
        ) : (
          <button>Add</button>
        )
      }
      <h4>{data.title.slice(0, 30)}</h4>
    </div>
  
  ))
}

</>
  )
}
export default Books