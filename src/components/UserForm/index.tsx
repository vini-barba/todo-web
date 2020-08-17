// eslint-disable-next-line no-unused-vars
import React, { useState, FormEvent, useEffect, useContext } from 'react';

import { Container, Title, Form, Button } from './styles';
import { UserContext } from '../../pages/TodoList';
import api from '../../services/api';
import saveSubscription from '../../services/notifications';

export interface User {
  _id: string;
  email: string;
}

const UserForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const userContext = useContext(UserContext);

  function getStoredUser() {
    userContext.userDispatch({ type: 'fetch_user_pending' });
    try {
      const emailStored = localStorage.getItem('email');
      const userIdStored = localStorage.getItem('userId');
      if (userIdStored === null) {
        return null;
      }
      const user = {
        _id: userIdStored,
        email: emailStored,
      };

      userContext.userDispatch({
        type: 'fetch_user_resolved',
        payload: user,
      });

      return user;
    } catch (error) {
      userContext.userDispatch({
        type: 'fetch_user_rejected',
        payload: 'Error fetching user from localStorage',
      });
      return null;
    }
  }

  async function storeUser(userEmail: string, userId: string) {
    const storage = rememberMe === true ? localStorage : sessionStorage;
    await storage.setItem('email', userEmail);
    await storage.setItem('userId', userId);
  }

  async function fecthUser() {
    userContext.userDispatch({ type: 'fetch_user_pending' });
    api
      .get(`/user/${email}`)
      .then((res) => {
        return res.data;
      })
      .then(async (user) => {
        try {
          await storeUser(user.email, user._id);
          saveSubscription(user._id);
          userContext.userDispatch({
            type: 'fetch_user_resolved',
            payload: user,
          });
        } catch (error) {
          userContext.userDispatch({
            type: 'fetch_user_rejected',
            payload: 'Error fetching user from server',
          });
        }
      })
      .catch((err) => {
        userContext.userDispatch({
          type: 'fetch_user_rejected',
          payload: err.response.data,
        });
      });
  }
  async function handleUserSubmit(e: FormEvent) {
    e.preventDefault();
    fecthUser();
  }

  useEffect(() => {
    getStoredUser();
  }, []);

  return (
    <Container>
      <Title>Enter your email addres</Title>
      <Form onSubmit={handleUserSubmit}>
        <div>
          <input
            type='email'
            autoFocus
            placeholder='user@domain.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type='submit'>Sign in</Button>
        </div>
        <div>
          <label htmlFor='rememberMe'>
            Remember me?
            <input
              type='checkbox'
              id='rememberMe'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </label>
        </div>
      </Form>
    </Container>
  );
};

export default UserForm;
