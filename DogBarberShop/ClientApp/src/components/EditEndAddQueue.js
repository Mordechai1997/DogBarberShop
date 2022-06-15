import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import Axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Alert from '@mui/material/Alert';
import { useSelector } from "react-redux";

const BACEURL = "https://localhost:44346/api";

export function EditEndAddQueue({ queueExists }) {

    const user = useSelector((state) => state.userlogin.user);
    const [dateField, setDateField] = useState(queueExists ? queueExists.timeOfTheQueue :"2021-07-26T22:08");
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleDelete = () => {

        if (!queueExists.queueId) {
            setMessage('No existing queue found!');
            return;
        }
        console.log(queueExists.queueId)
        Axios.post(`${BACEURL}/queue/delete-queue`, {
            Id: queueExists.queueId,
            TimeOfTheQueue: dateField,
            CreateAt: queueExists.createAt,
            UserId: queueExists.userId
        })
            .then((res) => {
                if (res.data.IsDelete) {
                    setMessage('')
                    setSuccess(true)
                } else {
                    setMessage(res.data.ErrorMessage)
                }
            })
            .catch((error) => {
                setMessage("Something is wrong Try again");
                console.log(error)
            });
    }
    const handleUpdate = () => {
        if (!queueExists) {
            setMessage('No existing queue found');
            return;
        }
        if (dateField === queueExists.timeOfTheQueue) {
            setMessage('The entire form must be completed!');
            return;
        }
        Axios.post(`${BACEURL}/queue/update-queue`, {
            TimeOfTheQueue: dateField,
            Id: queueExists.queueId
        })
            .then((res) => {
                if (res.data.IsUpdate) {
                    setMessage('')
                    setSuccess(true)
                } else {
                    setMessage(res.data.ErrorMessage)
                }
            })
            .catch((error) => {
                setMessage("Something is wrong Try again");
                console.log(error)
            });
    }
    const handleAddQueue = () => {
        if (dateField === "2021-07-26T22:08") {
            setMessage('The entire form must be completed!');
            return;
        }
        const currentdate = new Date();
        const datetime =
            currentdate.getFullYear() +
            "-" +
            (currentdate.getMonth() + 1) +
            "-" +
            currentdate.getDate() +
            "T" +
            currentdate.getHours() +
            ":" +
            currentdate.getMinutes();
        Axios.post(`${BACEURL}/queue/add-queue`, {
            UserId: user.userId,
            TimeOfTheQueue: dateField,
            CreateAt: datetime
        })
            .then((res) => {
                if (res.data.IsCreated) {
                    setMessage('')
                    setSuccess(true)
                    console.log(res)

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
        < Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "25px 0"
            }}
        >
            <TextField
                id="datetime-local"
                label="Search Date"
                type="datetime-local"
                defaultValue={dateField}
                sx={{ width: 230, marginRight: 2 }}
                InputLabelProps={{
                    shrink: true
                }}
                onChange={(e) => setDateField(e.target.value)}
            />
            {
                queueExists ? <span>
                    <EditIcon
                        onClick={handleUpdate}
                        sx={{ cursor: "pointer" }} />
                    <DeleteForeverIcon
                        onClick={handleDelete}
                        sx={{ cursor: "pointer" }}
                    />
                </span> : <AddIcon
                    onClick={handleAddQueue}
                    sx={{ cursor: "pointer" }}
                />
            }
            {
                message && <Alert severity="error">
                    {message}
                </Alert>
            }
            {
                success && <Alert severity="success">
                    "Success"
                </Alert>
            }
        </Box>
        );
}
