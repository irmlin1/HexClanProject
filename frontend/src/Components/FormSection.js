import Divider from "@mui/material/Divider";
import * as React from "react";

export default function FormSection(props) {
    const { title, children } = props;

    return (
        <>
            <Divider sx={{ my: 2, fontSize:"large" }}>
                <b>{title}</b>
            </Divider>
            {children}
        </>
    );
}
