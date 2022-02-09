import { API_URL, ENDPOINTS } from "../utils/Constants";
import {NewUser} from '../types';

  export async function createUser(user: NewUser){

    const data = await fetch(`${API_URL}${ENDPOINTS.USERS}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((response) => {
         console.log(response.status)
         if (response.status===417) {
         throw new Error("Пользователь с такими данными уже существует");
               }
               else if (response.status ===200){
                console.log(response);
                return response;
               }
        })
    .catch((error) => {
          console.log(error)
            });
  
      return data;
    }
  