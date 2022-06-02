import React, { useState } from "react";
import styled from "styled-components";
import { FullDiv } from "../../../common/FullDiv";
import ColorPicker from "../../ColorPicker/ColorPicker";

export default function FilterOptionsPanel(props) {
    const enableBring = props.enableBring;
    const enableClear = props.enableClear;
    const stocksDisplayed = props.stats.stocksDisplayed;
    const stocksCount = props.stats.stocksCount;
    const onBring = props.onBring;
    const onClear = props.onClear;
    const onDisplayFilterChange = props.onDisplayFilterChange;

    const [bringFilters, setBringFilters] = useState([]);
    const [displayFilters, setDisplayFilters] = useState([]);

    
    const handleBringClick = () => {
        onBring(bringFilters);
    };

    const handleDisplayFilterSelection = (selection) => {
        setDisplayFilters(selection);
        onDisplayFilterChange(selection);
    };

    const renderFilterPane = (caption, selhook, selection, render = true) => {
        if( render === false ) return <FilterPane />;

        return(
            <FilterPane>
                <FilterCaptionPane>{caption}</FilterCaptionPane>
                <ColorPickerContainer>
                    <ColorPicker
                        selection={selection}
                        onPick={selhook}
                    />
                </ColorPickerContainer>
            </FilterPane>
        );
    };

    return(
        <FullDiv>
            {renderFilterPane("Bring:", setBringFilters, bringFilters, enableBring)}
            {renderFilterPane("Filters:", handleDisplayFilterSelection, displayFilters)}

            <BottomPane>
                <ControlButtonContainer>
                    {
                        enableBring &&
                        (<ControlButton onClick={handleBringClick}>
                            BRING
                        </ControlButton>)
                    }
                </ControlButtonContainer>

                <ControlButtonContainer>
                    {
                        enableClear &&
                        (<ControlButton onClick={onClear}>
                            CLEAR
                        </ControlButton>)
                    }
                </ControlButtonContainer>
            </BottomPane>

            <BottomPane>
                Displayed: {stocksDisplayed} <br />
                Total: {stocksCount}
            </BottomPane>
        </FullDiv>
    );
}

const FilterPane = styled.div`
    position: relative;
    display: inline-block;
    width: 50%;
    height: 67%;
`;

const FilterCaptionPane = styled.div`
    position: relative;
    width: 100%;
    height: 50%;
`;

const ColorPickerContainer = styled.div`
    position: relative;
    width: 100%;
    height: 50%;
`;

const BottomPane = styled.div`
    position: relative;
    display: inline-block;
    vertical-align: middle;

    width: 50%;
    height: 33%;
`;

const ControlButtonContainer = styled.div`
    position: relative;
    width: 100%;
    height: 50%;
`;

const ControlButton = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    
    background-color: red;
    color: white;
    font-weight: bold;
`;
