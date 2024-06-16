import React, { useEffect, useState } from 'react'
import Table from './components/Table'
import TodoForm from './components/TodoForm'

import axios from 'axios'

function App() {

  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async() => {
    const res = await axios.get('http://127.0.0.1:8000/api/todo/')
    setIsLoading(false)
    setTodos(res.data)

  }

  return (
    <div>
      <h2>Hello world</h2>
      <TodoForm setTodos={setTodos} fetchData={fetchData}/>
      <Table todos={todos} isLoading={isLoading} setTodos={setTodos} fetchData={fetchData}/>
    </div>
  )
}

export default App
