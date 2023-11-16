import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ question, author }) => {
    return (
        <Link to={`questions/${question?.id}`}>
            <Paper sx={{ bgcolor: 'gray', p: 2 }}>
                <Box>
                    <img className="h-12 w-12" src={author?.avatarURL} alt="Author" />
                </Box>
                <Stack direction="column">
                    <Typography variant="h6" component="span" sx={{ color: '#FFFFFF' }}>{question.author?.name || author?.name}</Typography>
                    <Typography variant="body" component="span" sx={{ color: '#FFFFFF', mb: 2 }}>{new Date(question.timestamp).toDateString()}</Typography>
                    <Button variant="contained" fullWidth>Show</Button>
                </Stack>
            </Paper>
        </Link>
    );
}

export default connect()(Card);