import { getKey } from "../../utils/KeyManager";
import { COLOR_CODES, integerToRGBA } from "../../utils/CommonVariables";
import { Styles } from "./ColorPicker.styles";


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
        return (
            <Styles.ColorPane
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

    return (
        <Styles.Content>
            {renderColorPanes()}
        </Styles.Content>
    );
}
