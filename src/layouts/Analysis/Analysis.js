import { FullDiv } from "../../common/FullDiv";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
import styled from "styled-components";
import AnalysisDisplay from "../AnalysisDisplay/AnalysisDisplay";
import ExternalStorageAPI from "../../apis/ExternalStorageAPI";
import { MATERIALS_SUBPATH } from "../../utils/CommonVariables";

export default function Analysis(props) {
    const selectedSymbol = props.context.selectedSymbol;
    const selectedSymbolID = (selectedSymbol) ? selectedSymbol.id : -1;
    const targetDirectory = ExternalStorageAPI.getOpenWorkspaceDirectory() + MATERIALS_SUBPATH + selectedSymbolID + "\\";

    const handleAnalysisUpdate = (atype, updatedText) => {
        ExternalStorageAPI.updateAnalysisOfStock(selectedSymbolID, atype, updatedText);
    };

    return(
        <FullDiv>
            {
                (selectedSymbolID >= 0) ?
                (<>
                    <VerticalHalf>
                        <FileExplorer targetDirectory={targetDirectory} />
                    </VerticalHalf>
                    
                    <VerticalHalf>
                        <AnalysisDisplay
                            onAnalysisUpdate={handleAnalysisUpdate}
                            fetchAnalysis={(atype) => {
                                return ExternalStorageAPI.getAnalysisOfStock(selectedSymbolID, atype).analysis;
                            }}
                        />
                    </VerticalHalf>
                </>)
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
