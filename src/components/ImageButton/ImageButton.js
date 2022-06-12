import styled from "styled-components";
import { FullImage } from "../../common/FullImage";

export default function ImageButton(props) {
    const tooltip = props.tooltip;
    const image = props.image;
    const onClick = props.onClick;

    return(
        <Content
            title={tooltip}
            onClick={onClick}
        >
            <ImageContainer>
                <FullImage src={image} />
            </ImageContainer>
        </Content>
    );
};

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
