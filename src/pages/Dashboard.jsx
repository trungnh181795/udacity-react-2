import { connect } from "react-redux";
import ProtectedPage from "../components/ProtectedPage";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import { Box, Grid, Typography } from "@mui/material";

const Dashboard = ({ authedUser, questions, users }) => {

    return (
        <ProtectedPage>
            <Box sx={{ width: '100%', height: '100%' }}>
                <Typography data-testid="dashboard-header" variant="h4" component="h1" sx={{ color: '#FFFFFF' }}>Dashboard</Typography>

                <Typography variant="h6" component="h2" sx={{ color: '#FFFFFF' }}>New Questions</Typography>
                <Grid container spacing={2}>
                    {questions
                        .filter((question) => (!question.optionOne.votes.includes(authedUser?.id)
                            && !question.optionTwo.votes.includes(authedUser?.id)))
                        .map((question) => (
                            <Grid item key={question.id} xs={12} md={6} lg={3}>
                                <QuestionCard question={question} author={users[question.author]} />
                            </Grid>
                        ))}
                </Grid>

                <Typography variant="h6" component="h2" sx={{ color: '#FFFFFF', mt: 3 }}>Answered questions</Typography>
                <Grid container spacing={2}>
                    {questions
                        .filter((question) => (question.optionOne.votes.includes(authedUser?.id)
                            || question.optionTwo.votes.includes(authedUser?.id)))
                        .map((question) => (
                            <Grid item key={question.id} xs={12} md={6} lg={3}>
                                <QuestionCard question={question} author={users[question.author]} />
                            </Grid>
                        ))}
                </Grid>
            </Box>
        </ProtectedPage>
    );
}

const mapStateToProps = ({ authedUser, questions, users }) => ({
    authedUser,
    questions: Object.values(questions).sort(
        (a, b) => b.timestamp - a.timestamp
    ),
    users,
});

export default connect(mapStateToProps)(Dashboard);