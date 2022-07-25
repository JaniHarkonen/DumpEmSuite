import React, { useState } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import GridLayout from "../GridLayout/GridLayout";
import FilterOptionsPanelControl from "./FilterOptionsPanelControl";

import { Styles } from "./FilterOptionsPanel.styles";
import { images } from "../../assets/assets";

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
        <Styles.Content>
            <GridLayout
                dimensions={{
                    width: 2,
                    height: 6
                }}
                elements={[
                    makeOptionPanel({ x: 1, y: 2 }, { width: 1, height: 2 },
                        <Styles.FilterCaptionText
                            title="Color codes of the stocks to bring"
                        >
                            Bring filters:
                        </Styles.FilterCaptionText>,
                        enableBring
                    ),
                    makeOptionPanel({ x: 2, y: 2 }, { width: 1, height: 2 },
                        <Styles.FilterCaptionText
                            title="Filter stocks based on color code"
                        >
                            Display filters:
                        </Styles.FilterCaptionText>
                    ),
                    makeOptionPanel({ x: 1, y: 3 }, { width: 1, height: 2 },
                        <Styles.ColorPickerContainer>
                            <ColorPicker
                                selection={bringFilters}
                                onPick={setBringFilters}
                            />
                        </Styles.ColorPickerContainer>,
                        enableBring
                    ),
                    makeOptionPanel({ x: 2, y: 3 }, { width: 1, height: 2 },
                        <Styles.ColorPickerContainer>
                            <ColorPicker
                                selection={displayFilters}
                                onPick={handleDisplayFilterSelection}
                            />
                        </Styles.ColorPickerContainer>
                    ),
                    makeOptionPanel({ x: 1, y: 5 }, { width: 1, height: 1 },
                        <FilterOptionsPanelControl
                            caption="Bring"
                            onClick={handleBringClick}
                            icon={images.import.white}
                            tooltip="Bring stocks from previous tab/external source"
                        />,
                        enableBring
                    ),
                    makeOptionPanel({ x: 1, y: 6 }, { width: 1, height: 1 },
                        <FilterOptionsPanelControl
                            caption="Clear"
                            onClick={handleClearClick}
                            icon={images.brush.black}
                            tooltip="Remove all stocks from the view"
                        />,
                        enableClear
                    ),
                    makeOptionPanel({ x: 2, y: 5 }, { width: 1, height: 2 },
                        <Styles.RightShiftedContainer>
                            <Styles.InfoPanel
                                title="Number of stocks displayed vs. total number"
                            >
                                Displayed: {stocksDisplayed} <br />
                                Total: {stocksCount}
                            </Styles.InfoPanel>
                        </Styles.RightShiftedContainer>
                    ),
                ]}
            />
        </Styles.Content>
    );
}

