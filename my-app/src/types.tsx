export interface NewUser {
  userId?: string,
  name?: string | null,
  email?: string | null,
  password?: string | null
}

export interface CurUser {
  name?: string,
  token?: string,
  refreshToken?: string,
  userId?: string
}

export interface PartProps {
  part: string | undefined;
}

export interface PageProps extends PartProps{
  page: string | undefined;
}

export interface WordItem {
  id: string,
  group:number,
  page: string,
  word?: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
 
}
export interface WordCardProp {
  word: WordItem;
  style?: Function
}

export interface FormProps {
  hasAccount: boolean;
}