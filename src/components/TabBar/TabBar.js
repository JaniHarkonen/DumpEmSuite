import { FullDiv } from "../../common/FullDiv";
import { FullImage } from "../../common/FullImage";
import { getKey } from "../../utils/KeyManager";

/**
 * Takes an array of JSONs that represent tabs that are, however, not
 * compatible with the tab JSON-structure used by the TabBar, and extracts
 * and their relevant pieces of information into an array of tabs whose
 * structure *is* compatible.
 * 
 * A JSON containing the field translations pairs the fields of a typical
 * tab JSON with their equivalents found in the JSONs passed in the array.
 * 
 * @param {Array} array An array containing the JSONs that should be used to
 * form the tabs.
 * 
 * @param {JSON} fieldTranslations A JSON pairing the fields of a typical
 * tab JSON with their equivalents found in the JSONs in the array.
 * 
 * @returns Returns an array of valid tabs based on the given array that may
 * be passed onto the TabBar to render tabs.
 */
export const extractTabsFromArray = (array, fieldTranslations) => {
    if( !array || !fieldTranslations ) return [];

    return array.map((proposedTab) => {
        if( !proposedTab ) return null;

        const title = proposedTab[fieldTranslations.titleAs];
        const allowClose = proposedTab[fieldTranslations.allowCloseAs];
        return {
            title: title || "",
            allowClose: allowClose || null
        };
    });
};


export default function ViewTabBar(props) {
    const keyFixes = props.keyFixes;
    const TabElement = props.tabElement;
    const TabElementContentWrapper = props.tabElementContentWrapper;
    const tabs = props.tabs;
    const activeTabIndex = props.activeTabIndex;
    const onTabClick = props.onTabClick;
    const activeStyle = props.activeStyle;
    const CloseButton = props.closeButton;
    const closeButtonIcon = props.closeButtonIcon;
    const onClose = props.onClose || function() { };
    const allowCloseByDefault = props.allowCloseByDefault || false;


    const handleTabClick = (index) => {
        if( index < 0 ) return;

        onTabClick(index);
    };

    const renderTabs = (tablist, activeIndex) => {
        if( !tablist ) return <></>;

        return tablist.map((tab, index) => {
            const isActive = (activeIndex === index);

                // If allowClose is set on a tab, it will override the default allowClose
            const overrideDefault = tab.allowClose && (tab.allowClose !== allowCloseByDefault);
            const allowClose = overrideDefault ? tab.allowClose : allowCloseByDefault;

            const keySuffix = keyFixes.suffix ? "-" + keyFixes.suffix : "";
            const key = keyFixes.prefix + "-" + getKey() + keySuffix;

            return (
                <TabElement
                    key={key}
                    onClick={() => {
                        handleTabClick(index);
                    }}

                    style={isActive ? activeStyle : {}}
                    title={tab.title}
                >

                    {
                        TabElementContentWrapper ?
                        <TabElementContentWrapper>
                            {tab.title}
                        </TabElementContentWrapper>
                        :
                        tab.title
                    }

                    {
                        allowClose &&
                        (<CloseButton
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose(index);
                            }}
                        >
                            {closeButtonIcon && <FullImage src={closeButtonIcon} />}
                        </CloseButton>)
                    }
                </TabElement>
            );
        });
    };

    return ( 
        <FullDiv>
            {renderTabs(tabs, activeTabIndex)}
        </FullDiv>
    );
}
