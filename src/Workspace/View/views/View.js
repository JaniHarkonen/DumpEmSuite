import React from "react";
import styled from "styled-components";
import { FullDiv } from "../../../common/FullDiv"


export default function View(props) {

    const FirstHalf = props.firstHalf;
    const SecondHalf = props.secondHalf;

    return(
        <FullDiv>
            <Half style={{
                width: props.stretch ? "100%" : "50%"
            }}
            >
                {props.firstHalf && <FirstHalf context={props.context} />}
            </Half>

            {
                props.stretch &&
                <Half>
                    {props.secondHalf && <SecondHalf context={props.context} />}
                </Half>
            }
        </FullDiv>
    )
}

const Half = styled.div`
    position: relative;
    width: 50%;
    height: 100%;
`;