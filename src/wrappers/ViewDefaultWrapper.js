import SymbolListExternalWrapper from "./SymbolListExternalWrapper";
import View from "../layouts/View/View";

export default function ViewDefaultWrapper(props) {
    const tab = props.tab;
    const first = props.first;

    return(
        <View
            firstHalf={{
                element: SymbolListExternalWrapper,
                context: {
                    tab: tab,
                    enableBring: !first
                }
            }}
        />
    );
};
