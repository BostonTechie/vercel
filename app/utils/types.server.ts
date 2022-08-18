// app/utils/types.server.ts
// https://www.youtube.com/watch?v=vR33ZRJekHk @ 29 - 39:35


export interface RegisterForm  {
    email: string
    password: string
 
  }

  export interface LoginForm  {
    email: string
    password: string
  }

  //query form intended to allow user to query DB in specific ways
  export interface QueryForm  {
    number: number
    account: string
  }