import View, { makeViewElement } from "../View";
import SymbolListExternalWrapper from "./SymbolListExternalWrapper";

export default function FilterView(props) {
    const elements = [
        makeViewElement(
            { x: 1, y: 1 },
            { width: 1, height: 2 },
            <SymbolListExternalWrapper
                tab={props.tab}
                enalbeBring={!props.isFirstTab}
            />
        )
    ];

    return (
        <View elements={elements} />
    );
};
