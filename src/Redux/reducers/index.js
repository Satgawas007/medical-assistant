export default (state, action) => {
    switch (action.type) {
      case "SET_LOGIN":      
        return {
          ...state,
          isLoggedIn: action.isLoggedIn,
          email: action.email
        };
  
      default:
        return state;
    }
  };
  