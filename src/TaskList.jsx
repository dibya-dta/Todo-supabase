import React from 'react'

export default function TaskList({task,handleRead,handleDelete}) {
  return (
   <>
   <ul>
    {task.map((item)=>{
        return (
        <li key={item.id}>
            <p>{item.task}</p>
            <button onClick={handleRead}>Read</button>
            <button onClick={()=>handleDelete(item.id)}>Delete</button>
        </li>

        )
})}
   </ul>
   </>
  )
}
