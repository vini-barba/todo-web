/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer } from 'react';
import { Container, TodoListContainer } from './styles';
import api from '../../services/api';

import TodoItem, { Todo } from '../../components/TodoItem';
import TodoCreator from '../../components/TodoCreator';

import todoReducer, {
  initialState as todoInitialState,
} from '../../reducers/todo';

import userReducer, {
  initialState as userInitialState,
} from '../../reducers/user';
import UserForm from '../../components/UserForm';

export const TodoContext = React.createContext<any>(null);
export const UserContext = React.createContext<any>(null);

const TodoList: React.FC = () => {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);
  const [todoState, todoDispatch] = useReducer(todoReducer, todoInitialState);

  function fetchTodoList() {
    todoDispatch({
      type: 'fetch_todoList_pending',
      payload: null,
    });

    const userId = userState?.user?.data?._id || null;

    if (userId === null) {
      todoDispatch({
        type: 'fetch_todoList_rejected',
        payload: 'User not found',
      });
      return;
    }

    api
      .get(`/todo/${userId}`)
      .then((res) => {
        todoDispatch({
          type: 'fetch_todoList_resolved',
          payload: res.data,
        });
      })
      .catch((err) => {
        todoDispatch({
          type: 'fetch_todoList_rejected',
          payload: err.response.body,
        });
      });
  }

  useEffect(() => {
    fetchTodoList();
  }, [userState.user.data]);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      <TodoContext.Provider value={{ todoState, todoDispatch }}>
        <Container>
          {userState.user.data === null ? <UserForm /> : <TodoCreator />}
          <TodoListContainer>
            {todoState.todoList.data.map((todoItem: Todo) => (
              <TodoItem key={todoItem._id} todoData={todoItem} />
            ))}
          </TodoListContainer>
        </Container>
      </TodoContext.Provider>
    </UserContext.Provider>
  );
};

export default TodoList;
