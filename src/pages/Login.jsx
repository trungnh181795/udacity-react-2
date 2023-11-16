import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Button, FormControl, Input, InputLabel, Stack, Typography } from '@mui/material';
import { handleOnLogin } from "../redux/actions/auth-actions";


const Login = ({ dispatch, loggedIn }) => {
    const [username, setUsername] = useState("zoshikanlu");
    const [password, setPassword] = useState("pass246");

    console.log('logged in', loggedIn)

    if (loggedIn) {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get('redirectTo');

        return <Navigate to={redirectUrl ?? "/"} />;
    }

    const handleUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
    };

    const handlePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleOnLogin(username, password));
        setUsername("");
        setPassword("");
    };

    return (
        <>
            <Typography data-testid="login-header" sx={{ color: '#FFFFFF' }} fontWeight={700} variant="h3" component="h1">Login</Typography>
            <form onSubmit={handleSubmit}>
                <Stack sx={{ width: '375px' }} direction="column" justifyContent="center" alignItems="center">
                    <FormControl fullWidth variant="standard" sx={{ marginBottom: '16px' }}>
                        <InputLabel sx={{ color: '#FFFFFF' }} htmlFor="username">Username</InputLabel>
                        <Input
                            sx={{ color: '#FFFFFF' }}
                            value={username}
                            onChange={handleUsername}
                            type="text"
                            name="username"
                            id="username"
                        />
                    </FormControl>
                    <FormControl fullWidth variant="standard" sx={{ marginBottom: '32px' }}>
                        <InputLabel sx={{ color: '#FFFFFF' }} htmlFor="password">Password</InputLabel>
                        <Input
                            sx={{ color: '#FFFFFF' }}
                            value={password}
                            onChange={handlePassword}
                            type="password"
                            name="password"
                            id="password"
                        />
                    </FormControl>

                    <Button
                        id="login-submit"
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ color: "#FFFFFF", fontWeight: 500 }}
                    >
                        Login
                    </Button>
                </Stack>
            </form>
        </>
    );
};

const mapStateToProps = ({ authedUser }) => ({
    loggedIn: !!authedUser,
})

export default connect(mapStateToProps)(Login);