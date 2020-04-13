import React from "react";
const backlog = (props) => {
  const initialState = {
    task: "",
  };
  const classes = useStyles();

  const [story, setStory] = useState([]);
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      props.stateSetter("Fetching Tasks");

      let rawResponse = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query:
            "{tasksbyproject(projectName) { taskName, subTasks, timeRemaining, status, backlog}}",
        }),
      });
      let results = await rawResponse.json();

      setStory(results.data.story);

      props.stateSetter(`Retrieved ${results.data.story.length} task`);
    } catch (error) {
      props.stateSetter("Failed to fetch task");
    }
  };
  return (
    <div>
      <div class="centered">User stories and Sub tasks go here</div>
    </div>
  );
};
export default backlog;