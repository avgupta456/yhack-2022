import * as types from "../actions/userActions";

const user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  userId: user?.id,
  name: user?.name,
  email: user?.email,
};

const switchStatement = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        userId: action.payload.user.id,
        name: action.payload.user.name,
        email: action.payload.user.email,
      };
    case types.LOGOUT:
      localStorage.clear();
      return {
        userId: null,
        name: null,
        email: null,
      };
    default:
      return state;
  }
};

export default switchStatement;
