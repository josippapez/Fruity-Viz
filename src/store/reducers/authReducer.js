const initState = {
  status: null
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "RESET_STATUS":
      return { status: null };
    case "LOGIN_SUCCESS":
      return { ...state, status: null };
    case "LOGIN_ERROR":
      return { ...state, status: "Login failed" };
    case "SIGNOUT_SUCCESS":
      return { ...state, status: null, favourites: [] };
    case "SIGNUP_SUCCESS":
      return { ...state, status: null };
    case "SIGNUP_ERROR":
      return { ...state, status: action.err.message };
    default:
      return state;
  }
}
export default authReducer;