import { useEffect, useState } from 'react'
import './App.css'
// import TaskList from './TaskList'
import { supabase } from '../supabase.js'
import TaskList from './TaskList.jsx'

function App() {


const [input, setInput] = useState("")
const [task, setTask] = useState([])

const getTodo = async()=>{
  const {data,error}= await supabase.from("tasks").select()
  console.log(data)
  
    setTask(data)

}
 

 useEffect(() => {
   getTodo()
 }, [])


 const addTodo = async()=>{
  const {data,error} = await supabase.from('tasks').insert({task:input}).select().single()
  if(data){
    setTask((prev)=>[...prev,data])
  }
 }

const FormSubmit = (e)=>{
  e.preventDefault();
  addTodo();
  setInput("")
}

const handleRead = ()=>{
  console.log("data")
}

const handleDelete = async(id)=>{
  const {data,error} = await supabase.from("tasks").delete().eq('id',id)
  if(error){
    console.log('error',error)
    return
  }
  setTask((prev)=>prev.filter(task=>task.id !== id))
  console.log('data',data)
}
 
 
  return (
   <>
   hello todo
   <form onSubmit={FormSubmit}>
    <input type="text" placeholder='Add task' value={input} onChange={(e)=>setInput(e.target.value)}/>
    <button type='submit'>Submit</button>
   </form>
    {
        task.length > 0 ? <TaskList task={task} handleDelete={handleDelete} handleRead={handleRead}/> : "No task added"
    }
   </>
  )
}

export default App


// import { useState, useEffect } from 'react'
// import { supabase } from './utils/supabase'

// export default function App() {
//   const [todos, setTodos] = useState([])

//   useEffect(() => {
//     async function getTodos() {
//       const { data: todos } = await supabase.from('todos').select()

//       if (todos) {
//         setTodos(todos)
//       }
//     }

//     getTodos()
//   }, [])

//   return (
//     <ul>
//       {todos.map((todo) => (
//         <li key={todo.id}>{todo.name}</li>
//       ))}
//     </ul>
//   )
// }