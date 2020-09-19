import reducer from "./auth.reducer";
import * as actionTypes from "../actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      accessToken: null,
      refreshToken: null,
      error: null,
      authLoading: false,
    });
  });

  it("should store the token upon login", () => {
    expect(
      reducer(
        {
          accessToken: null,
          refreshToken: null,
          error: null,
          authLoading: false,
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          accessToken: "some-token",
          refreshToken: "some-refresh-token",
        }
      )
    ).toEqual({
      accessToken: "some-token",
      refreshToken: "some-refresh-token",
      error: null,
      authLoading: false,
    });
  });
});
