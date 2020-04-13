import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Workspace } from "./components/workspace";
import Timesheets from "./components/timesheets";
import { Team } from "./components/team";
import { Status } from "./components/status";
import { Reports } from "./components/reports";
import { Backlog } from "./components/backlog";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default (props) => {
  return (
    <Router>
      <menubar />
      <Menu>
        <a className="menu-item" href="/workspace">
          Public Workspace
        </a>

        <a className="menu-item" href="/timesheets">
          Timesheets
        </a>

        <a className="menu-item" href="/reports">
          Reports
        </a>

        <a className="menu-item" href="/backlog">
          Project Backlog
        </a>

        <a className="menu-item" href="/team">
          Project Team
        </a>

        <a className="menu-item" href="/status">
          Portfolio Status
        </a>
      </Menu>

      <Switch>
        <Route path="/workspace" component={Workspace} />
        <Route path="/timesheets" component={Timesheets} />
        <Route path="/team" component={Team} />
        <Route path="/status" component={Status} />
        <Route path="/reports" component={Reports} />
        <Route path="/backlog" component={Backlog} />
      </Switch>
    </Router>
  );
};
