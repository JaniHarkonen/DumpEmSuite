import React from "react";
import styled from "styled-components";
import { Content } from "../../../../common/Content";
import SymbolList_Item from "./SymbolList_Item";
import { getKey } from "../../../../utils/KeyManager";

export default function SymbolList(props) {


    /**
     * Creates an array of React-components based on the list of symbols given.
     * @param {*} symbols Array containing the symbols to be rendered.
     * @returns An array of React-components representing the symbol list.
     */
    const renderSymbols = (syms) => {
        if( !syms ) return <></>;

        return syms.map((sym) => {
            return(
                <SymbolContainer key={"symbol-" + getKey()}>
                    <SymbolList_Item data={sym} />
                </SymbolContainer>
            );
        });
    }

    return(
        <Content>
            {renderSymbols(props.symbols)}
        </Content>
    )
}

const SymbolContainer = styled.div`
    position: relative;
    width: 33%;
    height: 128px;
`;