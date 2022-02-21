
import { RawOff, RawOffRounded } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "../App";
import { CurUser, PartProps, WordItem } from "../types";
import { API_URL, ENDPOINTS, WORD_STATUS } from "../utils/Constants";
 

const user = JSON.stringify(localStorage.getItem('CurrentUser'));

export async function getWords() {
        try {
            const words = await fetch(`${API_URL}${ENDPOINTS.WORDS}`, {
              method: 'GET'
            });
            return await words.json();
        }
        catch(e) {
          console.log('error', e);
        }
    }

export const getPartOfTextbook = async(pageNumber: string | undefined, partNumber: string | undefined ) =>{
  const page = await fetch(`${API_URL}${ENDPOINTS.WORDS}?${ENDPOINTS.PAGE}${pageNumber}&${ENDPOINTS.GROUP}${partNumber}`,{
    method: 'GET',
  });
  return page.json();
}
  //https://<your-app-name>.herokuapp.com/words?page=2&group=0

export const getUserToken = () => {
  const LS=localStorage.getItem('CurrentUser'||'{}');
  if(LS){
    return JSON.parse(LS).token;
  }
}
export const getRefreshToken = () => {
  const LS=localStorage.getItem('CurrentUser'||'{}');
  if(LS){
    return JSON.parse(LS).refreshToken;
  }
}

export const getUserId = () => {
  const LS=localStorage.getItem('CurrentUser'||'{}');

  if(LS){
    return JSON.parse(LS).userId;
  }
}

export const getNewToken = async () => {
  const userId = getUserId();
  const refreshToken = getRefreshToken();

    const res = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.TOKENS}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
  }});
     return res;
  }



 export const createWord = async ({ userId, wordId, word, wordStatus }:{userId: string, wordId: string, word: WordItem, wordStatus: string }) => {
    const token = getUserToken();
    console.log(token)
    const bodyReq: BodyInit = JSON.stringify({
      "difficulty": `${wordStatus}`,
      "optional": {
        'group':`${word.group}`,
         'page':`${word.page}`,
         'failCounter':0,
         'successCounter':0
           }
})
    const rawResponse = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/words/${wordId}`, {
      method: 'POST',
      //withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      
      body:  bodyReq
    })    
    /*
      .then(async(response) =>{
          if ((response.status===401)||(response.status===422)){
            const newToken = await getNewToken();
            const LS = localStorage.getItem('CurrentUser'||'{}');
            const newDataUser: CurUser = {};
            if(LS){
                newDataUser.message = JSON.parse(LS).message;
                newDataUser.userId = JSON.parse(LS).userId;
                newDataUser.name = JSON.parse(LS).name;
                newDataUser.token = JSON.parse(newToken).token;
                newDataUser.refreshToken = JSON.parse(newToken).refreshToken;
            }
           localStorage.setItem('CurrentUser', JSON.stringify(newDataUser));
           // userContext.dispatchUserEvent("UPDATE_USER", newDataUser);

            const newRes = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/words/${wordId}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${newToken.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "difficulty": 'hard',
                "optional": { 
              'group':`${word.group}`,
              'page':`${word.page}` }
              })
            }) 
            return response;
          }
     })
     .catch((error) => {
      console.log(error)
        });
*/
    return rawResponse;
  };

  export const deleteWord = async ({ userId, wordId}:{userId: string, wordId: string}) => {
    const token = getUserToken();
    const rawResponse = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })    
    return rawResponse;
  }
/*
  export const getHardWords = async (userId: string, token: string) =>{ 
    const hardFilter ='{"$and":[{"userWord.difficulty":"hard"}]}' /*, {"page":${page}
    const data = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/aggregatedwords?wordsPerPage=3600&filter=${hardFilter}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return data;
  }
  */

  export const getHardWords = async (userId: string, token: string) =>{ 
    const hardFilter ='{"$and":[{"userWord.difficulty":"hard"}]}' /*, {"page":${page}*/
    try{
      const data = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/aggregatedwords?wordsPerPage=3600&filter=${hardFilter}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      return data;
    }
    catch(e) {
      console.log('error', e);
    }
  }

  export const getLearnedWords = async (userId: string, token: string) =>{ 
    const hardFilter ='{"$and":[{"userWord.difficulty":"learned"}]}' /*, {"page":${page}*/
    const data = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/aggregatedwords?wordsPerPage=3600&filter=${hardFilter}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return data;
  }

  export const getPlayedWords = async (userId: string, token: string) =>{ 
   const hardFilter ='{"$and":[{"userWord.difficulty":"new"}]}' /*, {"page":${page}*/
    try{
      const data = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/aggregatedwords?wordsPerPage=3600&filter=${hardFilter}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      return data;
    }
    catch (error){
       console.log(error);
   }
   
  }

 export const getAllUserWords = async (userId: string, token: string) =>{ 

   const data = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.WORDS}`, {
     method: 'GET',
     headers: {
       'Authorization': `Bearer ${token}`,
       'Accept': 'application/json',
     }})

   return await data.json();
 }

 
