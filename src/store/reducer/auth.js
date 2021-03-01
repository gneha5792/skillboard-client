const initialState = { isLoggedIn: false };

function checkIsLoggedIn(state, payload) {
  if (
    payload.location &&
    payload.location.pathname.match(/^\/feedback\/b*/g)?.length
  )
    return { ...state, isLoggedIn: true };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "AUTHENTICATE_USER":
      return checkIsLoggedIn(state, action.payload);
    default:
      return state;
  }
}

export default reducer;
