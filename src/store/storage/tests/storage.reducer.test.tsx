import reducer, { initialState } from "../storage.reducer";
import * as actionTypes from "../../actionTypes";
import { pageInfo, storage1, storageView1 } from "./storageTestData";
import { updateObject } from "../../../shared/utils/utility";

describe("storage reducer", () => {
  it("should return the initial state", () => {
    expect(
      reducer(
        {
          storageViewList: [storageView1],
          pageInfo: null,
          storageViewListLoading: false,
          storage: storage1,
          storageLoading: false,
        },
        { type: actionTypes.INIT_STORAGE_STORE }
      )
    ).toEqual(initialState);
  });

  it("should store the storage view list", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.STORAGE_VIEW_LIST_LOAD_SUCCESS,
        storages: [storageView1, storageView1],
        pageInfo: pageInfo,
      })
    ).toEqual(
      updateObject(initialState, {
        storageViewList: [storageView1, storageView1],
        pageInfo: pageInfo,
        storageViewListLoading: false,
      })
    );
  });

  it("should store the storage", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.STORAGE_LOAD_SUCCESS,
        storage: storage1,
      })
    ).toEqual(
      updateObject(initialState, {
        storage: storage1,
        storageLoading: false,
      })
    );
  });
});
