import * as types from "../actions/userActions";

const user = JSON.parse(localStorage.getItem("user")) || null;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const N = days.length;

const initialState = {
  userId: user?.id,
  name: user?.name,
  email: user?.email,
  nodes: [
    ...days.map((day, i) => ({
      id: i,
      title: day,
      x: 175 * i + 100,
      y: 100,
      type: "startDate",
    })),
    ...days.map((day, i) => ({
      id: i + N,
      title: day,
      x: 175 * i + 100,
      y: 700,
      type: "endDate",
    })),
  ],
  edges: [],
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
        nodes: [
          ...days.map((day, i) => ({
            id: i,
            title: day,
            x: 175 * i + 100,
            y: 100,
            type: "startDate",
          })),
          ...days.map((day, i) => ({
            id: i + N,
            title: day,
            x: 175 * i + 100,
            y: 700,
            type: "endDate",
          })),
        ],
        edges: [],
      };
    case types.SET_GRAPH:
      return {
        ...state,
        nodes: action.payload.nodes,
        edges: action.payload.edges,
      };
    default:
      return state;
  }
};

export default switchStatement;
