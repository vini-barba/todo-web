/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import immer from 'immer';
import { User } from '../components/UserForm';

interface UserState {
  user: {
    loading: boolean;
    error: null;
    data: User | null;
  };
}
export const initialState = {
  user: {
    data: null,
    error: null,
    loading: false,
  },
};

const userActions = {
  fetch_user_pending: (state: UserState) => {
    state.user.loading = true;
    state.user.error = null;
    state.user.data = null;
    return state;
  },
  fetch_user_resolved: (state: UserState, payload: User) => {
    state.user.loading = false;
    state.user.error = null;
    state.user.data = payload;
    return state;
  },
  fetch_user_rejected: (state: UserState, payload: any) => {
    state.user.loading = false;
    state.user.error = payload;
    state.user.data = null;
    return state;
  },
};

function userReducer(state: UserState, action: any) {
  const actionType: keyof typeof userActions = action.type;
  const userFunction = userActions[actionType];
  if (userFunction) {
    return immer(state, (draftState: any) =>
      userFunction(draftState, action.payload)
    );
  }
  return state;
}

export default userReducer;
