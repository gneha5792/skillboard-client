const initialState = { skills: [], skillProfiles: [] };

function reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_SKILL_SETTINGS":
      return {
        ...state,
        skills: action.payload.skills,
        skillProfiles: action.payload.skillProfiles,
      };
    default:
      return state;
  }
}

export default reducer;
