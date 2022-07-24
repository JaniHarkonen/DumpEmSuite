import styled from "styled-components";

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

const RightShiftedContainer = styled.div`
    position: absolute;
    left: 4px;
    width: calc(100% - 8px);
    height: 100%;
`;

const ColorPickerContainer = styled.div`
    position: absolute;
    padding-left: 4px;
    width: 100%;
    height: 100%;
`;

const FilterCaptionText = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    font-size: 15px;
    font-weight: bold;
`;

const InfoPanel = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    font-size: 14px;
    font-weight: bold;
`;

export const Styles = {
    Content,
    ColorPickerContainer,
    FilterCaptionText,
    RightShiftedContainer,
    InfoPanel
};
