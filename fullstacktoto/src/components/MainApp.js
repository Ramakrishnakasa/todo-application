import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ Todo: '' });
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const todosPerPage = 5; // Number of todos per page

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const results = todos.filter(todo =>
      todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTodos(results);
  }, [searchQuery, todos]);

  async function fetchTodos() {
    try {
      const response = await axios.get('http://localhost:8080/api/todos');
      setTodos(response.data);
      setFilteredTodos(response.data);
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
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  // Pagination Helpers
  const startIndex = (currentPage - 1) * todosPerPage;
  const paginatedTodos = filteredTodos.slice(startIndex, startIndex + todosPerPage);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <h2>What needs to be done?</h2>

      {/* Form to Add Todos */}
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

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Todos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Display Todos */}
      <div className="show">
        <h3>Todos:</h3>
        <ul>
          {paginatedTodos.map(todo => (
            <li key={todo.id}>
              <span>{todo.description}</span>
              <button onClick={() => deleteTodo(todo.id)} className="deleteButton">Delete</button>
            </li>
          ))}
        </ul>
        {paginatedTodos.length === 0 && <p>No matching todos found.</p>}
      </div>

      {/* Pagination Buttons */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default App;
