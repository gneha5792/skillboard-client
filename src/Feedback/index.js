import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import { red } from "@material-ui/core/colors";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { useMatch } from "@reach/router";

import { fetchWrapper } from "../Services/fetchWrapper";
import Typography from "@material-ui/core/Typography";
import CustomizedSlider from "./slider";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: 24,
  },
  avatar: {
    backgroundColor: red[500],
  },
  action: {
    marginTop: 30,
  },
});

export default function Feedback(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [jobData, setJobData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [payload, setPayload] = useState({});
  const [submited, setSubmited] = useState(false);
  const match = useMatch("/feedback/:jobId/:userId");

  useEffect(() => {
    fetchWrapper.get(`/scheduledJob/j/${props.jobId}`).then((resp) => {
      setJobData(resp[0]);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(jobData).length) {
      fetchWrapper.get(`/questions/s/${jobData.skill_code}`).then((resp) => {
        console.log(resp[0]);
        setQuestions(resp[0]?.questions);
      });
      setName(jobData.feedback_for.name);
    }
  }, [jobData]);

  const submitFeedback = () => {
    if (payload) {
      fetchWrapper
        .post(`/feedback/save`, {
          payload,
          jobData,
          userId: match.userId,
        })
        .then((resp) => {
          setSubmited(true);
        })
        .catch((err) => {
          setSubmited(false);
        });
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        {submited ? (
          <Typography component="h5" variant="h5">
            Thank you for submitting your feedback
          </Typography>
        ) : (
          <Card className={classes.root}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={5}>
                <Avatar aria-label="name" className={classes.avatar}>
                  {name.slice(0, 1)}
                </Avatar>
                &nbsp;&nbsp;&nbsp;
                <Typography component="h5" variant="h5">
                  {`Feedback for ${name}`}
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                ></Typography>
              </Box>
              {questions.map((question, index) => (
                <div>
                  <Typography variant="h6" gutterBottom>
                    {question.q.replace("#PERSON", name)}
                  </Typography>
                  <CustomizedSlider
                    id={`q-${index}`}
                    payload={payload}
                    setPayload={setPayload}
                  ></CustomizedSlider>
                </div>
              ))}
            </CardContent>
            <CardActions className={classes.action}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={submitFeedback}
              >
                Submit FeedBack
              </Button>
            </CardActions>
          </Card>
        )}
      </Container>
    </React.Fragment>
  );
}
