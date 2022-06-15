import React,{ useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Dialog from "./Dialog";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import Axios from 'axios';
import { useSelector } from "react-redux";
import { TableData } from './TableData';
import { EditEndAddQueue } from './EditEndAddQueue';

const BACEURL ="https://localhost:44346/api"

export function Home() {

    const user = useSelector((state) => state.userlogin.user);
    const [dataQueue, setDataQueue] = useState([]);
    const [dialogData, setDialogData] = useState(null);
    const [nameField, setNameField] = useState('');
    const [queueExists, setQueueExists] = useState(false);
    const [dateField, setDateField] = useState("2021-07-26T22:08");
    const { isLoading, error, data, isFetching } = useQuery(`queue`, () =>
        Axios.get(
            `${BACEURL}/queue/getallqueues`
        ).then((res) => {
            setDataQueue(res.data)
            setQueueExists(() => res.data.filter((v)=>v.userName===user.UserName))
            return res.data;
        })
    );


    if (isLoading) {
        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }} >
                <BallTriangle color="green" height={120} width={120} />
            </div>
        )
    }
    if (error) return "An error has occurred: " + error.message;
   


    const openPopUp = (row) => {
        setDialogData(row);
    };
    const filterName = () => {
        setDataQueue(data);
        setDataQueue(prev => prev.filter((v, i) => v.name.toLowerCase().includes(nameField.toLowerCase())))
    }
    const filterDate = () => {
        setDataQueue(data);
        setDataQueue(prev => prev.filter((v, i) => v.timeOfTheQueue === dateField))
    }
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "25px 0"
                }}
            >
                <span style={{ marginRight:"30px"}}>
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
                    <SearchSharpIcon
                        sx={{ cursor: "pointer" }}
                        onClick={filterDate}
                        />
                </span>
                <span>
                    <TextField
                        sx={{ width: 230, marginRight: 2 }}
                        id="outlined-required"
                        label="Search Name"
                        value={nameField}
                        onChange={(e) => setNameField(e.target.value)}
                    />
                    <SearchSharpIcon
                        sx={{ cursor: "pointer" }}
                        onClick={filterName}
                        />
                </span>
            </Box>
            <EditEndAddQueue queueExists={queueExists[0]} />
        
            {dialogData && <Dialog data={dialogData} onClose={setDialogData} />}
            <TableData data={dataQueue} onClickRow={openPopUp} />
            <div>{isFetching ? "Updating..." : ""}</div>
        </>
    );
}
