import React from "react";


const storyEdit = props => {
    const initialState = {
        story: ""
    };
    const classes = useStyles();

    const [story, setStory] = useState([]);
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchStory();

    }, []);

    const fetchStory = async () => {
        try {
            props.stateSetter("Fetching Story");

            let rawResponse = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: "{story {id, taskName, taskDesc, subTasks, timeRemaining, status}}"
                })
            });
            let results = await rawResponse.json();

            setStory(results.data.story);

            props.stateSetter(
                `Retrieved ${results.data.story.length} story`
            );
        } catch (error) {
            props.stateSetter("Failed to fetch story");
        }
    };
    return (
        <Card>
            <CardHeader>
                {story.taskName}
            </CardHeader>
            <CardText>
                <TextField>
                    {story.taskDesc}
                </TextField>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                subtask headers...
                        </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            story.subtasks.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {row...}
                            </TableCell>
                                    <TableCell>
                                        {row...}
                            </TableCell>
                                    <TableCell>
                                        {row...}
                            </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardText>
        </Card>
    );
}
export default storyEdit;


