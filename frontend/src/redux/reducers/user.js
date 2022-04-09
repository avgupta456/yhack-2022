import * as types from '../actions/userActions';

const initialState = {
  userId: JSON.parse(localStorage.getItem('userId')) || null,
};

const switchStatement = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      localStorage.setItem('userId', JSON.stringify(action.payload.userId));
      return {
        ...state,
        userId: action.payload.userId,
      };
    case types.LOGOUT:
      localStorage.clear();
      return {
        userId: null,
      };
    default:
      return state;
  }
};

export default switchStatement;
