import React, { useState } from "react";
import styled from "styled-components";
import { FullImage } from "../../../../common/FullImage";
import ColorPicker from "./ColorPicker/ColorPicker";
import imgChart from "../../../../assets/img_chart.svg";

export default function SymbolListItem(props) {
    const [ isColorPickerOpen, openColorPicker ] = useState(false);

    const COLOR_OPTIONS = [
        "red",
        "green",
        "blue",
        "orange",
        "#0094FF",
        "#C0C0E5"
    ];

    const selectColor = (cindex) => {
        props.stock.changeColorCode(props.tabId, cindex);
        openColorPicker(false);
    };

    const handleListingClick = () => {
        if( props.itemClickHook )
        props.itemClickHook(props.stock);
    }

    const renderInfoPanel = (info) => {
        if( !info ) return <></>;

        return(
            <InfoPanel>
                <InfoText>{ info }</InfoText>
            </InfoPanel>
        );
    };

    const handleChartClick = () => {
        window.require("electron")
        .shell.openExternal(
            "https://www.tradingview.com/chart/?symbol=" +
            props.stock.ticker
        );
    };

    return(
        <Content>
            {
                isColorPickerOpen === true ? 
                (
                    <ColorPicker colorSelectionHook={(cindex) => { selectColor(cindex); }} />
                )
                :
                <>
                    <InfoPanelContainer onClick={handleListingClick} >

                        {renderInfoPanel(props.stock.getName())}
                        {renderInfoPanel(props.stock.getTicker())}
                        {renderInfoPanel(props.stock.getVolume())}

                    </InfoPanelContainer>

                    <OptionPanelContainer>
                        <OptionPanelWrapper>

                            {
                                !props.disableColorPicker &&
                                (
                                    <OptionPanel>
                                        <ColorPickerButton 
                                            style={{
                                                backgroundColor: COLOR_OPTIONS[props.stock.getColorCode(props.tabId)]
                                            }}
                                            onClick={() => { openColorPicker(true); }}
                                        />
                                    </OptionPanel>
                                )
                            }

                            <OptionPanel></OptionPanel>

                            {
                                !props.disableChart &&
                                (
                                    <OptionPanel>
                                        <FullImage
                                            src={imgChart}
                                            onClick={handleChartClick}
                                        />
                                    </OptionPanel>
                                )
                            }

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

    background-color: #CCCCE8;

    border-style: solid;
    border-width: 1px;
    border-color: #626270;

    &:hover {
        opacity: 0.8;
    }
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