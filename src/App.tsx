import React, { useState } from 'react';
import './App.css';

interface Todo {
  value: string;
  readonly id: number;
}

const App = () => {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
    setText('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <input type="text" value={text} onChange={(e) => handleOnChange(e)} />
        <input type="submit" value="追加" onSubmit={(e) => e.preventDefault()} />
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="text" value={todo.value} onChange={(e) => e.preventDefault()} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
