import { Reducer } from 'react';
import { CurUser } from '../../types/types';
import { initialUserState } from '../contexts/userContext';

export type UserReducerAction = {
  type: string;
  payload: CurUser;
};

const userReducer: Reducer<CurUser, UserReducerAction> = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        ...(action.payload || {}),
      };
    case 'CLEAR_USER':
      return initialUserState;
    default:
      return state;
  }
};

export default userReducer;
