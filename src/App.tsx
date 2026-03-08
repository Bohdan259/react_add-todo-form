import './App.scss';
import { TodoList } from './components/TodoList';
import { initialTodos } from './services/initialTodos.services';
import { PostForm } from './components/PostForm';
import { useState } from 'react';
import { Todos } from './types/todos';

function getNewTodoId(todos: Todos[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todos[]>(initialTodos);

  const addTodo = ({ id, ...data }: Todos) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

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
