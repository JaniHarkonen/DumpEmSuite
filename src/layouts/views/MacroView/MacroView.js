import Note from "../../../components/Note/Note";
import ExternalStorageAPI from "../../../apis/ExternalStorageAPI";
import { Styles } from "./MacroView.styles";

export default function FilterView() {

    const handleMacroAnalysisUpdate = (updatedAnalysis) => {
        ExternalStorageAPI.updateMacroAnalysis(updatedAnalysis);
    };

    return (
        <Styles.Content>
            <Styles.NoteContainer>
                <Note
                    content={ExternalStorageAPI.getMacroAnalysis()}
                    updateContent={handleMacroAnalysisUpdate}
                />
            </Styles.NoteContainer>
        </Styles.Content>
    );
}
