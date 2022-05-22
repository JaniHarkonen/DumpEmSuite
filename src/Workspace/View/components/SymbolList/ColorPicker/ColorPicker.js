import React, { useState } from "react";
/*import styled from "styled-components";
import { FullDiv } from "../../../../../common/FullDiv";
import { getKey } from "../../../../../utils/KeyManager";

export default function ColorPicker(props) {
    const [ colorSelection, setColorSelection ] = useState(props.colorCode);

    const COLOR_OPTIONS = [
        "red",
        "green",
        "blue",
        "orange",
        "#0094FF",
        "#C0C0E5"
    ];

    const handleColorSelectionClick = (cindex) => {
        props.colorSelectionHook(cindex);
    };

    const renderColorOptions = (options) => {
        return(options.map((opt, ind) => {
            return(
                <React.Fragment key={"color-panel-" + getKey()} >
                    <ColorPanel onClick={() => { handleColorSelectionClick(ind); }} >
                        <FullDiv style={{ backgroundColor: opt }} />
                    </ColorPanel>

                    {(ind === 2) && <br />}
                </React.Fragment>
            );
        }));
    };

    return(
        <Content>
            <ColorContainer>
                <ColorPanelsWrapper id="dss">
                    {renderColorOptions(COLOR_OPTIONS)}
                </ColorPanelsWrapper>
            </ColorContainer>
        </Content>
    );
}

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ColorContainer = styled.div`
    position: relative;
    width: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: white;
    border-radius: 8px;
`;

const ColorPanelsWrapper = styled.div`
    position: relative;
`;

const ColorPanel = styled.div`
    position: relative;
    width: 32px;
    height: 32px;

    display: inline-block;
    margin: 6px;

    border-style: solid;
    border-width: 2px;
`;*/