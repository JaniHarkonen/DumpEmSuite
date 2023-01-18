import TabBar from "../../components/TabBar/TabBar";
import FilterView from "../views/FilterView/FilterView";
import FundamentalView from "../views/FundamentalView/FundamentalView";
import MacroView from "../views/MacroView/MacroView";

import { useState, useEffect, useContext } from "react";
import { getKey } from "../../utils/KeyManager";
import WorkspaceStyles from "./Workspace.styles";
import { ThemeContext } from "../../contexts/ThemeContext";
import Config from "../../apis/Config";


export default function Workspace(props) {
    const TABS = [
        { title: "Volume" },
        { title: "Price action" },
        { title: "TA #1" },
        { title: "Fundamental" },
        { title: "MACRO" }
    ];

    const [activeTabIndex, openTab] = useState(1);
    
    const { theme } = useContext(ThemeContext);
    const Styles = WorkspaceStyles[theme];


    useEffect(() => {
        openTab(Config.getOpenWorkspaceTab());
    }, [props.activeWorkspace]);

    const handleTabClick = (tab) => {
        Config.changeWorkspaceTab(tab + 1);
        openTab(tab + 1);
    };

    const renderActiveView = (isFirstTab = false) => {
        let tab = activeTabIndex;

        switch( TABS[tab-1].title )
        {
            case "Fundamental":
            {
                return (
                    <FundamentalView
                        tab={tab}
                    />
                );
            }

            case "MACRO":
            {
                return <MacroView />;
            }
            
            default:
            {
                return (
                    <FilterView
                        key={"workspace-view-" + getKey()}
                        tab={tab}
                        isFirstTab={isFirstTab}
                    />
                );
            }
        }
    };

    return (
        <Styles.Content>
            <Styles.TabBarContainer>
                <TabBar
                    keyFixes={{ prefix: "workspace-view-tab" }}
                    tabElement={Styles.WSTab}
                    tabElementContentWrapper={Styles.WSTabContent}
                    tabs={TABS}
                    activeTabIndex={activeTabIndex - 1}
                    onTabClick={handleTabClick}
                    activeStyle={{
                        backgroundColor: Styles.WSTab_highLightColor
                    }}
                />
            </Styles.TabBarContainer>

            <Styles.ViewContainer style={(activeTabIndex === 5) ? {
                maxWidth: "10000px"
            } : {}}>
                {renderActiveView(activeTabIndex === 1)}
            </Styles.ViewContainer>
        </Styles.Content>
    );
}
