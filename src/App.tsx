import React, { useState } from 'react';
import './App.css';

interface Todo {
  value: string;
  readonly id: number;
  checked: boolean;
}

const App = () => {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setText('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnEdit = (id: number, value: string) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        return { ...todo, value };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !checked };
      }
      return todo;
    });

    setTodos(newTodos);
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
            <input type="checkbox" checked={todo.checked} onChange={() => handleOnCheck(todo.id, todo.checked)} />
            <input
              type="text"
              value={todo.value}
              onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              disabled={todo.checked}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
