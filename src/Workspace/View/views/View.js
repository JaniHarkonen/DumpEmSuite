import React from "react";
import styled from "styled-components";
import { FullDiv } from "../../../common/FullDiv"


export default function View(props) {
    const FirstHalf = props.firstHalf.element;
    const SecondHalf = props.secondHalf?.element;

    return(
        <FullDiv>
            <Half style={{
                width: props.stretch ? "100%" : "50%"
            }}
            >
                {props.firstHalf && <FirstHalf context={props.firstHalf.context} />}
            </Half>

            {
                props.stretch &&
                <Half>
                    {props.secondHalf && <SecondHalf context={props.firstHalf?.context} />}
                </Half>
            }
        </FullDiv>
    );
}

const Half = styled.div`
    position: relative;
    width: 50%;
    height: 100%;
`;