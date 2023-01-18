import styled from "styled-components";
import { UIstyle } from "../../../assets/assets";


const FileLoadButtonContainer = styled.div`
    position: relative;
    width: 128px;
    height: 32px;
    margin-bottom: 3px;
`;

const OpenExplorerButtonContainer = styled.div`
    position: relative;
    width: 168px;
    height: 32px;
`;

const ControlPanel = styled.div`
    position: relative;
    width: 100%;
    height: 68px;
`;

const MaterialsContainer = styled.div`
    position: relative;
    top: 5px;
    width: 100%;
    height: calc(100% - 68px - ${UIstyle.majorBorder.width} - 5px);

    overflow-y: hidden;
`;

const MaterialsAligner = styled.div`
    position: absolute;
    left: 16px;
    top: 0px;
    right: 16px;
    height: 100%;

    background-color: ${UIstyle.colorScheme.light.backgroundDistant};

    overflow-y: auto;
`;

const MaterialsGrid = styled.div`
    position: relative;
    left: 5px;
    top: 5px;
    width: calc(100% - 5px);

    padding-bottom: 5px;

    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`;

const FileItemContainer = styled.div`
    position: relative;
    width: 128px;
    aspect-ratio: 1 / 1;

    flex: 0 0 auto;

    background-color: white;

    border-radius: 8px;
`;

export const light = {
    FileLoadButtonContainer,
    OpenExplorerButtonContainer,
    ControlPanel,
    MaterialsContainer,
    MaterialsAligner,
    MaterialsGrid,
    FileItemContainer
};
