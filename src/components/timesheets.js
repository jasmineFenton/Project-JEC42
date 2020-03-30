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
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export class Timesheets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Name", field: "name" },
        {
          title: "Task(s)",
          field: "task",
          firstEdit: "original edit value"
        },
        {
          title: "Day",
          field: "day",
          type: "string",
          lookup: {
            M: "Monday",
            T: "Tuesday",
            W: "Wednesday",
            T: "Thursday",
            F: "Friday"
          }
        },
        {
          title: "Date",
          field: "date"
        },
        {
          title: "Actual Hours Worked",
          field: "hours",
          type: "Integer"
        },
        {
          title: "Estimated Hour(s) To Complete",
          field: "estimate",
          type: "Integer"
        }
      ],
      data: [
        {
          name: "Charles Wearing",
          task: "Finish team dropdown list",
          day: "T",
          date: "2020-03-20",
          hours: 3,
          estimate: 3
        },
        {
          name: "Eloise Lin",
          task: "Finish CRUD design and functionality of timesheet table",
          day: "M",
          date: "2020-03-2020",
          hours: 4,
          estimate: 3
        },
        {
          name: "Jasmine Fenton",
          task: "Finish product backlog view",
          day: "M",
          date: "2020-03-2020",
          hours: 2,
          estimate: 2
        }
      ]
    };
  }

  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <Grid container>
          <Grid item xs={12}>
            <MaterialTable
              icons={tableIcons}
              title="Timesheet"
              columns={this.state.columns}
              data={this.state.data}
              editable={{
                onRowAdd: newData =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        const data = this.state.data;
                        data.push(newData);
                        this.setState({ data }, () => resolve());
                        reject(new Error("Something went wrong!"));
                      }
                      resolve();
                    }, 1000);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        const data = this.state.data;
                        const index = data.indexOf(oldData);
                        data[index] = newData;
                        this.setState({ data }, () => resolve());
                        reject(new Error("Something went wrong!"));
                      }
                      resolve();
                    }, 1000);
                  }),
                onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        let data = this.state.data;
                        const index = data.indexOf(oldData);
                        data.splice(index, 1);
                        this.setState({ data }, () => resolve());
                        reject(new Error("Something went wrong!"));
                      }
                      resolve();
                    }, 1000);
                  })
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Timesheets;
