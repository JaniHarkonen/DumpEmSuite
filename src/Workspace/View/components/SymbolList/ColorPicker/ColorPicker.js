import React from "react";
import styled from "styled-components";
import { getKey } from "../../../../../utils/KeyManager";
import { COLOR_CODES } from "../../../../../utils/CommonVariables";

export default function ColorPicker(props) {
    const colorOrder = null;
    const picks = props.selection;

    const addIfNotInArray = (item, arr) => {
        if( !arr ) return;

        if( arr.indexOf(item) >= 0 )
        return arr.filter((itm) => itm !== item)
        else
        return arr.concat(item);
    };

    const handleColorPick = (index) => {
        props.onPick(addIfNotInArray(index, picks));
    };

    const renderColorPane = (color, index) => {
        if( !color ) return <></>;

        return(
            <ColorPane
                key={getKey()}
                style={{
                    backgroundColor: color,
                    borderStyle: picks.includes(index) ? "dashed" : "solid"
                }}
                onClick={() => {
                    handleColorPick(index)
                }}
            />
        );
    };

    const renderColorPanes = () => {
        let result = [];

            // If a separate order has been decided -> use it
        if( colorOrder )
        {
            for( let i = 0; i < colorOrder.length; i++ )
            result.push(renderColorPane(COLOR_CODES[colorOrder[i]], colorOrder[i]));
        }
        else
        {
                // Otherwise, use the default order
            for( let i = 0; i < COLOR_CODES.length; i++ )
            result.push(renderColorPane(COLOR_CODES[i], i));
        }

        return result;
    };

    return(
        <Content>
            {renderColorPanes()}
        </Content>
    );
}

const Content = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 5px;
`;

const ColorPane = styled.div`
    position: relative;
    flex: 1;

    border-style: solid;
    border-width: 1px;
    border-color: black;
`;