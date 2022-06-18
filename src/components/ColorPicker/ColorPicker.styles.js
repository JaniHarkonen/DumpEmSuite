import styled from "styled-components";

const Content = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 5px;
`;

const ColorPane = styled.div`
    position: relative;
    flex: 1;

    border-style: solid;
    border-width: 1px;
    border-color: black;
`;

export const Styles = {
    Content: Content,
    ColorPane: ColorPane
};
