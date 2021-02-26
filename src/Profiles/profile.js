import React from "react";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import FeedbackIcon from "@material-ui/icons/Feedback";
import ScoreIcon from "@material-ui/icons/Score";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Slider from "@material-ui/core/Slider";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
import { formatDistance } from "date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { fetchWrapper } from "../Services/fetchWrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  large: {
    width: "128px",
    height: "128px",
  },
  skillChips: {
    display: "flex",

    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 2,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 2,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

const Profile = (props) => {
  const classes = useStyles();
  const [profileData, setProfileData] = React.useState({});
  const [currProfile, setCurrProfile] = React.useState("");

  const handleProfileChange = (event) => {
    setCurrProfile(event.target.value);
  };

  React.useEffect(() => {
    fetchWrapper.get(`/profiles/u/${props.profileId}`).then((resp) => {
      setProfileData(resp[0]);
    });
  }, []);
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Profile Details
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    <Box>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          profileData._id
                            ? `https://randomuser.me/api/portraits/men/1.jpg`
                            : ""
                        }
                        className={classes.large}
                      />
                      <Typography color="textPrimary">
                        {profileData.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {profileData.designation}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="h5" component="h2"></Typography>
                  <br />
                  <Typography variant="body2" component="p">
                    Experience{" "}
                    {profileData.joining_date &&
                      formatDistance(
                        new Date(profileData.joining_date),
                        new Date()
                      )}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Skills
                  </Typography>
                  <span className={classes.skillChips}>
                    {profileData.tags &&
                      profileData.tags.map((item, index) => (
                        <Chip
                          size="small"
                          label={item}
                          key={`${item}${index}`}
                          clickable
                        />
                      ))}
                  </span>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5" gutterBottom>
                      {profileData.skills &&
                        profileData.skills
                          .map((item) => item.score)
                          .reduce((total, score) => total + score)}
                    </Typography>
                    <ScoreIcon color="primary" fontSize="large" />
                  </Box>
                  <Typography display="block">Score</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5" gutterBottom>
                      {profileData.feedback && profileData.feedback.length}
                    </Typography>
                    <FeedbackIcon color="primary" fontSize="large" />
                  </Box>
                  <Typography display="block">Feedbacks</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5" gutterBottom>
                      {profileData.likes ? profileData.likes : 0}
                    </Typography>
                    <FavoriteIcon color="secondary" fontSize="large" />
                  </Box>
                  <Typography display="block">Likes</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Scores
                    </Typography>
                  </Box>
                  <Box width="200px">
                    <FormControl className={classes.formControl}>
                      <InputLabel id="profile-select-label">Profile</InputLabel>
                      <Select
                        native
                        labelId="profile-select-label"
                        id="profile-select"
                        value={currProfile}
                        onChange={handleProfileChange}
                      >
                        <option value=""></option>
                        {props.skillProfiles &&
                          props.skillProfiles.map((item) => (
                            <option
                              value={item.profile_code}
                              key={item.profile_code}
                            >
                              {item.profile_title}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box>
                  {profileData.skills &&
                    profileData.skills.map((item, index) => (
                      <Box mb={2} fontSize={16} key={`${item.skill}${index}`}>
                        <span>{item.skill}</span>
                        <Box display="flex" alignItems="center">
                          <Box width="100%" mr={1}>
                            <BorderLinearProgress
                              variant="determinate"
                              value={item.score / 100}
                            />
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                            >{`${Math.round(item.score / 100)}%`}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    skills: state.skillSettings.skills,
    skillProfiles: state.skillSettings.skillProfiles,
  };
};
export default connect(mapStateToProps, null)(Profile);
