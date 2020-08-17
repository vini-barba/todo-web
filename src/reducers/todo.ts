/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import immer from 'immer';

import { Todo } from '../components/TodoItem';

interface TodoState {
  todoList: {
    loading: boolean;
    error: null;
    data: Todo[];
  };
}
export const initialState = {
  todoList: {
    data: [],
    error: null,
    loading: false,
  },
};

const todoActions = {
  fetch_todoList_pending: (state: TodoState) => {
    state.todoList.loading = true;
    state.todoList.error = null;
    state.todoList.data = [];

    return state;
  },
  fetch_todoList_resolved: (state: TodoState, payload: any) => {
    state.todoList.loading = false;
    state.todoList.error = null;
    state.todoList.data = payload;
    return state;
  },
  fetch_todoList_rejected: (state: TodoState, payload: any) => {
    state.todoList.loading = false;
    state.todoList.error = payload;
    state.todoList.data = [];
    return state;
  },

  update_todoList_pending: (state: TodoState) => {
    state.todoList.loading = true;
    state.todoList.error = null;

    return state;
  },
  update_todoList_resolved: (state: TodoState, payload: any) => {
    state.todoList.loading = false;
    state.todoList.error = null;
    const todoList = state.todoList.data.map((todo: Todo) => {
      if (todo._id === payload._id) {
        return payload;
      }
      return todo;
    });
    state.todoList.data = todoList;

    return state;
  },
  update_todoList_rejected: (state: TodoState, payload: any) => {
    state.todoList.loading = false;
    state.todoList.error = payload;
    return state;
  },

  delete_todoList_pending: (state: TodoState) => {
    state.todoList.loading = true;
    state.todoList.error = null;

    return state;
  },
  delete_todoList_resolved: (state: TodoState, payload: any) => {
    state.todoList.loading = false;
    state.todoList.error = null;
    const todoList = state.todoList.data.filter(
      (todo: Todo) => todo._id !== payload._id
    );
    state.todoList.data = todoList;

    return state;
  },
  delete_todoList_rejected: (state: TodoState, payload: any) => {
    state.todoList.loading = false;
    state.todoList.error = payload;
    return state;
  },

  add_todoList_pending: (state: TodoState) => {
    state.todoList.loading = true;
    state.todoList.error = null;

    return state;
  },
  add_todoList_resolved: (state: TodoState, payload: Todo) => {
    state.todoList.loading = false;
    state.todoList.error = null;
    const todoList = [...state.todoList.data, payload];
    state.todoList.data = todoList;

    return state;
  },
  add_todoList_rejected: (state: TodoState, payload: any) => {
    state.todoList.loading = false;
    state.todoList.error = payload;
    return state;
  },
};

function todoReducer(state: TodoState, action: any) {
  const actionType: keyof typeof todoActions = action.type;
  const todoFunction = todoActions[actionType];
  if (todoFunction) {
    return immer(state, (draftState: any) =>
      todoFunction(draftState, action.payload)
    );
  }
  return state;
}

export default todoReducer;
