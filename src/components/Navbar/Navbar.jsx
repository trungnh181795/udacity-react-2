import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleOnLogout } from "../../redux/actions/auth-actions";
import { AppBar, Box, Button, Container, Divider, Drawer, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ContentCopy, ContentCut, ContentPaste } from "@mui/icons-material";

const Navbar = ({ dispatch, authedUserId }) => {
    const [open, setOpen] = useState(false)

    const logout = (e) => {
        e.preventDefault();
        dispatch(handleOnLogout());
    };

    return (
        <>
            <AppBar position="static" sx={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton
                            onClick={() => setOpen(true)}
                            size="large"
                            edge="start"
                            color="#FFFFFF"
                            aria-label="menu"
                            sx={{ mr: 2, display: { xs: 'block', lg: 'none' } }}
                        >
                            <MenuIcon color="#FFFFFF" />
                        </IconButton>
                        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: 'center' }}>
                            <AdbIcon sx={{ mr: 1 }} />
                            <Typography
                                variant="h5"
                                noWrap
                                component={Link}
                                to="/"
                                sx={{
                                    mr: 2,
                                    fontWeight: 700,
                                    color: "#FFFFFF",
                                    textDecoration: "none",
                                }}
                            >
                                Employee Polls
                            </Typography>
                        </Box>
                        <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center' }}>
                            <Typography sx={{ color: '#FFFFFF', padding: '4px 8px', fontWeight: 700 }} component={Link} to="/">
                                Home
                            </Typography>
                            <Typography sx={{ color: '#FFFFFF', padding: '4px 8px', fontWeight: 700 }} component={Link} to="/leaderboard">
                                Leaderboard
                            </Typography>
                            <Typography sx={{ color: '#FFFFFF', padding: '4px 8px', fontWeight: 700 }} component={Link} to="/new">
                                New Poll
                            </Typography>
                        </Box>
                        <Stack direction="row" alignItems='center'>
                            <Typography
                                variant="h6"
                                component="span"
                                data-testid="user-information" sx={{ color: "#FFFFFF" }}>User: {authedUserId}</Typography>
                            <Button variant="contained" sx={{ bgcolor: '#FFFFFF', color: 'primary.main', ml: 1 }} onClick={logout}
                                className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Logout
                            </Button>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer sx={{ width: '300px' }} anchor="left" open={open} onClose={() => setOpen(false)}>
                <Paper sx={{ width: 320, maxWidth: '100%', idth: '300px', height: '100%', bgcolor: '#23262F', borderRadius: 0 }}>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ width: '100%', padding: '4px' }}>
                        <IconButton onClick={() => setOpen(false)}
                            size="large"
                            edge="start"
                            color="#FFFFFF"
                            aria-label="menu"
                            sx={{ mr: 2, display: { xs: 'block', lg: 'none' } }}>
                            <ArrowBackIosIcon color="#FFFFFF" />
                        </IconButton>
                    </Stack>
                    <Divider />
                    <MenuList>
                        <MenuItem onClick={() => setOpen(false)} component={Link} sx={{ color: '#FFFFFF' }} to="/">
                            <ListItemIcon>
                                <ContentCut fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => setOpen(false)} component={Link} sx={{ color: '#FFFFFF' }} to="/leaderboard">
                            <ListItemIcon>
                                <ContentCopy fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Leaderboard</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => setOpen(false)} component={Link} sx={{ color: '#FFFFFF' }} to="/new">
                            <ListItemIcon>
                                <ContentPaste fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>New Poll</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Drawer>
        </>
    );
};

const mapStateToProps = ({ authedUser }) => ({
    authedUserId: authedUser.id,
});


export default connect(mapStateToProps)(Navbar);