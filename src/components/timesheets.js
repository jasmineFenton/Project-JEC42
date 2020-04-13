import React from "react";
import MaterialTable from "material-table";
import { Grid } from "@material-ui/core";
import { forwardRef } from "react";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { NotificationManager } from "react-notifications";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

const tableIcons = {
  Add: forwardRef((props, ref) => (
    <AddCircleRoundedIcon {...props} ref={ref} />
  )),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => (
    <DeleteIcon {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const Timesheets = () => {
  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name", type: "string" },
      { title: "Task(s)", field: "task", type: "string" },
      {
        title: "Day",
        field: "day",
        type: "string",
        lookup: {
          Mon: "Monday",
          Tues: "Tuesday",
          Wed: "Wednesday",
          Thurs: "Thursday",
          Fri: "Friday",
        },
      },

      {
        title: "Date",
        field: "date",
      },
      {
        title: "Start Time",
        field: "start",
        type: "string",
      },
      {
        title: "End Time",
        field: "end",
        type: "string",
      },
      {
        title: "Actual Hours Worked",
        field: "hours",
        type: "Integer",
      },
      {
        title: "Estimated Hour(s) To Complete",
        field: "estimate",
        type: "Integer",
      },
    ],
    data: [
      {
        name: "Charles Wearing",
        task: "Finish team dropdown list",
        day: "Tues",
        date: "2020-03-20",
        start: "10:00AM",
        end: "1:00PM",
        hours: 3,
        estimate: 3,
      },
      {
        name: "Eloise Lin",
        task: "Finish CRUD design and functionality of timesheet table",
        day: "Mon",
        date: "2020-03-2020",
        start: "10:00AM",
        end: "2:00PM",
        hours: 4,
        estimate: 3,
      },
      {
        name: "Jasmine Fenton",
        task: "Finish product backlog",
        day: "Mon",
        date: "2020-03-2020",
        start: "10:00AM",
        end: "12:00PM",
        hours: 2,
        estimate: 2,
      },
    ],
  });

  return (
    <div style={{ maxWidth: "100%" }}>
      <Grid container>
        <PictureAsPdfIcon
          position="absolute"
          vertical-align="text-bottom"
          onClick={() => window.print()}
        />
        <Grid item xs={12}>
          <MaterialTable
            icons={tableIcons}
            title=""
            columns={state.columns}
            data={state.data}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 500);
                  NotificationManager.success(
                    "You have added a new entry!",
                    "Entry Successful!"
                  );
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 500);
                  NotificationManager.success(
                    "You have updated an entry!",
                    "Entry Update Successful!"
                  );
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }, 500);
                  NotificationManager.success(
                    "You have deleted an new entry!",
                    "Entry Delete Successful!"
                  );
                }),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Timesheets;
