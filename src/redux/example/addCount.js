const ADD_COUNT = 'ADD_COUNT';

export const addCountAction = () => ({
  type: ADD_COUNT,
});

export function addCountReducer(state, action) {
  switch (action.type) {
    case ADD_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
}
