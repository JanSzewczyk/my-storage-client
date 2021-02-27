import reducer, { initialState } from "../user.reducer";
import * as actionTypes from "../../actionTypes";
import { user1 } from "./userTestData";
import { UserRole } from "../../../shared/constants";
import { updateObject } from "../../../shared/utils/utility";

describe("user reducer", () => {
  it("should return the initial state", () => {
    expect(
      reducer(
        {
          user: user1,
          role: UserRole.EMPLOYEE,
        },
        { type: actionTypes.USER_LOGOUT }
      )
    ).toEqual({
      user: null,
      role: null,
    });
  });

  it("should store the user details and user role", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.USER_LOAD_SUCCESS,
        user: user1,
        role: UserRole.OWNER,
      })
    ).toEqual(
      updateObject(initialState, {
        user: user1,
        role: UserRole.OWNER,
      })
    );
  });
});
