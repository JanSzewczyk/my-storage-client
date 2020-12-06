import reducer, { initialState } from "../item.reducer";
import * as actionTypes from "../../actionTypes";
import {
  item1,
  item2,
  item3,
  item4,
  itemView1,
  itemView2,
  itemView3,
  pageInfo,
} from "./itemTestData";
import { updateObject } from "../../../shared/utils/utility";

describe("item reducer", () => {
  it("should return the initial state", () => {
    expect(
      reducer(
        {
          itemViewList: [],
          pageInfo: null,
          itemViewListLoading: true,
          itemList: [],
          itemListLoading: true,
        },
        { type: actionTypes.ITEM_INIT }
      )
    ).toEqual(initialState);
  });

  it("should store the item view list", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.ITEM_VIEW_LIST_LOAD_SUCCESS,
        itemViewList: [itemView1, itemView2, itemView3],
        pageInfo: pageInfo,
      })
    ).toEqual(
      updateObject(initialState, {
        itemViewList: [itemView1, itemView2, itemView3],
        pageInfo: pageInfo,
        itemViewListLoading: false,
      })
    );
  });

  it("should store the item list", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.ITEM_LIST_LOAD_SUCCESS,
        itemList: [item1, item2, item3, item4],
      })
    ).toEqual(
      updateObject(initialState, {
        itemList: [item1, item2, item3, item4],
        itemListLoading: false,
      })
    );
  });
});
