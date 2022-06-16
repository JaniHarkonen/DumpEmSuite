import { useState } from "react";
import styled from "styled-components";
import { FullImage } from "../../common/FullImage";
import ColorPicker from "../ColorPicker/ColorPicker";
import { integerToRGBA, getColorCode } from "../../utils/CommonVariables";
import { getKey } from "../../utils/KeyManager";
import { images } from "../../assets/assets";

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

        return(
            <InfoPanel>
                <InfoText>{ info }</InfoText>
            </InfoPanel>
        );
    };

    const renderOptionPanel = (content, condition) => {
        return(
            <OptionPanel key={"symbol-list-item-" + getKey()}>
                {condition && content}
            </OptionPanel>
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
            <ColorPickerButton 
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

    return(
        <Content>
            <Backdrop style={{
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
                    <InfoPanelContainer onClick={handleListingClick} >

                        {renderInfoPanel(symbolName)}
                        {renderInfoPanel(symbolTicker)}
                        {renderInfoPanel(symbolVolume)}

                    </InfoPanelContainer>

                    <OptionPanelContainer>
                        <OptionPanelWrapper>
                        {renderOptionPanels(optionPanels)}
                        </OptionPanelWrapper>
                    </OptionPanelContainer>
                </>
            }
        </Content>
    );
}

const Content = styled.div`
    position: absolute;
    left: 0px;
    top : 0px;
    width: 100%;
    height: 100%;

    background-color: white;

    border-style: solid;
    border-width: 1px;
    border-color: #626270;

    &:hover {
        opacity: 0.8;
    }
`;

const Backdrop = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    background-color: white;
`;

const InfoPanelContainer = styled.div`
    position: relative;
    width: 85%;
    height: 100%;
    font-size: 0;

    display: inline-block;
`;

const InfoPanel = styled.div`
    position: relative;
    width: 50%;
    height: 50%;

    display: inline-block;
`;

const InfoText = styled.div`
    position: absolute;
    display: flex;
    align-items: center;

    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    font-size: 16px;
`;

const OptionPanelContainer = styled.div`
    position: relative;
    width: 15%;
    height: 100%;

    display: inline-block;
`;

const OptionPanelWrapper = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

const OptionPanel = styled.div`
    position: relative;
    width: 100%;
    height: 33%;
`;

const ColorPickerButton = styled.div`
    position: relative;
    left: -1px;
    top: -1px;
    width: 100%;
    height: 100%;

    border-style: solid;
    border-width: 1px;
`;
