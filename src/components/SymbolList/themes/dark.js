import styled from "styled-components";
import { UIstyle } from "../../../assets/assets";

const FilterContainer_height = "128px";

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    overflow: hidden;

    border-right-style: ${UIstyle.majorBorder.style};
    border-right-width: ${UIstyle.majorBorder.width};
    border-right-color: ${UIstyle.majorBorder.dark.color};
`;

const ListAlignWrapper = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - ${FilterContainer_height});

    background-color: ${UIstyle.colorScheme.dark.backgroundDistant};

    display: flex;
    justify-content: center;
`;

const ScrollableList = styled.div`
    position: absolute;
    top: 5px;
    width: 90%;
    max-width: 500px;
    height: calc(100% - 5px);

    overflow-x: hidden;
    overflow-y: auto;
`;

const ListContainer = styled.div`
    position: relative;
    width: calc(100% - 10px);
    padding: 5px;
    height: auto;

    background-color: ${UIstyle.colorScheme.dark.background};
`;

const SymbolContainer = styled.div`
    position: relative;
    width: 100%;
    height: 128px;

    margin-bottom: 4px;
`;

const FilterContainer = styled.div`
    position: relative;
    width: 100%;
    height: ${FilterContainer_height};

    border-bottom-style: ${UIstyle.majorBorder.style};
    border-bottom-width: ${UIstyle.majorBorder.width};
    border-bottom-color: ${UIstyle.majorBorder.dark.color};
`;

export const dark = {
    Content: Content,
    ListAlignWrapper: ListAlignWrapper,
    ScrollableList: ScrollableList,
    ListContainer: ListContainer,
    SymbolContainer: SymbolContainer,
    FilterContainer: FilterContainer
};
