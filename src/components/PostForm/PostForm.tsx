import './PostForm.scss';
import { useState } from 'react';
import { getUser } from '../../services/user.service';
import usersFromServer from '../../api/users';
import { Todos } from '../../types/todos';

type Props = {
  onSubmit: (todos: Todos) => void;
};

export const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [chooseUser, setChooseUser] = useState(0);
  const [hasChooseUserError, setHasChooseUserError] = useState(false);

  const handleClickTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleClickSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChooseUser(+event.target.value);
    setHasChooseUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasChooseUserError(!chooseUser);

    if (!title || !chooseUser) {
      return;
    }

    setTitle('');
    setChooseUser(0);

    onSubmit({
      id: 0,
      title: title,
      userId: chooseUser,
      completed: false,
      user: getUser(chooseUser),
    });
  };

  return (
    <form onSubmit={handleSubmit} action="/api/todos" method="POST">
      <div className="field">
        <label htmlFor="title">Title: </label>

        <input
          value={title}
          id="title"
          placeholder="Enter a title"
          type="text"
          data-cy="titleInput"
          onChange={handleClickTitle}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          id="user"
          value={chooseUser}
          onChange={handleClickSelect}
          data-cy="userSelect"
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasChooseUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
