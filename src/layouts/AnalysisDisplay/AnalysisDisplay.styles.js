import styled from "styled-components";

const TopBarContainer = styled.div`
    position: relative;
    width: 100%;
    height: 32px;

    display: flex;
    align-items: flex-end;
`;

const AnalysisTabButton = styled.div`
    position: relative;
    width: 112px;
    height: 28px;

    display: inline-block;
    margin-right: 8px;
    vertical-align: top;

    background-color: white;
`;

const NoteContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 32px);
`;

export const Styles = {
    TopBarContainer: TopBarContainer,
    AnalysisTabButton: AnalysisTabButton,
    NoteContainer: NoteContainer
};
