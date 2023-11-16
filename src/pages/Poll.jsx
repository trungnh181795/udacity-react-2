import { connect } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ProtectedPage from "../components/ProtectedPage";
import { handleAddAnswer } from "../redux/actions/question-actions";
import { Button, Grid, Typography } from "@mui/material";
import withRouter from "../redux/withRouter";
import { compose } from "redux";

const PollPage = ({ dispatch, authedUser, question, author }) => {
    const navigate = useNavigate();

    if (!authedUser || !question || !author) {
        return <Navigate to="/404" />;
    }

    const votedOptionOne = question.optionOne.votes.includes(authedUser.id);
    const votedOptionTwo = question.optionTwo.votes.includes(authedUser.id);
    const voted = votedOptionOne || votedOptionTwo;

    const handleOnFirstOptionChosen = (e) => {
        e.preventDefault();
        dispatch(handleAddAnswer(question.id, "optionOne"));
        navigate("/");
    };

    const handleOnSecondOptionChosen = (e) => {
        e.preventDefault();
        dispatch(handleAddAnswer(question.id, "optionTwo"));
        navigate("/");
    };

    const calcPercentage = (option, question) => {
        const numberVotesTotal = question.optionOne.votes.length + question.optionTwo.votes.length;
        switch (option) {
            case "optionOne":
                return question.optionOne.votes.length / numberVotesTotal * 100 + " %";
            case "optionTwo":
                return question.optionTwo.votes.length / numberVotesTotal * 100 + " %";
            default:
                return "";
        }
    };

    return (
        <ProtectedPage>
            <Link to="/">
                <Typography variant="h6" component="h2" fontWeight={500} sx={{ color: '#FFFFFF', mt: 2 }}>
                    Go back
                </Typography>
            </Link>
            <Typography variant="h4" component="h1" fontWeight={700} sx={{ color: '#FFFFFF' }}>Poll by {author.id}</Typography>

            <Typography variant="h6" component="h2" fontWeight={500} sx={{ color: '#FFFFFF', mt: 2 }}>
                Would you rather?
            </Typography>

            <Grid container spacing={2} sx={{ width: '50%' }}>
                <Grid item xs={12} md={6}>
                    <Button fullWidth sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#FFFFFF !important' }} variant="contained" onClick={handleOnFirstOptionChosen} disabled={voted}>
                        <p className="font-bold mb-2">{question.optionOne.text}</p>
                        {!voted &&
                            <p className="underline underline-offset-4 mb-3">Click</p>
                        }
                        {voted &&
                            <p className="text-xs">Votes: {question.optionOne.votes.length} ({calcPercentage("optionOne", question)})</p>
                        }
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button fullWidth sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#FFFFFF !important' }} variant='contained' onClick={handleOnSecondOptionChosen} disabled={voted}>
                        <p className="font-bold mb-2">{question.optionTwo.text}</p>
                        {!voted &&
                            <p className="underline underline-offset-4 mb-3">Click</p>
                        }
                        {voted &&
                            <p className="text-xs">Votes: {question.optionTwo.votes.length} ({calcPercentage("optionTwo", question)})</p>
                        }
                    </Button>
                </Grid>
            </Grid>
        </ProtectedPage>
    );
};

const mapStateToProps = ({ authedUser, users, questions }, { params: { id } = {}}) => {
    try {
        const question = Object.values(questions).find((question) => question.id === id);
        const author = Object.values(users).find((user) => user.id === question.author?.id || question?.author);
        console.log('hi', { authedUser, question, author })
        return { authedUser, question, author };
    } catch (e) {
        return <Navigate to="/404" />;
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps)
)(PollPage);