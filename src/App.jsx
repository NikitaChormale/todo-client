import React from 'react';
import { useEffect, useState } from 'react';
import deleteicon from './delete- img.png'
import imgedit from './editing.png'
import './App.css';
import axios from 'axios';
function App() {
const [todos ,setTodos] = useState([]);
const [oldtodo,setoldTodos] =useState("");
const[editmode,seteditmode]= useState(false);
const [newtodo,setnewTodos] =useState("");

const BASE_URL="https://todo-server-zi8z.onrender.com";
const loadTodos= async () => {
const response= await axios.get(`${BASE_URL}/todos`);
setTodos(response.data.data);
 };

 const addtodos= async ()=> {
  const response= await axios.post(`${BASE_URL}/todos`,{
    todoitem: newtodo,
  });
  loadTodos();
setnewTodos("");
 };
 const editTodo=async()=>{
  const response=await axios.put(`${BASE_URL}/todos/${id}`,{
    oldtdoitem:oldtodo,
    newtodoitem:newtodo
  });
  loadTodos();
  seteditmode(false);
  setnewTodos("");
  setoldTodos("");

 };
 

 const deletetodo=async(todoitem) =>{
  const response= await axios.delete(`${BASE_URL}/todos`,{
 data:{todoitem:todoitem}
  });
 
  loadTodos();
 };

useEffect(() => {
loadTodos();
},[])

  return(
    <div>
      <h1> ToDo  List</h1>

      <p> {editmode ? "Edit ToDo" : "Add ToDo"} </p>

      <div className='todo-item-container'>
      {todos.map((todo,index) => {
        return(
          <div key={index} className='todo-card'>
            <h3>{todo}</h3>

            <div>
             <img src={imgedit }
             className='img-edit-icon'
             onClick={()=>{
              seteditmode(true);
              setoldTodos(todo);
              setnewTodos(todo);
             }}/>
            <img src={deleteicon }
             className='img-delete-icon'
             onClick={()=>{
              deletetodo(todo);
             }}/>
             </div>
          </div>
        )
      })}
      </div>

     <div className='todo-add-container'>
      <input type='text' 
      placeholder='Add todo'
       className='input-todo'
       value={newtodo}
       onChange={(e) => {
        setnewTodos(e.target.value);
       }}/>
       
      <button className='btn-todo'
      onClick={()=>{
      if (editmode){
    editTodo();
      }else{
        addtodos();
      }
      }}>
       {editmode ? "Update ToDo" : "Add ToDo"} 
      </button>
      </div>
    </div>
  );
}


export default App
