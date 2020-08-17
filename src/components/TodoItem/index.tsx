/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';

import moment from 'moment';
import {
  Container,
  Textarea,
  ButtonsContainer,
  DeleteIcon,
  CheckIcon,
  TextContainer,
} from './styles';

import api from '../../services/api';
import { TodoContext } from '../../pages/TodoList';

export interface Todo {
  _id: string;
  text: string;
  checked: boolean;
  dueDate: Date;
}

interface TodoData {
  todoData: Todo;
}

const TodoItem: React.FC<TodoData> = ({ todoData }) => {
  const [checkedTodo, setCheckedTodo] = useState(todoData.checked);
  const [textTodo, setTextTodo] = useState(todoData.text);

  const todoContext = useContext(TodoContext);

  function updateTodo(valuesToUpdate: any) {
    todoContext.todoDispatch({ type: 'update_todoList_pending' });
    api
      .put(`/todo/${todoData._id}`, {
        todo: {
          ...valuesToUpdate,
        },
      })
      .then((res) => {
        todoContext.todoDispatch({
          type: 'update_todoList_resolved',
          payload: res.data,
        });
      })
      .catch((err) => {
        todoContext.todoDispatch({
          type: 'update_todoList_rejected',
          payload: err.response.data,
        });
      });
  }

  function handleToggleCheckTodo(todoChecked: boolean) {
    setCheckedTodo(todoChecked);
    updateTodo({ checked: todoChecked });
  }

  function handleTextUpdate(text: string) {
    updateTodo({ text });
  }

  function handleDeleteTodo() {
    todoContext.todoDispatch({ type: 'delete_todoList_pending' });
    api
      .delete(`/todo/${todoData._id}`)
      .then(() => {
        todoContext.todoDispatch({
          type: 'delete_todoList_resolved',
          payload: { _id: todoData._id },
        });
      })
      .catch((err) => {
        todoContext.todoDispatch({
          type: 'delete_todoList_rejected',
          payload: err.response.data,
        });
      });
  }

  function formatDateToShow(dueDate: Date) {
    return moment(dueDate).format('lll');
  }

  return (
    <Container>
      <TextContainer>
        <Textarea
          value={textTodo}
          onChange={(e) => setTextTodo(e.target.value)}
          onBlur={() => handleTextUpdate(textTodo)}
          rows={2}
        />
        <span>
          Due date: <strong>{formatDateToShow(todoData.dueDate)}</strong>
        </span>
      </TextContainer>
      <ButtonsContainer>
        <DeleteIcon onClick={() => handleDeleteTodo()}>X</DeleteIcon>

        <CheckIcon>
          <input
            type='checkbox'
            checked={checkedTodo}
            onChange={(e) => handleToggleCheckTodo(e.target.checked)}
          />
        </CheckIcon>
      </ButtonsContainer>
    </Container>
  );
};

export default TodoItem;
