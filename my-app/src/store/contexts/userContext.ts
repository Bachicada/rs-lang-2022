import { createContext, Dispatch } from 'react';
import { CurUser } from '../../types/types';
import { UserReducerAction } from '../reducers/userReducer';

export const initialUserState: CurUser = {};

export type IUserContext = [CurUser, Dispatch<UserReducerAction>];

const UserContext = createContext<IUserContext>([initialUserState, () => null]);
export default UserContext;
