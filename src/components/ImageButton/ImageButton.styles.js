import styled from "styled-components";

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImageContainer = styled.div`
    position: relative;
    width: 90%;
    height: 90%;
`;

export const Styles = {
    Content: Content,
    ImageContainer: ImageContainer
};
