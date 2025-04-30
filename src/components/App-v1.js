import { useState, useRef, useEffect } from "react";
import "./App.css";

function TasksList({ tasks, onDelete }) {
  return (
    <>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((item, key) => (
            <li key={item + key}>
              <button onClick={() => onDelete(item)}>❌</button>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p>Empty list</p>
      )}
    </>
  );
}

// a mejorar: añadir un id aleatorio a cada tarea y borrarla por eso

function App() {
  const [tasksList, setTasksList] = useState(function () {
    const storedValue = localStorage.getItem("tasks").split(",");
    return storedValue ? storedValue : [];
  });
  const [taskToAdd, setTaskToAdd] = useState("");
  const counterRef = useRef(0);

  useEffect(
    function () {
      localStorage.setItem("tasks", tasksList);
    },
    [tasksList]
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (!taskToAdd) return;

    setTasksList([...tasksList, taskToAdd]);
    counterRef.current++;
    setTaskToAdd("");
  }

  function handleDelete(name) {
    const newList = tasksList.filter((task) => task !== name);
    console.log("Task to delete: " + name);

    setTasksList(newList);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Add a new task:</label>
        <input
          type="text"
          value={taskToAdd}
          onChange={(e) => setTaskToAdd(e.currentTarget.value)}
        />
        <input type="submit" value="Add" />
      </form>
      <span>Tasks added: {tasksList.length}</span>

      <TasksList tasks={tasksList} onDelete={handleDelete} />
    </div>
  );
}

export default App;
