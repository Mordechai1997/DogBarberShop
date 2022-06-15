import React,{ useState } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { NameField } from './NameField'
import { PasswordField } from './PasswordField';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Axios from 'axios';
import { useDispatch } from "react-redux";
import { logIn } from "../logInSlice";

const BACEURL = "https://localhost:44346/api";

export function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        if (!(UserName && Password)) {
            setMessage('The entire form must be completed!');
            return;
        }
        Axios.post(`${BACEURL}/auth/login`, {
            UserName,
            Password
        })
            .then((res) => {
                if (res.data.IsExists) {
                    dispatch(logIn(res.data.userData[0]));
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
                alignItems: "center",
            }}
            noValidate
            autoComplete="on"
        >
            <NameField
                label='User name'
                id='name'
                value={UserName}
                setValue={setUserName} />
            <PasswordField
                label='Password'
                id='passwordTextField'
                value={Password}
                setValue={setPassword} />
         
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
            <p onClick={() => navigate('/signup')}> No account?
                <Button sx={{ textTransform: 'none' }}>
                    Create one
                </Button>
            </p>
        </Box>
    );
}

