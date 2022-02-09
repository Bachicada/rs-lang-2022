export interface NewUser {
  name: string | null,
  email: string | null,
  password: string | null
}

export interface CurUser {
  id: string,
  name: string,
  email: string 
}

export interface PartProps {
  part: string | undefined;
}

export interface PageProps extends PartProps{
  page: string | undefined;
}

export interface WordItem {
  id: string,
  group: 0,
  page: 0,
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
}

export interface FormProps {
  hasAccount: boolean;
}