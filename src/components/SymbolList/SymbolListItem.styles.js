import styled from "styled-components";

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

export const Styles = {
    Content: Content,
    Backdrop: Backdrop,
    InfoPanelContainer: InfoPanelContainer,
    InfoPanel: InfoPanel,
    InfoText: InfoText,
    OptionPanelContainer: OptionPanelContainer,
    OptionPanelWrapper: OptionPanelWrapper,
    OptionPanel: OptionPanel,
    ColorPickerButton: ColorPickerButton
};
