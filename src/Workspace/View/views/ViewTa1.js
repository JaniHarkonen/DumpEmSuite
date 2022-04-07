import React from "react";
import styled from "styled-components";
import { Content } from "../../../common/Content";
import SymbolList from "../components/SymbolList/SymbolList";

export default function ViewTa1(props) {

    return(
        <Content>
            <SymbolList
                symbols={props.data.symbols}
                model  ={props.model}
            />
        </Content>
    );
}
