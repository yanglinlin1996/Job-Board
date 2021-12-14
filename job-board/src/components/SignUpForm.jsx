import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from './NavBar';

const theme = createTheme();

export default function SignUp() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const opt = {
            method: "POST",
            url: "/api/user/register",
            data: userData
        };
        console.log("Printing data: " + data);
        // const userData = {
        //     username: data.get('username'),
        //     password: data.get('password'),
        //     confirmPassword: data.get('confirmPassword')
        // };
        axios(opt).then(response => { navigate('/login')
            console.log(userData)}).catch(error => console.log(error));
        // eslint-disable-next-line no-console
        console.log({
        username: data.get('username'),
        password: data.get('password'),
        confirmPassword: data.get('confirmPassword')
        });
    };

    let navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    })

    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        value={userData.username} 
                                        onChange={(e) => {
                                            const username = e.target.value;
                                            setUserData({
                                                ...userData,
                                                username: username
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={userData.password} 
                                        onChange={(e) => {
                                            const password = e.target.value;
                                            setUserData({
                                                ...userData,
                                                password: password
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={userData.confirmPassword} 
                                        onChange={(e) => {
                                            const confirmPassword = e.target.value;
                                            setUserData({
                                                ...userData,
                                                confirmPassword: confirmPassword
                                            })
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                // onClick = {() => {
                                //     axios.post('/api/user/register', userData).then(response => { navigate('/login')
                                //     console.log(userData)}).catch(error => console.log(error));}}
                                >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
            </Container>
        </ThemeProvider>
    );
}