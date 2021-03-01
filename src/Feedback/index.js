import React, { useState, useEffect } from "react";
import { fetchWrapper } from "../Services/fetchWrapper";
import Typography from "@material-ui/core/Typography";
import CustomizedSlider from "./slider";
import Button from "@material-ui/core/Button";

export default function Feedback(props) {
  const [name, setName] = useState("");
  const [jobData, setJobData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [payload, setPayload] = useState({});
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

  return (
    <form
      onSubmit={() => {
        console.log("submit");
      }}
    >
      <Typography variant="h5" gutterBottom>
        {`Feedback for ${name}`}
      </Typography>
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
      <Button type="submit" variant="contained" color="primary">
        Submit FeedBack
      </Button>
    </form>
  );
}
