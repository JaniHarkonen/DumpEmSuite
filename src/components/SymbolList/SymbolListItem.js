import { useState } from "react";
import { FullImage } from "../../common/FullImage";
import ColorPicker from "../ColorPicker/ColorPicker";
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
            "https://www.tradingview.com/chart/?symbol=" +
            symbolTicker
        );
    };

    const handleColorCodeChange = (newcol) => {
        onColorCodeChange(symbolStockID, newcol);
        setSymbolColorCode(makeColor(newcol));
        openColorPicker(false);
    };


    const optionPanels = [
        makeOptionPanel(
            <Styles.ColorPickerButton 
                style={{
                    backgroundColor: integerToRGBA(symbolColorCode.color)
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    openColorPicker(true);
                }}
            />, !disableColorPicker
        ),

        makeOptionPanel(<></>, false),

        makeOptionPanel(
            <FullImage
                src={images.chart}
                onClick={handleChartClick}
            />, !disableChart
        )
    ];

    return (
        <Styles.Content>
            <Styles.Backdrop style={{
                backgroundColor: integerToRGBA(symbolColorCode.color, 4/9)
            }} />
            {
                isColorPickerOpen === true ? 
                (
                    <ColorPicker 
                        selection={[symbolColorCode.index]}
                        onPick={handleColorCodeChange}
                        disableMultiSelection={true}
                    />
                )
                :
                <>
                    <Styles.InfoPanelContainer onClick={handleListingClick} >

                        {renderInfoPanel(symbolName)}
                        {renderInfoPanel(symbolTicker)}
                        {renderInfoPanel(symbolVolume)}

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
