import reducer from "./user.reducer";
import * as actionTypes from "../actionTypes";

describe("user reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      user: null,
      role: null,
    });
  });

  it("should store the user details and user role", () => {
    expect(
      reducer(
        {
          user: null,
          role: null,
        },
        {
          type: actionTypes.USER_LOAD_SUCCESS,
          user: "user-data",
          role: "user-role",
        }
      )
    ).toEqual({
      user: "user-data",
      role: "user-role",
    });
  });
});
