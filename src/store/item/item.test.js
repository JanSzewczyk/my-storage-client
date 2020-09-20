import reducer from "./item.reducer";
import * as actionTypes from "../actionTypes";

describe("item reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      itemsList: [],
      pageInfo: null,
      itemsListLoading: true,
    });
  });

  it("should store the pageable items list", () => {
    expect(
      reducer(
        {
          itemsList: [],
          pageInfo: null,
          itemsListLoading: true,
        },
        {
          type: actionTypes.ITEM_STORAGE_LIST_LOAD_SUCCESS,
          items: ["item1", "item2"],
          pageInfo: "item-page-info",
        }
      )
    ).toEqual({
      itemsList: ["item1", "item2"],
      pageInfo: "item-page-info",
      itemsListLoading: false,
    });
  });

  it("should store the employee items list", () => {
    expect(
      reducer(
        {
          itemsList: [],
          pageInfo: null,
          itemsListLoading: true,
        },
        {
          type: actionTypes.ITEM_STORAGE_EMPLOYEE_LIST_LOAD_SUCCESS,
          items: ["item1", "item2"],
        }
      )
    ).toEqual({
      itemsList: ["item1", "item2"],
      pageInfo: null,
      itemsListLoading: false,
    });
  });
});
