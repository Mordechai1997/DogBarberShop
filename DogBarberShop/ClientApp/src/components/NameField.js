import * as React from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";

export function NameField({ id, value, setValue, label }) {
    return (
        <FormControl variant="standard">
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                id={id}
                endAdornment={
                    <InputAdornment position="end">
                        <AccountCircle sx={{ m: 1 }} />
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}
