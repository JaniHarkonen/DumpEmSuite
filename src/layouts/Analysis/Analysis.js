import { FullDiv } from "../../common/FullDiv";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
import ExternalStorageAPI from "../../apis/ExternalStorageAPI";
import { MATERIALS_SUBPATH } from "../../utils/CommonVariables";

export default function Analysis(props) {
    const selectedSymbolID = props.selectedSymbolID;
    const targetDirectory = ExternalStorageAPI.getOpenWorkspaceDirectory() + MATERIALS_SUBPATH + selectedSymbolID + "\\";
    

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
