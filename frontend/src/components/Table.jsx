import axios from 'axios'
import React, { useState } from 'react'

function Table({isLoading, todos, setTodos, fetchData}) {

  const [id, setId] = useState(null)
  const [resData, setResData] = useState({'body': ''})
  const [showModal, setShowmodal] = useState(false)
  
  const handleDelete = async(id) => {
    await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
    const newArr = todos.filter((item) => {
      return id !== item.id
    })
    setTodos(newArr)
  }

  const handleEdit = async(id) => {
    setShowmodal(true)
    const res = await axios.get(`http://127.0.0.1:8000/api/todo/${id}/`) 
    setResData(res.data)
    setId(res.data.id)
  }

  const handleEditChange = (e) => {
    setResData({'body': e.target.value})
  }

  const submitEditTodo = async(id) => {
    // e.preventdefault()
    const res = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`,{
      'body': resData.body
    })
    fetchData()
  }

  return (
    <div>
      <h2>Todos App</h2>
      {todos.length === 0 && <h4>Empty todo !!</h4>}
      {isLoading && <h4>Loading...</h4>}
      {todos && todos.map((item, idx) => {
        return(
          <div key={idx}>
            <p>{item.body} | created: {item.created} | complited: {item.completed === true ? 'Ok': 'Not'}</p>
            <button style={{
              marginRight: '10px',
              borderRadius: '5px',
              backgroundColor: '#00008B',
              color: 'white',
              fontSize: '20px',
              border: 'none',
              cursor: 'pointer'
              }} onClick={() => handleDelete(item.id)}>Delete</button>
              <button style={{
              borderRadius: '5px',
              backgroundColor: '#52D017',
              color: 'white',
              fontSize: '20px',
              border: 'none',
              cursor: 'pointer'
              }} onClick={() => handleEdit(item.id)}>Edit</button>
          </div>  
        )
      })}
      {showModal === true && 
        <div>
            <h2>Edit Window</h2>
            <input type="text" onChange={handleEditChange} value={resData.body}/>
            <button onClick={() => submitEditTodo(id)}>Edit Todo</button>
            <button onClick={() => setShowmodal(false)}>Close</button>
        </div>
      }
    </div>
  )
}

export default Table
