import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";

export default function PopUp({ data, onClose }) {
    const handleClose = () => {

        onClose(null);
    };
    return (
        <Dialog
            onClose={handleClose}
            open={data ? true : false} >
            <CloseIcon
                onClick={handleClose}
                sx={{ fontSize: 30, cursor: "pointer", p: 1 }}
            />
            <div style={{ padding: "20px" }}>
            <DialogTitle>Queue details</DialogTitle>
            <p><b>Name: </b> {data.name}</p>
                <p><b>The time of the queue:</b> {data.timeOfTheQueue.slice(0, 19).replace('T', ' ')}</p>
             <p><b>Create at:</b>  {data.createAt.slice(0, 19).replace('T', ' ')}</p>
          </div>
        </Dialog>
    );
}
