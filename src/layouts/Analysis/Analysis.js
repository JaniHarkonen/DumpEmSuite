import { FullDiv } from "../../common/FullDiv";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
import styled from "styled-components";
import ExternalStorageAPI from "../../apis/ExternalStorageAPI";
import { MATERIALS_SUBPATH } from "../../utils/CommonVariables";

export default function Analysis(props) {
    const selectedSymbolID = props.selectedSymbolID;
    const targetDirectory = ExternalStorageAPI.getOpenWorkspaceDirectory() + MATERIALS_SUBPATH + selectedSymbolID + "\\";
    

    return(
        <FullDiv>
            {
                (selectedSymbolID >= 0) ?
                (<VerticalHalf>
                    <FileExplorer targetDirectory={targetDirectory} />
                </VerticalHalf>)
                :
                (<>{"Please, select a symbol..."}</>)
            }
        </FullDiv>
    );
};

const VerticalHalf = styled.div`
    position: relative;
    width: 100%;
    height: 50%;
`;
