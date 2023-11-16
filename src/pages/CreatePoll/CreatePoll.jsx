import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProtectedPage from "../../components/ProtectedPage";
import { Box, Button, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material";
import { handleAddQuestion } from "../../redux/actions/question-actions";

const NewPoll = ({ dispatch }) => {
    const navigate = useNavigate();
    const [error, setError] = useState({})
    const [firstOption, setFirstOption] = useState("");
    const [secondOption, setSecondOption] = useState("");

    const handleFirstOptionChange = (e) => {
        const value = e.target.value;
        setFirstOption(value);
    };

    const handleSecondOptionChange = (e) => {
        const value = e.target.value;
        setSecondOption(value);
    };

    const validate = () => {
        let errors = {}
        if (!firstOption) {
            errors.firstOption = 'Required'
        }
        if (!secondOption) {
            errors.secondOption = 'Required'
        }
        setError(errors);

        return Object.keys(errors)?.length > 0
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const isInValidForm = validate()

        if (isInValidForm) {
            return
        }

        dispatch(handleAddQuestion(firstOption, secondOption));
        navigate("/");
    };

    return (
        <ProtectedPage>
            <Box sx={{ width: '100%', height: '100%' }}>
                <Typography variant="h4" component="h1" fontWeight={700} sx={{ color: '#FFFFFF' }}>New Poll</Typography>
                <Typography variant="h6" component="h2" fontWeight={700} sx={{ mt: 4, color: '#FFFFFF' }}>Would you rather: </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ width: { xs: '100%', lg: '500px' }, display: 'flex', flexDirection: 'column' }}>
                        <FormControl variant="standard" sx={{ marginBottom: '16px' }}>
                            <InputLabel data-testid="firstOptionLabel" sx={{ color: '#FFFFFF' }} htmlFor="firstOption">First Option</InputLabel>
                            <Input
                                data-testid="firstOptionInput"
                                sx={{ color: '#FFFFFF' }}
                                value={firstOption}
                                onChange={handleFirstOptionChange}
                                type="text"
                                name="firstOption"
                                id="firstOption"
                                error={!!error?.firstOption}
                            />
                            {error?.firstOption ? <FormHelperText variant="standard" error={!!error?.firstOption}>{error?.firstOption}</FormHelperText> : null}
                        </FormControl>

                        <FormControl variant="standard" sx={{ marginBottom: '16px' }}>
                            <InputLabel data-testid="secondOptionLabel" sx={{ color: '#FFFFFF' }} htmlFor="secondOption">Second Option</InputLabel>
                            <Input
                                data-testid="secondOptionInput"
                                sx={{ color: '#FFFFFF' }}
                                value={secondOption}
                                onChange={handleSecondOptionChange}
                                type="text"
                                name="secondOption"
                                id="secondOption"
                                error={!!error?.secondOption}
                            />
                            {error?.secondOption ? <FormHelperText variant="standard" error={!!error?.secondOption}>{error?.secondOption}</FormHelperText> : null}
                        </FormControl>

                        <Button
                            data-testid="submit-button"
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ color: "#FFFFFF", fontWeight: 500 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </ProtectedPage>
    );
};

export default connect()(NewPoll);