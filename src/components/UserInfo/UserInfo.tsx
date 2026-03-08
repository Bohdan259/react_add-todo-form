import './UserInfo.scss';
import { Todos } from '../../types/todos';

type Props = {
  todo: Todos;
};

export const UserInfo: React.FC<Props> = ({ todo }) => {
  if (!todo.user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${todo.user.email}`}>
      {todo.user.name}
    </a>
  );
};
