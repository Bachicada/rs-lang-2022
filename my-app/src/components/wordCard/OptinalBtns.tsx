import * as React from 'react';
import { createHardWord, deleteHardWord, getUserId } from '../../services/WordService';
import { WordItem } from '../../types';
import { WORD_STATUS } from '../../utils/Constants';
import styles from './WordCard.module.css'


export default function OprionalBtns(props:WordItem){
    const word = props;

    async function setHardWord(event: React.SyntheticEvent, word: WordItem){
        const userId = getUserId();
        const wordId = word.id;
        const target = event.target as HTMLInputElement;
        const wordStatus = WORD_STATUS.HARD;

        if (target.checked){
            console.log('checked');
            const wordSet = await createHardWord({userId, wordId, word, wordStatus} );
            console.log(wordSet);
        }
        else {
            console.log('unchecked')
            const wordSet = await deleteHardWord({userId, wordId} );
            console.log(wordSet);
        }
    }

    return (
        <div>
           	<label className={styles.label}>
		      <input id='hardWordBtn' className={styles.inputBtn+' '+styles.hardBtn} type="checkbox"
                     onChange={(event)=>{setHardWord(event, word)}}
                   />
		      <span className={styles.spanBtn}> Сложное </span>
	        </label>
            <label className={styles.label}>
		      <input id='learnedWordBtn'className={styles.inputBtn+' '+styles.learnedBtn}type="checkbox"/>
		      <span className={styles.spanBtn}> Изученное </span>
	        </label>
        </div>
    )
}