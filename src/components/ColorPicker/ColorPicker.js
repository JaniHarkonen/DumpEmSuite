import styled from "styled-components";
import { getKey } from "../../utils/KeyManager";
import { COLOR_CODES, integerToRGBA } from "../../utils/CommonVariables";

export default function ColorPicker(props) {
    const colorOrder = null;
    const disableMultiSelection = props.disableMultiSelection;
    const picks = disableMultiSelection ? [props.selection[0]] : props.selection;
    const onPick = props.onPick;


    const addIfNotInArray = (item, arr) => {
        if( !arr ) return;
    
        if( arr.indexOf(item) >= 0 )
        return arr.filter((itm) => itm !== item);
        else
        return arr.concat(item);
    };

    const handleColorPick = (index) => {
        if( !disableMultiSelection )
        onPick(addIfNotInArray(index, picks));
        else
        onPick(index);
    };

    const renderColorPane = (color, index) => {
        return(
            <ColorPane
                key={"color-picker-color-pane-" + getKey()}
                style={{
                    backgroundColor: integerToRGBA(color),
                    borderStyle: picks.includes(index) ? "dashed" : "solid"
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleColorPick(index);
                }}
            />
        );
    };

    const renderColorPanes = () => {
        let result = [];

            // If a separate order has been decided -> use it
        if( colorOrder )
        {
            for( let i = 1; i < colorOrder.length; i++ )
            result.push(renderColorPane(COLOR_CODES[colorOrder[i]], colorOrder[i]));
        }
        else
        {
                // Otherwise, use the default order
            for( let i = 1; i < COLOR_CODES.length; i++ )
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
