import React from "react";
import styled from "styled-components";
import { FullDiv } from "../../common/FullDiv"
import { getKey } from "../../utils/KeyManager";


export default function View(props) {
    const FirstHalf = props.firstHalf.element;
    const SecondHalf = props.secondHalf?.element;


    return(
        <FullDiv>
            <Half style={{ width: props.stretch ? "100%" : "50%" }}
            >
                {
                    props.firstHalf &&
                    (<FirstHalf
                        key={"first-half-" + getKey()}
                        context={props.firstHalf.context}
                    />)
                }
            </Half>

            {
                !props.stretch &&
                (<Half>
                    {
                        props.secondHalf &&
                        (<SecondHalf
                            key={"second-half-" + getKey()}
                            context={props.secondHalf?.context}
                        />)
                    }
                </Half>)
            }
        </FullDiv>
    );
}

const Half = styled.div`
    position: relative;
    display: inline-block;
    width: 50%;
    height: 100%;
`;