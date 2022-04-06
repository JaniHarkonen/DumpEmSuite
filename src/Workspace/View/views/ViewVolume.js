import React from "react";
import styled from "styled-components";
import { Content } from "../../../common/Content";
import SymbolList from "../components/SymbolList/SymbolList";
import TESTSYMBOLS from "./TESTSYMBOLS.json";

export default function ViewVolume() {


    return(
        <Content>
            <SymbolList symbols={TESTSYMBOLS.symbols} />
        </Content>
    );
}
