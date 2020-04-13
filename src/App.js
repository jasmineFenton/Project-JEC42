import React from "react";
import "./App.css";
import MenuBar from "./menubar";
//using react notifications
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { Notifications } from "react-push-notification";

function App() {
  return (
    <div id="App">
      <Notifications />
      <div className="row">
        <div className="content"></div>
      </div>
      <MenuBar />
      <div></div>
      <NotificationContainer />
    </div>
  );
}

export default App;
