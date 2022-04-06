import React from "react";
import styled from "styled-components";
import { Content } from "../../../../common/Content";

export default function SymbolList_Item(props) {

    return(
        <Content>
            {props.data.name + " | " + props.data.ticker + " | " + props.data.volume}
        </Content>
    )
}