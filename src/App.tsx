import "./App.css";

import React, { FC, ReactElement } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import { authSelectors } from "./containers/auth/selectors";
import logo from "./logo.svg";
import Playlist from "./containers/playlist/Playlist";
import PopUpButton from "./containers/playlist/PopUpButton";
import { getPlaylists } from "./containers/playlist/slice";

const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);

  // TODO: You can access user data and now fetch user's playlists
  console.log(user);
  dispatch(getPlaylists());
  return (
    <div className="App">
      <header className="App-header">
        
        <PopUpButton/>
        <Playlist/>
      </header>
    </div>
  );
};

export default App;
