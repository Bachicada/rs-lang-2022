export enum Styling {
   headerHeight = '40'
}

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      custom?: string;
    }
  }