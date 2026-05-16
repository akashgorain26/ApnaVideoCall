import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar } from '@mui/material';

import { AuthContext } from '../contexts/AuthContext';

import FaceAuth from './FaceAuth';

const defaultTheme = createTheme();

export default function Authentication() {

    const [username, setUsername] =
        React.useState("");

    const [password, setPassword] =
        React.useState("");

    const [name, setName] =
        React.useState("");

    const [error, setError] =
        React.useState("");

    const [message, setMessage] =
        React.useState("");

    const [formState, setFormState] =
        React.useState(0);

    const [open, setOpen] =
        React.useState(false);

    /* FACE VERIFIED */

    const [faceVerified, setFaceVerified] =
        React.useState(false);

    const {
        handleRegister,
        handleLogin
    } = React.useContext(AuthContext);

    const handleAuth = async () => {

        try {

            if (!faceVerified) {

                alert("❌ Please verify face first");

                return;
            }

            /* LOGIN */

            if (formState === 0) {

                await handleLogin(
                    username,
                    password
                );

            }

            /* REGISTER */

            if (formState === 1) {

                let result =
                    await handleRegister(
                        name,
                        username,
                        password
                    );

                setMessage(result);

                setOpen(true);

                setError("");

                setFormState(0);

                setName("");

                setUsername("");

                setPassword("");

                setFaceVerified(false);
            }

        } catch (err) {

            console.log(err);

            let message =
                err?.response?.data?.message
                || "Something went wrong";

            setError(message);
        }
    }

    return (

        <ThemeProvider theme={defaultTheme}>

            <Grid
                container
                component="main"
                sx={{ height: '100vh' }}
            >

                <CssBaseline />

                {/* LEFT IMAGE SECTION */}

                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url(https://source.unsplash.com/random?wallpapers)',

                        backgroundRepeat:
                            'no-repeat',

                        backgroundColor: (t) =>
                            t.palette.mode === 'light'
                                ? t.palette.grey[50]
                                : t.palette.grey[900],

                        backgroundSize:
                            'cover',

                        backgroundPosition:
                            'center',
                    }}
                />

                {/* RIGHT AUTH SECTION */}

                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >

                    <Box
                        sx={{
                            my: 4,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Avatar
                            sx={{
                                m: 1,
                                bgcolor: 'secondary.main'
                            }}
                        >

                            <LockOutlinedIcon />

                        </Avatar>

                        {/* LOGIN / REGISTER SWITCH */}

                        <div>

                            <Button
                                variant={
                                    formState === 0
                                        ? "contained"
                                        : "outlined"
                                }

                                onClick={() => {

                                    setFormState(0);

                                }}
                            >

                                Sign In

                            </Button>

                            <Button
                                sx={{ ml: 2 }}

                                variant={
                                    formState === 1
                                        ? "contained"
                                        : "outlined"
                                }

                                onClick={() => {

                                    setFormState(1);

                                }}
                            >

                                Sign Up

                            </Button>

                        </div>

                        {/* FORM */}

                        <Box
                            component="div"
                            noValidate
                            sx={{ mt: 1, width: "100%" }}
                        >

                            {
                                formState === 1
                                    ? (
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Full Name"
                                            value={name}
                                            onChange={(e) => {

                                                setName(
                                                    e.target.value
                                                )

                                            }}
                                        />
                                    )
                                    : null
                            }

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                value={username}
                                onChange={(e) => {

                                    setUsername(
                                        e.target.value
                                    )

                                }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => {

                                    setPassword(
                                        e.target.value
                                    )

                                }}
                            />

                            {/* ERROR */}

                            <p
                                style={{
                                    color: "red",
                                    marginTop: "10px"
                                }}
                            >
                                {error}
                            </p>

                            {/* FACE AUTH */}

                            {
                                !faceVerified
                                    ? (
                                        <FaceAuth
                                            onSuccess={() => {

                                                setFaceVerified(true);

                                                alert(
                                                    "✅ Face Verified"
                                                );

                                            }}
                                        />
                                    )
                                    : (
                                        <p
                                            style={{
                                                color: "green",
                                                fontWeight: "bold",
                                                marginTop: "15px"
                                            }}
                                        >

                                            ✅ Face Verified Successfully

                                        </p>
                                    )
                            }

                            {/* SUBMIT BUTTON */}

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2
                                }}

                                onClick={handleAuth}
                            >

                                {
                                    formState === 0
                                        ? "Login"
                                        : "Register"
                                }

                            </Button>

                        </Box>

                    </Box>

                </Grid>

            </Grid>

            {/* SNACKBAR */}

            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}
            />

        </ThemeProvider>
    );
}