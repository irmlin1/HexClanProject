import React from "react";
import styled from "styled-components";

export default function Dashboard () {
    return (
        <DashboardDiv>
            <h1>Discite</h1>
            <h2>This is a web page about learning interactively</h2>
        </DashboardDiv>
    );
}

const DashboardDiv = styled.div`
    width: var(--web-width);
    margin-left: auto;
    margin-right: auto;
    padding-top: var(--page-top-offset);
`;