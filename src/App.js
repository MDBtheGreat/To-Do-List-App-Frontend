import { useEffect, useState } from "react";
import ToDo from './components/ToDo';
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {
  const [toDo, setToDo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")

  useEffect(() => {
    getAllToDo(setToDo)
  }, [])

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }

  const baseUrl = "https://to-do-list-app-backend-0knd.onrender.com";

  return (
    <div className="App">
      <div className="container">
        <h1>To-Do List</h1>

        <div className="top">
          <input 
            type="text" 
            placeholder="Add a task..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div
            className="add" 
            onClick={ isUpdating ? 
              () =>updateToDo(toDoId, text, setToDo, setText, setIsUpdating) 
            : () => addToDo(text, setText, setToDo)}>
              {isUpdating ? "Update" : "Add"}
          </div>
        </div>

        <div className="list">
          {toDo.map((item) => <ToDo 
            key={item._id} 
            text={item.text} 
            updateMode = {() => updateMode(item._id, item.text)}
            deleteToDo = {() => deleteToDo(item._id, setToDo)} 
          />)}
        </div>

        <div className="api-links">
          <h2>API Endpoints</h2>
          <div className="endpoint-list">
            <a 
              href={`${baseUrl}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="endpoint-link"
            >
              GET All To-Dos
            </a>
            <a 
              href={`${baseUrl}/save`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="endpoint-link"
            >
              POST Create To-Do
            </a>
            <a 
              href={`${baseUrl}/update`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="endpoint-link"
            >
              POST Update To-Do
            </a>
            <a 
              href={`${baseUrl}/delete`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="endpoint-link"
            >
              POST Delete To-Do
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;