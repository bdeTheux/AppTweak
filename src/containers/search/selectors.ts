import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";

const selectSelf = (state: RootState) => state.search;

export const searchSelectors = {
  getSearchTracks: createSelector(selectSelf, (search) => search.items),
};
