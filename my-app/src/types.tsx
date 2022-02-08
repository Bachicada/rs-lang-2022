export enum Styling {
   headerHeight = '40'
}

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      custom?: string;
    }
  }

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