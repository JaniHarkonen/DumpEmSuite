import ColorPicker from "../ColorPicker/ColorPicker";

import { useState } from "react";
import { FullImage } from "../../common/FullImage";
import { integerToRGBA, getColorCode } from "../../utils/CommonVariables";
import { getKey } from "../../utils/KeyManager";
import { images } from "../../assets/assets";
import { Styles } from "./SymbolListItem.styles";

/**
 * This function is used by SymbolListItem only, but is hoisted due to
 * being used in the useState initialization.
 * 
 * Creates a color JSON containing the index as well as the RRRGGGBBB-
 * integer representation of the color.
 * @param {integer} index Color index.
 * @returns JSON containing the color index and RRRGGGBBB-integer.
 */
const makeColor = (index) => {
    return {
        index: index,
        color: getColorCode(index)
    };
};

/**
 * Returns a JSON representing an option panel which can then be passed onto
 * the renderOptionPanel-function.
 * 
 * @param {JSX} element A JSX-element that will draw the option panel.
 * @param {Boolean} condition Condition under which the element will be drawn
 * in the UI.
 * 
 * @returns A JSON with a structure of an option panel.
 */
const makeOptionPanel = (element, condition) => {
    return {
        element: element,
        condition: condition
    };
};


export default function SymbolListItem(props) {
    const symbol = props.stock;
    const symbolStockID = symbol.id;
    const symbolName = symbol.name;
    const symbolTicker = symbol.ticker;
    const symbolVolume = symbol.volume;
    const symbolColorIndex = symbol.colorCode;
    const onColorCodeChange = props.onColorCodeChange;
    const onItemClick = props.onItemClick;
    const disableColorPicker = props.disableColorPicker;
    const disableChart = props.disableChart;
    const isSelected = props.isSelected || false;

    const highlightIntensityDefault = 1/4;
    const highlightIntensitySelected = 1/2;

    const [ symbolColorCode, setSymbolColorCode ] = useState(makeColor(symbolColorIndex));
    const [ isColorPickerOpen, openColorPicker ] = useState(false);

    
    const handleListingClick = (e) => {
        e.stopPropagation();

        if( onItemClick )
        onItemClick(symbol);
    }

    const renderInfoPanel = (info) => {
        if( !info ) return <></>;

        return (
            <Styles.InfoPanel>
                <Styles.InfoText>{ info }</Styles.InfoText>
            </Styles.InfoPanel>
        );
    };

    const renderOptionPanel = (content, condition) => {
        return (
            <Styles.OptionPanel key={"symbol-list-item-" + getKey()}>
                {condition && content}
            </Styles.OptionPanel>
        );
    };

    const renderOptionPanels = (options) => {
        if( !options ) return <></>;

        return optionPanels.map((op) => {
            return renderOptionPanel(op.element, op.condition);
        });
    };

    const handleChartClick = (e) => {
        e.stopPropagation();

        window.require("electron")
        .shell.openExternal(
            "https://www.tradingview.com/chart/?symbol=OMXHEX%3A" +
            symbolTicker
        );
    };

    const handleColorCodeChange = (newcol) => {
        onColorCodeChange(symbolStockID, newcol);
        setSymbolColorCode(makeColor(newcol));
        openColorPicker(false);
    };

    const currencyVolumeToString = (currencyVolume) => {
        let volumeString = currencyVolume.toFixed(2);
        let formattedString = "";

        const s = volumeString.length;
        const cutoff = s - 5;
        const separation = 3;
        for( let i = 0; i < s; i++ )
        {
            const char = volumeString.charAt(i);
            formattedString += char;

                // Only add commas to the characteristic
            if( i > cutoff )
            continue;

                // Add a comma every 3 digits
            if( (s - separation - i - 1) % 3 === 0 )
            formattedString += ",";
        }

        return "€" + formattedString;
    };

    const optionPanels = [
        makeOptionPanel(
            <Styles.ColorPickerButton 
                style={{
                    backgroundColor: (symbolColorCode.color === -1) ? "gray" : integerToRGBA(symbolColorCode.color)
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    openColorPicker(true);
                }}
            />, !disableColorPicker
        ),

        makeOptionPanel(<></>, false),

        makeOptionPanel(
            <Styles.ChartButtonContainer>
                <Styles.ChartButton>
                    <FullImage
                        src={images.chart}
                        onClick={handleChartClick}
                    />
                </Styles.ChartButton>
            </Styles.ChartButtonContainer>,
            !disableChart
        )
    ];

    return (
        <Styles.Content style={{
            borderStyle: isSelected ? "dashed" : "none"
        }}>
            <Styles.Backdrop style={{
                backgroundColor: integerToRGBA(symbolColorCode.color, isSelected ? highlightIntensitySelected : highlightIntensityDefault)
            }} />
            {
                isColorPickerOpen === true ? 
                (
                    <Styles.ColorPickerContainer>
                        <Styles.ColorPickerAligner>
                            <ColorPicker
                                selection={[symbolColorCode.index]}
                                onPick={handleColorCodeChange}
                                disableMultiSelection={true}
                            />
                        </Styles.ColorPickerAligner>
                    </Styles.ColorPickerContainer>
                )
                :
                <>
                    <Styles.InfoPanelContainer onClick={handleListingClick} >

                        {renderInfoPanel(symbolName)}
                        {renderInfoPanel(symbolTicker)}
                        {renderInfoPanel(currencyVolumeToString(symbolVolume))}

                    </Styles.InfoPanelContainer>

                    <Styles.OptionPanelContainer>
                        <Styles.OptionPanelWrapper>
                            {renderOptionPanels(optionPanels)}
                        </Styles.OptionPanelWrapper>
                    </Styles.OptionPanelContainer>
                </>
            }
        </Styles.Content>
    );
}
