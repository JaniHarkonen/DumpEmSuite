import React from "react";
import styled from "styled-components";
import { FullDiv } from "../../../common/FullDiv";
import SymbolList from "../components/SymbolList/SymbolList";

export default function ViewTa1(props) {

    return(
        <FullDiv>
            <SymbolList
                tab={props.tab}
                filters={props.tab.getFilters()}
                stocks={props.model.getStocks()}
            />
        </FullDiv>
    );
}
