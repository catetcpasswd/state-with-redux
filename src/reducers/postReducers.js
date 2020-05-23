import { FETCH_POSTS, NEW_POST } from "../actions/types";

const initialState = {
  items: [], // posts from API
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      console.log("postReducers ");
      return {
        ...state,
        items: action.payload
      };
    case NEW_POST:
      console.log("new post reducer");
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
