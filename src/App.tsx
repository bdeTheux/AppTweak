import "./App.css";

import React, { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelectors } from "./containers/auth/selectors";
import Playlist from "./containers/playlist/Playlist";
import PopUpButton from "./containers/popup/PopUpButton";
import { getPlaylists } from "./containers/playlist/slice";
import SearchBar from "./containers/search/SearchBar";

const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);

  // TODO: You can access user data and now fetch user's playlists
  console.log(user);
  dispatch(getPlaylists());
  return (
    <div className="App">
      <header className="App-header">
        <SearchBar/>
        <PopUpButton/>
        <Playlist/>
      </header>
    </div>
  );
};

export default App;
