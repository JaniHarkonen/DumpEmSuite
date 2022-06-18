import styled from "styled-components";

const Content = styled.div`
position: relative;
width: 128px;
height: 32px;

border-style: solid;
border-width: 1px;
border-radius: 8px;
`;

const LoadFileIconPanel = styled.div`
position: relative;
width: 25%;
height: 100%;

display: inline-block;
`;

const LoadFileCaptionPanel = styled.div`
position: relative;
width: 75%;
height: 100%;

display: inline-block;
vertical-align: top;    // This line prevents the div within (shown below) from "falling" when text is added
`;

const LoadFileButtonCaptionContainer = styled.div`
position: relative;
width: 100%;
height: 100%;

display: flex;
align-items: center;
justify-content: center;
`;

const LoadFileInput = styled.input`
position: absolute;
left: 0px;
top: 0px;
width: 100%;
height: 100%;
opacity: 0.0;
`;

export const Styles = {
    Content: Content,
    LoadFileIconPanel: LoadFileIconPanel,
    LoadFileCaptionPanel: LoadFileCaptionPanel,
    LoadFileButtonCaptionContainer: LoadFileButtonCaptionContainer,
    LoadFileInput: LoadFileInput
};
