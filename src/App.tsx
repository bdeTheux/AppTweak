import "./App.css";

import React, { FC, ReactElement } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import { authSelectors } from "./containers/auth/selectors";
import logo from "./logo.svg";
import Playlist from "./containers/playlist/Playlist";
import PopUpButton from "./containers/playlist/PopUpButton";

const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);

  // TODO: You can access user data and now fetch user's playlists
  console.log(user);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <PopUpButton/>
        <Playlist/>
      </header>
    </div>
  );
};

export default App;
