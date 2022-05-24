import React, { useState } from "react";
import styled from "styled-components";
import { FullDiv } from "../../../../../common/FullDiv";
import ColorPicker from "../ColorPicker/ColorPicker";

export default function FilterOptionsPanel(props) {
    const [bringFilters, setBringFilters] = useState([]);
    const [displayFilters, setDisplayFilters] = useState([]);

    const handleBringFilterSelection = (selection) => {
        setBringFilters(selection);
    };

    const handleDisplayFilterSelection = (selection) => {
        setDisplayFilters(selection);
        props.onDisplayFilterChange(selection);
    };

    const renderFilterPane = (caption, selhook, selection) => {
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
            {renderFilterPane("Bring:", handleBringFilterSelection, bringFilters)}
            {renderFilterPane("Filters:", handleDisplayFilterSelection, displayFilters)}
        </FullDiv>
    );
}

const FilterPane = styled.div`
    position: relative;
    display: inline-block;
    width: 50%;
    height: 100%;
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