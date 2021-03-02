import React from "react";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TextField from '@material-ui/core/TextField';
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { fetchWrapper } from "../../Services/fetchWrapper";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const EditSkillProfile = (props) => {
    const classes = useStyles();
    const [profileData, setProfileData] = React.useState({});
    const [currProfile, setCurrProfile] = React.useState("");


    const handleProfileChange = (event) => {
        setCurrProfile(event.target.value);
    };

    React.useEffect(() => {
        // console.log(`test string`)
        fetchWrapper.get(`/skill_profiles/u/${props.profileId}`).then((resp) => {
            //console.log(`response`,resp[0])
            setProfileData(resp[0]);
        });
    }, []);

    const titleCase = (str) => {
        return str.toLowerCase().split(' ').map(function (word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }

    return (
        <div>
            <Toolbar>
                <Grid  justify="space-between"  container spacing={24}>
                    <Grid item>
                        <Typography variant="h4" gutterBottom color="primary">
                            Skill Profile
                        </Typography>
                    </Grid>
                    <Grid item>
                        <div>
                            <Button variant="contained" color="primary">
                                Add Skill Group
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Toolbar>
            
            <span className={classes.table}>
                <FormControl className={classes.formControl}>
                    <TableContainer component={Paper}>
                        <Table className={useStyles.table} aria-label="simple table">
                            <TableBody>
                                {
                                    profileData ?.skill_groups ?.map((skill) => {
                                        let currSkillGroup;
                                        return (
                                            <FormControl className={classes.formControl}>
                                                <TableRow>
                                                    <TableCell>
                                                        <TextField disabled="true" id="standard-basic" label="Skill Group" variant='outlined' defaultValue={titleCase(skill.skill_group_code)} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField id="standard-basic" label="Weightage" variant='outlined' defaultValue={skill.weightage} helperText="Please enter only numbers" />
                                                    </TableCell>
                                                </TableRow>
                                            </FormControl>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </FormControl>
            </span>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        skills: state.skillSettings.skills,
        skillProfiles: state.skillSettings.skillProfiles,
    };
};

export default connect(mapStateToProps, null)(EditSkillProfile);

