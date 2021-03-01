import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Router, useLocation } from "@reach/router";
import { fetchWrapper } from "./Services/fetchWrapper";

import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import Skill from "./SkillManagement/Skill";
import SkillGroup from "./SkillManagement/SkillGroup";
import SkillProfiles from "./SkillManagement/SkillProfile";
import EditSkillProfiles from "./SkillManagement/SkillProfile/edit";
import Profiles from "./Profiles/index";
import Profile from "./Profiles/profile";
import Feedback from "./Feedback/index";
import SystemSettings from "./Settings/system";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#f7f9fc !important",
  },
  centeredContent: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App(props) {
  const classes = useStyles();
  const location = useLocation();
  React.useEffect(() => {
    props.authenticateUser({ location });
    fetchWrapper.get("/skills/settings").then((resp) => {
      props.updateState(resp);
    });
  }, []);
  if (props.auth && props.auth.isLoggedIn) {
    return (
      <div className={(classes.root, classes.centeredContent)}>
        <Router>
          <Feedback path="/feedback/id/:jobId" />
        </Router>
      </div>
    );
  }
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
          <EditSkillProfiles path="/skill-profiles/:profileId" />
          <Profiles path="/profiles" />
          <Profile path="/profiles/u/:profileId" />
          <Feedback path="/feedback/id/:jobId" />
          <SystemSettings path="/settings/system" />
        </Router>
      </main>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (payload) =>
    dispatch({ type: "AUTHENTICATE_USER", payload }),
  updateState: (payload) =>
    dispatch({ type: "UPDATE_SKILL_SETTINGS", payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
