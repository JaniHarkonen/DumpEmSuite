import styled from "styled-components";

const Content = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    display: flex;
    flex-wrap: wrap;
    gap: 2px;
`;

const ColorPane = styled.div`
    position: relative;
    flex: 0 0 auto;
    
    height: calc(50% - 5px);
    aspect-ratio: 1 / 1;

    border-style: solid;
    border-width: 2px;
    border-radius: 4px;
    border-color: black;

    &:hover {
        cursor: pointer;
    }
`;

export const Styles = {
    Content: Content,
    ColorPane: ColorPane
};
