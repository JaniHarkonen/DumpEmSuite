import { useState, useEffect } from "react";
import styled from "styled-components";
import TabBar from "../../components/TabBar/TabBar";
import FilterView from "../views/FilterView/FilterView";
import { getKey } from "../../utils/KeyManager";
import FundamentalView from "../views/FundamentalView/FundamentalView";

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

    return(
        <Content>
            <TabBarContainer>
                <TabBar
                    keyFixes={{ prefix: "workspace-view-tab" }}
                    tabElement={WSTab}
                    tabs={DEBUG_TABS}
                    activeTabIndex={activeTabIndex - 1}
                    onTabClick={handleTabClick}
                    activeStyle={{
                        backgroundColor: "#BCBCBC"
                    }}
                />
            </TabBarContainer>

            <ViewContainer>
                {renderActiveView(activeTabIndex === 1)}
            </ViewContainer>
        </Content>
    );
};

const Content = styled.div`
    position: absolute;
    left: 0px;
    top : 0px;
    width: 100%;
    height: 100%;
`;

const TabBarContainer = styled.div`
    position: relative;
    width: 100%;
    height: 32px;

    background-color: orange;
`;

const WSTab = styled.div`
    position: relative;
    display: inline-block;
    width: 128px;
    height: 100%;
    margin-right: 4px;

    background-color: gray;
`;

const ViewContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 32px);
`;
