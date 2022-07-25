import FileExplorer from "../../components/FileExplorer/FileExplorer";
import ExternalStorageAPI from "../../apis/ExternalStorageAPI";

import { Styles } from "./Analysis.styles";
import { COMMON_PATHS } from "../../utils/CommonVariables";

export default function Analysis(props) {
    const selectedSymbolID = props.selectedSymbolID;
    const targetDirectory = ExternalStorageAPI.getOpenWorkspaceDirectory() + COMMON_PATHS.folders.materialsSub + "\\" + selectedSymbolID + "\\";
    

    return (
        <Styles.Content>
            {
                (selectedSymbolID >= 0) ?
                (
                    <>
                        <Styles.CaptionBar
                            title="External files providing material for the analysis"
                        >
                            <Styles.CaptionAligner>Research materials</Styles.CaptionAligner>
                        </Styles.CaptionBar>

                        <Styles.FileExplorerContainer>
                            <FileExplorer targetDirectory={targetDirectory} />
                        </Styles.FileExplorerContainer>
                    </>
                )
                :
                (<>{"Please, select a symbol..."}</>)
            }
        </Styles.Content>
    );
}
