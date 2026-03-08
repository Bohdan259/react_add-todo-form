import './App.scss';
import { TodoList } from './components/TodoList';
import { initialTodos } from './services/initialTodos.services';
import { PostForm } from './components/PostForm';
import { useState } from 'react';
import { Todos } from './types/todos';

export const App = () => {
  const [todos, setTodos] = useState<Todos[]>(initialTodos);

  const addTodo = (newTodo: Todos) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <PostForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
