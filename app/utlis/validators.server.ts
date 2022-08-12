// app/utils/validators.server.ts
//https://www.youtube.com/watch?v=vR33ZRJekHk @50 min

export const validateEmail = (email: string): string | undefined => {
   let validRegex = 
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.length || !validRegex.test(email)) {
      return "Please enter a valid email address"
    }
  }
  
  //user must enter a password minimum length of 5
  export const validatePassword = (password: string): string | undefined => {
    if (password.length < 5) {
      return "Please enter a password that is at least 5 characters long"
    }
  }
  

  //can use this if I ever make a profile page
  export const validateName = (name: string): string | undefined => {
    if (!name.length) return `Please enter a value`
  }