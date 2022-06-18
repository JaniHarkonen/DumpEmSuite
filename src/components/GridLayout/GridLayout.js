import styled from "styled-components";
import { FullDiv } from "../../common/FullDiv";
import { getKey } from "../../utils/KeyManager";

export default function GridLayout(props) {
    const dimensions = props.dimensions;
    const elements = props.elements;


    const renderContent = (content) => {
        if( !content ) return <></>;

        return content.map((element) => {
            return (
                <FullDiv
                    key={"grid-layout-element-" + getKey()}
                    style={{
                        gridColumn: element.position.x + " / " + (element.position.x + element.dimensions.width),
                        gridRow: element.position.y + " / " + (element.position.y + element.dimensions.height)
                    }}
                >
                    {element.element}
                </FullDiv>
            );
        });
    };
    
    return (
        <Layout style={{
            gridTemplateColumns: `repeat(${dimensions.width}, auto)`,
            gridTemplateRows: `repeat(${dimensions.height}, auto)`
        }}>
            {renderContent(elements)}
        </Layout>
    );
}

const Layout = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    display: grid;
`;
