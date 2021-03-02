import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Router } from "@reach/router";
import { fetchWrapper } from "./Services/fetchWrapper";

import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import Skill from "./SkillManagement/Skill";
import SkillGroup from "./SkillManagement/SkillGroup";
import SkillProfiles from "./SkillManagement/SkillProfile";
import EditSkillProfiles from "./SkillManagement/SkillProfile/edit";
import Profiles from "./Profiles/index";
import Profile from "./Profiles/profile";
import SystemSettings from "./Settings/system";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#f7f9fc !important",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App(props) {
  const classes = useStyles();
  React.useEffect(() => {
    fetchWrapper.get("/skills/settings").then((resp) => {
      props.updateState(resp);
    });
  }, []);
  return (
    <div className={classes.root}>
      <Navigation />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
          <Dashboard path="/dashboard" />
          <Skill path="/skills" />
          <SkillGroup path="/skill-groups" />
          <SkillProfiles path="/skill-profiles" />
          <EditSkillProfiles path="/skill_profiles/u/:profileId" />
          <Profiles path="/profiles" />
          <Profile path="/profiles/u/:profileId" />
          <SystemSettings path="/settings/system" />
        </Router>
      </main>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateState: (payload) =>
    dispatch({ type: "UPDATE_SKILL_SETTINGS", payload }),
});

export default connect(null, mapDispatchToProps)(App);
