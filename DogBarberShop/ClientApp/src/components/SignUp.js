import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { NameField } from './NameField';
import { PasswordField } from './PasswordField';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Axios from 'axios';
import { useDispatch } from "react-redux";
import { logIn } from "../logInSlice";
import { validPassword } from '../validPassword';

const BACEURL = "https://localhost:44346/api";

export function SignUp() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [Name, setName] = useState('');
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (!(Name && UserName && Password && confirmPassword)) {
            setMessage('The entire form must be completed!');
            return;
        }
        if (Password !== confirmPassword) {
            setMessage('Passwords are not the same');
            return;
        }
        if (!validPassword.test(confirmPassword)) {
            setMessage('Password not strong enough');
            return;
        }
        Axios.post(`${BACEURL}/auth/register`, {
            Name,
            UserName,
            Password
        })
            .then((res) => {
                if (res.data.IsCreated) {
                    dispatch(logIn({
                        userId: res.data.userData.UserId,
                        name:Name,
                        userName: UserName,
                        password: Password
                    }));
                    navigate('/');
                } else {
                    setMessage(res.data.ErrorMessage)
                }
            })
            .catch((error) => {
                setMessage("Something is wrong Try again");
                console.log(error)
            });
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { mt: 3, width: 300 },
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center"
            }}
            noValidate
            autoComplete="on"
        >
            <NameField
                label='Name'
                id='name'
                value={Name}
                setValue={setName} />
            <NameField
                label='User name'
                id='userName'
                value={UserName}
                setValue={setUserName} />
            <PasswordField
                label='Password'
                id='passwordTextField'
                value={Password}
                setValue={setPassword} />
            <PasswordField
                label='Confirm Password'
                id='confirmPassword'
                value={confirmPassword}
                setValue={setConfirmPassword} />

            {
                message && <Alert severity="error">
                    {message}
                </Alert>
            }
            <Button
                sx={{ background: "linear-gradient(145deg, black, blue)", color: 'white' }}
                onClick={handleSubmit}
            >
                Submit
            </Button>
            <p> Already have an account? {''}
                <Button onClick={() => navigate('/login')} sx={{ textTransform: 'none' }}>
                    Sign in
                </Button>
            </p>
        </Box>
    );
}

