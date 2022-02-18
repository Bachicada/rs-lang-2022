import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { createWord, deleteWord, getNewToken, getUserId, getUserToken } from '../../services/WordService';
import { CurUser, OptionBtnsProp, WordItem } from '../../types';
import { API_URL, APP_ROUTES, ENDPOINTS, WORD_STATUS } from '../../utils/Constants';
import styles from './WordCard.module.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import AddSnackBar from './AddSnackBar';


  
export default function OprionalBtns(props:OptionBtnsProp){
    const word = props.word;
    //const hardChecked = props.hardChecked;

    const userContext = useContext<{
        user: CurUser;
        dispatchUserEvent:  (actionType: string, payload: CurUser) => void;
      }>(UserContext);

    const navigate = useNavigate();

    const checkSignIn = ()=>{
        localStorage.clear();
        userContext.dispatchUserEvent("CLEAR_USER", {});
        navigate(`${APP_ROUTES.SIGNIN}`);
    }
      
    const [expireStatus, setExpireStatus]  = useState(false);
    const [showDelStatus, setShowDelStatus]  = useState(false);
    const [showAddtatus, setShowAddStatus]  = useState(false);


    const token = getUserToken();
  
    const bodyReqHard: BodyInit = JSON.stringify({
      "difficulty": `${WORD_STATUS.HARD}`,
      "optional": {
            'group':`${word.group}`,
             'page':`${word.page}`,
             'failCounter':0,
             'successCounter':0
               }
    })

    const bodyReqLearned: BodyInit = JSON.stringify({
        "difficulty": `${WORD_STATUS.LEARNED}`,
        "optional": {
              'group':`${word.group}`,
               'page':`${word.page}`,
               'failCounter':0,
               'successCounter':0
                 }
      })

    async function setHardWord(event: React.SyntheticEvent, word: WordItem){
        const userId = getUserId();
        const wordId = word.id || word._id as string;
        const target = event.target as HTMLInputElement;
        const wordStatus = WORD_STATUS.HARD;

        if (target.checked){
            console.log('checkedHard');

            const wordSet =  await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/words/${wordId}`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body:  bodyReqHard
              })    
           .then(async(response)=>{
            console.log('первый ответ',response)

                if(response.status===200){
                    setShowAddStatus(true);
                }
                
                else if(response.status===417){
                    throw new Error('это слово уже в списке сложных')
                }
                
                else if (response.status===401){
                    const newTokenRes = await getNewToken();

                    console.log('второй ответ', newTokenRes )

                    const LS = localStorage.getItem('CurrentUser'||'{}');
                   
                   if(LS && (newTokenRes.status !==401)){
                        const newToken = await newTokenRes.json();
                        console.log ('this new token', newToken)
                        
                        const newDataUser: CurUser = {};
                        newDataUser.message = JSON.parse(LS).message;
                        newDataUser.userId = JSON.parse(LS).userId;
                        newDataUser.name = JSON.parse(LS).name;
                        newDataUser.token = JSON.parse(newToken).token;
                        newDataUser.refreshToken = JSON.parse(newToken).refreshToken;
                        localStorage.setItem('CurrentUser', JSON.stringify(newDataUser));
                        userContext.dispatchUserEvent("UPDATE_USER", newDataUser);
                    }
                    else if(LS && (newTokenRes.status ===401)){
                        console.log ('все истекло', newTokenRes)
                       setExpireStatus(true);
                       setTimeout(checkSignIn, 1500);
                    }

                const newWordSet = await createWord({userId, wordId, word, wordStatus} )
                return newWordSet;
                }
            
            })
        }
        else {
            console.log('uncheckedHard')
            const wordHardDel = await deleteWord({userId, wordId});
        

            console.log('Удалено по сложной кнопке', wordHardDel );
        }
    }

    async function setLearnedWord(event: React.SyntheticEvent, word: WordItem){
        const userId = getUserId();
        const wordId = word.id || word._id as string;
        const target = event.target as HTMLInputElement;
        const wordStatus = WORD_STATUS.LEARNED;

        if (target.checked){
            console.log('checkedLearned');
            const deleteHardSet = await deleteWord({userId, wordId});
            console.log('удалено из сложных', deleteHardSet)

            const newWordSet = await createWord({userId, wordId, word, wordStatus} )
            console.log('добавлено в изученные', await newWordSet.json())
        }
        else {
            console.log('uncheckedLearned');
            const deleteLearned = await deleteWord({userId, wordId});
            
            console.log(deleteLearned);
        }
    }


    return (
       
        <div className={styles.btnsCont}>
             { expireStatus ? <div> нужно зайти опять </div> : '' }
             
           	<label className={styles.label}>
		      <input id='hardWordBtn' className={styles.inputBtn+' '+styles.hardBtn} type="checkbox" /*checked={hardChecked}*/
                     onChange={(event)=>{setHardWord(event, word)}}
                   />
		      <span className={styles.spanBtn}> Сложное </span>
	        </label>
            <label className={styles.label}>
		      <input id='learnedWordBtn'className={styles.inputBtn+' '+styles.learnedBtn}type="checkbox"
               onChange={(event)=>{setLearnedWord(event, word)}}/>
		      <span className={styles.spanBtn}> Изученное </span>
	        </label>
        </div>
    )
}