import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  // states for the editing feature
  const [todoEditing, setTodoEditing] = React.useState(null);
  const[editingText, setEditingText] = React.useState("");
  
  
  // Add the handlesubmit code here
  function handleSubmit(e){
      e.preventDefault();

      const newTodo = {
          id: new Date().getTime(),
          text: todo.trim(),
          completed: false
      };

      if(newTodo.text.length > 0){
          // add todo to the todos list/array
          setTodos([...todos].concat(newTodo));
          setTodo("");  // reset to default state
      }
      else{
          alert('Enter valid task');
          setTodo("");  // reset state to default
      }
  }
  
  
  // Add the deleteToDo code here
  function deleteTodo(id){
      // update todos list
      setTodos(
          todos.filter((todo) => todo.id !== id)
      );
  }

  
  // Add the toggleComplete code here
  function toggleComplete(id){
      let updatedTodos = todos.map((todo) => {
          if(todo.id === id){
              todo.completed = !todo.completed
          }
          return todo;
      });

      setTodos(updatedTodos);
  }
  
  // Add the submitEdits code here
  function submitEdits(id){
      let updatedTodos = todos.map((todo) => {
        if(todo.id === id){
            todo.text = editingText;
        }
        return todo;
      });

      setTodos(updatedTodos);
      setTodoEditing(null);
  }

  // if there are items in the local storage
  // load and store them in the current state
  React.useEffect(() => {
    const json = localStorage.getItem('todos');
    const loadedTodos = JSON.parse(json);

    if(loadedTodos){
        setTodos(loadedTodos);
    }
  }, []);


  // whenever a new item/todo is added to the todos list
  // store it in the local storage 
  // along with the previously stored todos/items
  React.useEffect(() => {
      if([todos].length > 0){
          const json = JSON.stringify(todos);
          localStorage.setItem('todos', json);
      }

  }, [todos]);

  
return(
    <div id="todo-list">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
            />
            <button type="submit">Add Todo</button>
        </form>
        {todos.map((todo) => (
            <div key={todo.id} className="todo">
                <div className="todo-text">
                    <input
                        type="checkbox"
                        id="completed"
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                    />
                    {todo.id === todoEditing ? (
                        <input
                            type="text"
                            onChange={(e) => setEditingText(e.target.value)}
                        />
                    ) : (
                            <div>{todo.text}</div>
                        )}
                </div>
                <div className="todo-actions">
                    {todo.id === todoEditing ? (
                        <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                    ) : (
                            <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                        )}
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
            </div>
        ))}
    </div>
    );
};
export default App;
