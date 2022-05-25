import React from "react";
import TutorialPic from "../Images/Tutorial.jpg";

import styled from "styled-components";
export default function Tutorial()
{

    const TutorialDiv = styled.div`
    position: relative;
    width:1080;
    height:650px;
    overflow-x: hidden;
    `
    return (
        <TutorialDiv>
        <img src= {TutorialPic} />
        </TutorialDiv>
        );
}