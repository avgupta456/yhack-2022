export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_GRAPH = "SET_GRAPH";

export function login(user) {
  return { type: LOGIN, payload: { user } };
}

export function logout() {
  return { type: LOGOUT, payload: {} };
}

export function setGraph(nodes, edges) {
  return { type: SET_GRAPH, payload: { nodes, edges } };
}
