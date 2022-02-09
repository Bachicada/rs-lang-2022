import { API_URL, ENDPOINTS } from "../utils/Constants";
import {NewUser} from '../types';


export const createUser = async (user: NewUser)=> 
await fetch(`${API_URL}${ENDPOINTS.USERS}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
/*
    const content = await rawResponse.json();
    console.log(content);
    
  */
