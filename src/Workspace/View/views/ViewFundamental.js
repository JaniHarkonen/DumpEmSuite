import React from "react";
import styled from "styled-components";
import { Content } from "../../../common/Content";
import SymbolList from "../components/SymbolList/SymbolList";
import FileExplorer from "../components/FileExplorer/FileExplorer";

export default function ViewFundamental() {

    return(
        <Content>
            <FileExplorer />
        </Content>
    );
}