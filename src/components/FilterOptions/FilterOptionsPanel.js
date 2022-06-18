import React, { useState } from "react";
import { FullDiv } from "../../common/FullDiv";
import ColorPicker from "../ColorPicker/ColorPicker";
import GridLayout from "../GridLayout/GridLayout";
import FilterOptionsPanelControl from "./FilterOptionsPanelControl";

export default function FilterOptionsPanel(props) {
    const enableBring = props.enableBring || false;
    const enableClear = props.enableClear || false;
    const stocksDisplayed = props.stats.stocksDisplayed;
    const stocksCount = props.stats.stocksCount;
    const onBring = props.onBring;
    const onClear = props.onClear;
    const onDisplayFilterChange = props.onDisplayFilterChange;

    const [bringFilters, setBringFilters] = useState([]);
    const [displayFilters, setDisplayFilters] = useState([]);

    
    const handleBringClick = (e) => {
        e.stopPropagation();
        onBring(bringFilters);
    };

    const handleDisplayFilterSelection = (selection) => {
        setDisplayFilters(selection);
        onDisplayFilterChange(selection);
    };

    const handleClearClick = (e) => {
        e.stopPropagation();
        onClear();
    };

    const makeOptionPanel = (position, dimensions, element, renderCondition = true) => {
        return {
            position: position,
            dimensions: dimensions,
            element: (renderCondition === true) ? element : <></>
        };
    };

    return (
        <FullDiv>
            <GridLayout
                dimensions={{
                    width: 2,
                    height: 6
                }}
                elements={[
                    makeOptionPanel({ x: 1, y: 1 }, { width: 1, height: 2 },
                        "Bring:",
                        enableBring
                    ),
                    makeOptionPanel({ x: 2, y: 1 }, { width: 1, height: 2 },
                        "Filters:"
                    ),
                    makeOptionPanel({ x: 1, y: 3 }, { width: 1, height: 2 },
                        <ColorPicker
                            selection={bringFilters}
                            onPick={setBringFilters}
                        />,
                        enableBring
                    ),
                    makeOptionPanel({ x: 2, y: 3 }, { width: 1, height: 2 },
                        <ColorPicker
                            selection={displayFilters}
                            onPick={handleDisplayFilterSelection}
                        />
                    ),
                    makeOptionPanel({ x: 1, y: 5 }, { width: 1, height: 1 },
                        <FilterOptionsPanelControl
                            caption="BRING"
                            onClick={handleBringClick}
                        />,
                        enableBring
                    ),
                    makeOptionPanel({ x: 1, y: 6 }, { width: 1, height: 1 },
                        <FilterOptionsPanelControl
                            caption="CLEAR"
                            onClick={handleClearClick}
                        />,
                        enableClear
                    ),
                    makeOptionPanel({ x: 2, y: 5 }, { width: 1, height: 2 },
                        <React.Fragment>
                            Displayed: {stocksDisplayed} <br />
                            Total: {stocksCount}
                        </React.Fragment>
                    ),
                ]}
            />
        </FullDiv>
    );
}
