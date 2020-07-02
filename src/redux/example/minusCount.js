const MINUS_COUNT = 'MINUS_COUNT';

export const minusCountAction = () => ({
  type: MINUS_COUNT,
});

export function minusCountReducer(state, action) {
  switch (action.type) {
    case MINUS_COUNT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}
