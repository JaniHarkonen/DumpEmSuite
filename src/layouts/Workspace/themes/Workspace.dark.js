import styled from "styled-components";
import { UIstyle } from "../../../assets/assets";

const Content = styled.div`
    position: absolute;
    left: 0px;
    top : 0px;
    width: 100%;
    height: 100%;

    background-color: ${UIstyle.colorScheme.dark.backgroundDistant};
`;

const TabBarContainer = styled.div`
    position: relative;
    width: 100%;
    min-width: 708px;
    height: 26px;

    background-color: ${UIstyle.colorScheme.dark.backgroundDistant};
    
    border-bottom-style: ${UIstyle.majorBorder.style};
    border-bottom-width: ${UIstyle.majorBorder.width};
    border-bottom-color: ${UIstyle.majorBorder.dark.color};
`;

const WSTab_highLightColor = UIstyle.colorScheme.dark.background;

const WSTab = styled.div`
    position: relative;
    display: inline-block;
    width: 126px;
    height: 100%;
    margin-right: 4px;

    background-color: ${UIstyle.colorScheme.dark.distinct};

    border-left-style: dashed;
    border-top-left-radius: 5px;
    border-left-width: 1px;
    border-left-color: ${UIstyle.colorScheme.dark.backgroundDistant};

    border-right-style: dashed;
    border-top-right-radius: 5px;
    border-right-width: 1px;
    border-right-color: ${UIstyle.colorScheme.dark.backgroundDistant};

    color: white;

    &:hover {
        cursor: pointer;
        background-color: ${UIstyle.colorScheme.dark.distinct};
    }
`;

const WSTabContent = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 2px);

    display: flex;
    align-items: center;
`;

const ViewContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 1280px;
    height: calc(100% - 32px + ${UIstyle.majorBorder.width});
`;

export const dark = {
    Content,
    TabBarContainer,
    WSTab,
    WSTabContent,
    ViewContainer,

    WSTab_highLightColor
};
