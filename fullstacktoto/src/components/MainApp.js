import { useState, useEffect } from 'react';
import axios from 'axios';

// import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [formData, setFormData] = useState({ Todo: '' });
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);  // Track which todo is being edited
  const [editValue, setEditValue] = useState('');  // Track the new value for editing

  useEffect(() => {
    fetchTodos();
  }, []);

  
  async function fetchTodos() {
    try {
      const response = await axios.get('http://localhost:8080/api/todos');
      console.log(response);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  async function submitForm(e) {
    e.preventDefault();
    if (!formData.Todo.trim()) return;

    try {
      const response = await axios.post('http://localhost:8080/api/todos', { description: formData.Todo });
      setTodos([...todos, response.data]);
      setFormData({ Todo: '' });
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }

  async function deleteTodo(id) {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id)); // Remove the deleted todo from the list
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  function startEditing(todo) {
    setEditing(todo.id);
    setEditValue(todo.description);  // Set the current value to edit
  }

  async function handleEdit(e, id) {
    e.preventDefault();
    if (!editValue.trim()) return;

    try {
      const response = await axios.put(`http://localhost:8080/api/todos/${id}`, { description: editValue });
      setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
      setEditing(null);
      setEditValue('');
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <h2>What needs to be done?</h2>

      <form onSubmit={submitForm} className="form">
        <input
          type="text"
          name="Todo"
          id="todotext"
          placeholder="Enter Todo"
          value={formData.Todo}
          onChange={(e) => setFormData({ ...formData, Todo: e.target.value })}
        />
        <button type="submit" id="submittodo">Submit</button>
      </form>

      <div className="show">
        <h3>Todos:</h3>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {editing === todo.id ? (
                <form onSubmit={(e) => handleEdit(e, todo.id)} className="editForm">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button type="submit" className="saveButton">Save</button>
                </form>
              ) : (
                <>
                  <span>{todo.description}</span>
                  <div className="todo-buttons">
                    <button onClick={() => startEditing(todo)} className="editButton">Edit</button>
                    <button onClick={() => deleteTodo(todo.id)} className="deleteButton">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
