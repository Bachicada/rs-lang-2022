import { WordItem } from "../types";

const Utils = {
  random: (min: number, max: number) => {
    return min + Math.floor(Math.random() * (max - min + 1));
  },

  getRandomWords: (arr: WordItem[][]) => {
    const idxArr: number[] = [];
    //Get random idx
    for (let i = 0; i < 3; i++) {
      if (i === 0) idxArr.push(Utils.random(0, 29));
      else {
        let rand = Utils.random(0, 29);
        while (rand === idxArr[i - 1]) {
          rand = Utils.random(0, 29);
        }
        idxArr.push(rand);
      }
    }
    //Get an arr of words by idx 
    const piece = idxArr.map((id) => {
      return arr[id]
    }).flat();
    
    const result = piece.map((item) => {
      return {
        item: item,
        //Determines whether the answer will be the correct translation or not
        correct: Utils.random(0,1) === 1 ? true: false,
        //If need be - random incorrect translate
        incorrect: piece[Utils.random(0, 29)].wordTranslate
      }
    });
    
    return result;
  }
}

export default Utils;