// eslint-disable-next-line no-unused-vars
import React, { useState, FormEvent, useContext, useRef } from 'react';
import moment from 'moment';
import { Container, Title, Form, Button } from './styles';
import api from '../../services/api';
import { TodoContext, UserContext } from '../../pages/TodoList';

const TodoCreator: React.FC = () => {
  function getDatetimeLocalFormated(date?: string) {
    return moment(date).format(moment.HTML5_FMT.DATETIME_LOCAL);
  }

  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState(getDatetimeLocalFormated());

  const todoContext = useContext(TodoContext);
  const userContext = useContext(UserContext);

  const textareaInput = useRef<any>(null);

  function handleTodoSubmit(e: FormEvent) {
    todoContext.todoDispatch({ type: 'add_todoList_pending' });
    e.preventDefault();
    const user = userContext.userState.user.data._id;
    api
      .post('/todo', { todo: { text, dueDate, user } })
      .then((res) => {
        todoContext.todoDispatch({
          type: 'add_todoList_resolved',
          payload: res.data,
        });
        setText('');
        if (textareaInput && textareaInput.current) {
          textareaInput.current.focus();
        }
      })
      .catch((err) => {
        todoContext.todoDispatch({
          type: 'add_todoList_rejected',
          payload: err.response.data,
        });
      });
  }

  return (
    <Container>
      <Title>Create new To-do</Title>
      <Form onSubmit={handleTodoSubmit}>
        <textarea
          value={text}
          ref={textareaInput}
          autoFocus
          placeholder='Something to be done'
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />
        <div>
          <input
            type='datetime-local'
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Button type='submit'>Create</Button>
        </div>
      </Form>
    </Container>
  );
};

export default TodoCreator;
