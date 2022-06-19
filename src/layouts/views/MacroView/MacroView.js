import Note from "../../../components/Note/Note";
import styled from "styled-components";
import ExternalStorageAPI from "../../../apis/ExternalStorageAPI";

export default function FilterView(props) {

    const handleMacroAnalysisUpdate = (updatedAnalysis) => {
        ExternalStorageAPI.updateMacroAnalysis(updatedAnalysis);
    };

    return (
        <Content>
            <NoteContainer>
                <Note
                    content={ExternalStorageAPI.getMacroAnalysis()}
                    updateContent={handleMacroAnalysisUpdate}
                />
            </NoteContainer>
        </Content>
    );
}

const Content = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const NoteContainer = styled.div`
    position: relative;
    width: 50%;
    height: 50%;
`;
