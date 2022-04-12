import { tab } from "@testing-library/user-event/dist/tab";
import React from "react";
import { FullDiv } from "../../../common/FullDiv";
import WorkspaceModel from "../../../utils/model/WorkspaceModel";
import SymbolList from "../components/SymbolList/SymbolList";

export default function ViewVolume(props) {

    return(
        <FullDiv>
            <SymbolList
                tab={props.tab}
                filters={props.tab.getFilters()}
                stocks={props.stocks}
            />
        </FullDiv>
    );
}
