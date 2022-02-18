export interface NewUser {
  userId?: string,
  name?: string | null,
  email?: string | null,
  password?: string | null
}

export interface CurUser {
  message?: string,
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
  _id?:string;
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
  word: WordItem,
  style?: Function,
  bgColor?: string,
  hardChecked?: boolean

}
export interface OptionBtnsProp {
  word: WordItem,
  hardChecked?: boolean
}
export interface WordStatProp {
  word: WordItem,
}

export interface FormProps {
  hasAccount: boolean;
}
