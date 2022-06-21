import React, { useState } from 'react';
import './App.css';

interface Todo {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
}

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

const App = () => {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filter, setFilter] = useState<Filter>('all');

  const handleOnSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
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

  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        return { ...todo, removed: !removed };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        // 削除されていないもの全て
        return !todo.removed;
      case 'checked':
        // 完了済みかつ削除されていないもの
        return todo.checked && !todo.removed;
      case 'unchecked':
        // 未完了かつ削除されていないもの
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });

  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <select defaultValue="all" onChange={(e) => setFilter(e.target.value as Filter)}>
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
      {filter === 'removed' ? (
        <button type="button" onClick={handleOnEmpty} disabled={todos.filter((todo) => todo.removed).length === 0}>
          ごみ箱を空にする
        </button>
      ) : (
        filter !== 'checked' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOnSubmit();
            }}
          >
            <input type="text" value={text} onChange={(e) => handleOnChange(e)} />
            <input type="submit" value="追加" onSubmit={(e) => e.preventDefault()} />
          </form>
        )
      )}

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.checked}
              disabled={todo.removed}
              onChange={() => handleOnCheck(todo.id, todo.checked)}
            />
            <input
              type="text"
              value={todo.value}
              onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              disabled={todo.checked || todo.removed}
            />
            <button type="button" onClick={() => handleOnRemove(todo.id, todo.removed)}>
              {todo.removed ? '復元' : '削除'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
