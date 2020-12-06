import reducer, { initialState } from "../auth.reducer";
import * as actionTypes from "../../actionTypes";
import { updateObject } from "../../../shared/utils/utility";

describe("auth reducer", () => {
  const accessToken: string = "test-token";
  const refreshToken: string = "test-refresh-token";

  it("should store the token upon login", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
    ).toEqual(
      updateObject(initialState, {
        accessToken: accessToken,
        refreshToken: refreshToken,
        authLoading: false,
      })
    );
  });

  it("should return the initial state", () => {
    expect(
      reducer(
        {
          accessToken: accessToken,
          refreshToken: refreshToken,
          error: null,
          authLoading: true,
        },
        { type: actionTypes.AUTH_LOGOUT }
      )
    ).toEqual(initialState);
  });
});
