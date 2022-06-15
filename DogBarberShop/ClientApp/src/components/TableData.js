import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


export function TableData({ data, onClickRow}) {

    return (
            <TableContainer
                component={Paper}
                sx={{
                    width: 550,
                    margin: "50px auto",
                    border: "solid 1px #0000001b"
                }}
            >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ background: "linear-gradient(145deg, black, blue)" }}>
                            <TableCell sx={{ color: 'white' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white' }} align="right">Date time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row) => (
                            <TableRow
                            onClick={() => { onClickRow(row) }}
                                key={row.name}
                                sx={{
                                    "&:last-child td, &:last-child th": { border: 0 },
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "#0000001a"
                                    }
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.timeOfTheQueue.slice(0, 19).replace('T', ' ')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    );
}
