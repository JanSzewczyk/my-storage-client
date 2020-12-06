import reducer from "./storage.reducer";
import * as actionTypes from "../actionTypes";

describe("storage reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).pwtoEqual({
      storageList: [],
      storageListLoading: true,
      storage: null,
      storageLoading: true,
      storageActionLoading: false,
    });
  });

  it("should store the storage details", () => {
    expect(
      reducer(
        {
          storageList: [],
          storageListLoading: true,
          storage: null,
          storageLoading: true,
          storageActionLoading: false,
        },
        {
          type: actionTypes.STORAGE_LOAD_SUCCESS,
          storage: "storage-details",
        }
      )
    ).toEqual({
      storageList: [],
      storageListLoading: true,
      storage: "storage-details",
      storageLoading: false,
      storageActionLoading: false,
    });
  });

  it("should store the storages list", () => {
    expect(
      reducer(
        {
          storageList: [],
          storageListLoading: true,
          storage: null,
          storageLoading: true,
          storageActionLoading: false,
        },
        {
          type: actionTypes.STORAGE_LIST_LOAD_SUCCESS,
          storages: ["storage1", "storage2"],
        }
      )
    ).toEqual({
      storageList: ["storage1", "storage2"],
      storageListLoading: false,
      storage: null,
      storageLoading: true,
      storageActionLoading: false,
    });
  });
});
