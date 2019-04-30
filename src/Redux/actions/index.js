export function setLogin (isLoggedIn, email) {
    return {
       type: "SET_LOGIN",
       isLoggedIn: isLoggedIn,
       email: email
     }
  }