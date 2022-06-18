import { useState, useEffect } from "react";
import TabBar from "../../components/TabBar/TabBar";
import FilterView from "../views/FilterView/FilterView";
import { getKey } from "../../utils/KeyManager";
import FundamentalView from "../views/FundamentalView/FundamentalView";
import { Styles } from "./Workspace.styles";

export default function Workspace(props) {
    const DEBUG_TABS = [
        { title: "Volume" },
        { title: "Price action" },
        { title: "TA #1" },
        { title: "Fundamental" }
    ];

    const [activeTabIndex, openTab] = useState(1);


    useEffect(() => {
        openTab(1);
    }, [props.activeWorkspace]);

    const handleTabClick = (tab) => {
        openTab(tab + 1);
    };

    const renderActiveView = (isFirstTab = false) => {
        let tab = activeTabIndex;

        if( tab === 4 )
        {
            return (
                <FundamentalView
                    tab={tab}
                />
            );
        }

        return (
            <FilterView
                key={"workspace-view-" + getKey()}
                tab={tab}
                isFirstTab={isFirstTab}
            />
        );
    };

    return (
        <Styles.Content>
            <Styles.TabBarContainer>
                <TabBar
                    keyFixes={{ prefix: "workspace-view-tab" }}
                    tabElement={Styles.WSTab}
                    tabs={DEBUG_TABS}
                    activeTabIndex={activeTabIndex - 1}
                    onTabClick={handleTabClick}
                    activeStyle={{
                        backgroundColor: "#BCBCBC"
                    }}
                />
            </Styles.TabBarContainer>

            <Styles.ViewContainer>
                {renderActiveView(activeTabIndex === 1)}
            </Styles.ViewContainer>
        </Styles.Content>
    );
}
