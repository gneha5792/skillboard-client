import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import clsx from "clsx";

const data = [
  { argument: "React", value: 60 },
  { argument: "Html", value: 76 },
  { argument: "css", value: 75 },
  { argument: "Javascript", value: 40 },
  { argument: "Vue", value: 50 },
  { argument: "Java", value: 40 },
  { argument: "Python", value: 10 },
  { argument: "c++", value: 30 },
  { argument: "swift", value: 8 },
  { argument: "c#", value: 15 },
  { argument: "flutter", value: 38 },
  { argument: "React Native", value: 66 },
];
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    //textAlign: "center",
    //color: theme.palette.text.secondary,
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Box display="flex" justifyContent={"space-between"}>
                  <Typography variant="subtitle1" gutterBottom>
                    Visitors
                  </Typography>
                  <Chip label="Today" size="small" color="primary" />
                </Box>
                <Typography variant="h5" gutterBottom>
                  923
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Box display="flex" justifyContent={"space-between"}>
                  <Typography variant="subtitle1" gutterBottom>
                    Feedbacks Requested
                  </Typography>
                  <Chip label="Monthy" size="small" color="primary" />
                </Box>
                <Typography variant="h5" gutterBottom>
                  2132
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Box display="flex" justifyContent={"space-between"}>
                  <Typography variant="subtitle1" gutterBottom>
                    Feedback Provided
                  </Typography>
                  <Chip label="Monthy" size="small" color="primary" />
                </Box>
                <Typography variant="h5" gutterBottom>
                  2132
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Users
                </Typography>
                <Typography variant="h5" gutterBottom>
                  9132
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <Chart data={data}>
              <ArgumentAxis />
              <ValueAxis />
              <Title text="Top skills rated this week" />
              <BarSeries
                valueField="value"
                argumentField="argument"
                barWidth={0.5}
              />
            </Chart>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
