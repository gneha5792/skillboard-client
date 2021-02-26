import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { fetchWrapper } from "../Services/fetchWrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

export default function SystemSettings() {
  const classes = useStyles();

  const [settings, setSettings] = useState({});
  useEffect(() => {
    fetchWrapper.get(`/settings/system`).then((resp) => {
      setSettings(resp);
    });
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        System Settings Date {JSON.stringify(settings, null, 2)}
      </Paper>
    </div>
  );
}
