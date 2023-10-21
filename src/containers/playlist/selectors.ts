import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";

const selectSelf = (state: RootState) => state.playlists;

export const playlistsSelectors = {
  getPlaylists: createSelector(selectSelf, (playlists) => playlists.items)
};
