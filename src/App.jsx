import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Notfound from './pages/Notfound';
import CreatePoll from './pages/CreatePoll/CreatePoll';
import Poll from './pages/Poll';
import Leaderboard from './pages/Leaderboard';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { Stack } from '@mui/material';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { handleInitialData } from './redux/actions/common-actions';
import Navbar from './components/Navbar/Navbar';

function App({ dispatch, loggedIn }) {
  useEffect(() => {
    dispatch(handleInitialData());
  });

  return (
    <>
      {loggedIn ? <Navbar /> : null}
      <Stack justifyContent="center" alignItems="center" sx={{ width: 'calc(100vw - 32px)', height: 'calc(100vh - 70px)', p: 2 }} >
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/leaderboard" exact element={<Leaderboard />} />
          <Route path="/questions/:id" element={<Poll />} />
          <Route path="/new" exact element={<CreatePoll />} />
          <Route path="/notfound" exact element={<Notfound />} />
          <Route path='*' exact={true} element={<Notfound />} />
        </Routes>
      </Stack>
    </>
  );
}


const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(App);
