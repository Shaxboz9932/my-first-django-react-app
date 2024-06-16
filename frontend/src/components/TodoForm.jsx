import axios from 'axios'
import React, { useState } from 'react'

function TodoForm({setTodos, fetchData}) {

  const [newTodo, setNewtodo] = useState({
    'body': ''
  })
  const [emptyValue, setEmptyValue] = useState(false)

  const handleChange = (e) => {
    setNewtodo(prev => ({
      ...prev,'body': e.target.value
    }))
  }

  const postTodo = async() => {
    await axios.post('http://127.0.0.1:8000/api/todo/', newTodo)
    setTodos(prev => [...prev, newTodo])
    fetchData()
    setEmptyValue(true)
  }

  return (
    <div>
      <input type="text" placeholder='Your Todo...' onChange={handleChange} value={emptyValue === true ? '' : newTodo.body}/>
      <button onClick={postTodo}>Add Todo</button>
    </div>
  )
}

export default TodoForm
