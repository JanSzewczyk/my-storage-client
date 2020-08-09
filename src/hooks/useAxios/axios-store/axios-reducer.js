export const actions = {
  init: "init",
  success: "success",
  fail: "failure",
};

export const initialState = { response: null, error: null, loading: false };

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.init:
      return { response: null, error: null, loading: true };
    case actions.success:
      return { response: action.payload, error: null, loading: false };
    case actions.failure:
      return { response: null, error: action.payload, loading: false };
    default:
      return initialState;
  }
};
