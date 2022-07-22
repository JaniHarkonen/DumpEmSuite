import { FullDiv } from "../../common/FullDiv";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
import ExternalStorageAPI from "../../apis/ExternalStorageAPI";
import { COMMON_PATHS } from "../../utils/CommonVariables";

export default function Analysis(props) {
    const selectedSymbolID = props.selectedSymbolID;
    const targetDirectory = ExternalStorageAPI.getOpenWorkspaceDirectory() + COMMON_PATHS.folders.materialsSub + "\\" + selectedSymbolID + "\\";
    

    return (
        <FullDiv>
            {
                (selectedSymbolID >= 0) ?
                (<FileExplorer targetDirectory={targetDirectory} />)
                :
                (<>{"Please, select a symbol..."}</>)
            }
        </FullDiv>
    );
}
