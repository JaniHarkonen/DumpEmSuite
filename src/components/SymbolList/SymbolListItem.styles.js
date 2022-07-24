import styled from "styled-components";

const Content = styled.div`
    position: absolute;
    left: 0px;
    top : 0px;
    width: 100%;
    height: 100%;

    background-color: white;

    border-width: 1px;
    border-radius: 12px;
    border-top-right-radius: 0px;

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

    border-radius: 12px;
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

const ColorPickerContainer = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ColorPickerAligner = styled.div`
    position: relative;
    width: auto;
    height: 75%;
    padding: 5px;

    border-radius: 8px;

    background-color: white;
`;

const ColorPickerButton = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    right: 0px;
    top: 0px;
    width: 90%;
    height: 50%;

    border-style: solid;
    border-width: 2px;

    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;

    &:hover {
        cursor: pointer;
    }
`;

const ChartButtonContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;

    justify-content: center;
    align-items: center;
`;

const ChartButton = styled.div`
    position: relative;
    width: 75%;
    height: 75%;

    &:hover {
        cursor: pointer;
        width: 85%;
        height: 85%;
    }
`;

export const Styles = {
    Content,
    Backdrop,
    InfoPanelContainer,
    InfoPanel,
    InfoText,
    OptionPanelContainer,
    OptionPanelWrapper,
    OptionPanel,
    ColorPickerContainer,
    ColorPickerAligner,
    ColorPickerButton,
    ChartButtonContainer,
    ChartButton,
};
