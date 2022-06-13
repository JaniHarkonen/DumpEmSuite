import styled from "styled-components";
import ImageButton from "../../components/ImageButton/ImageButton";
import { getKey } from "../../utils/KeyManager";

export default function SideBar(props) {
    const options = props.options;

    const renderOptions = (opts) => {
        if( !opts ) return <></>;

        return options.map((opt) => {
            return(
                <OptionPanelContainer key={"side-bar-option-button" + getKey()}>
                    <ImageButton
                        tooltip={opt.tooltip}
                        image={opt.image}
                        onClick={opt.onClick}
                    />
                </OptionPanelContainer>
            );
        });
    };

    return(
        <Content>
            <OptionContainer>
                {renderOptions(options)}
            </OptionContainer>
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
    background-color: yellow;
`;

const OptionContainer = styled.div`
    position: relative;
    width: 90%;
    height: 100%;
`;

const OptionPanelContainer = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    margin-bottom: 1em;
`;
