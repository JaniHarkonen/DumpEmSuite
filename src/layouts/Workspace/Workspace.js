import { useState, useEffect } from "react";
import styled from "styled-components";
import ViewDefaultWrapper from "../../wrappers/ViewDefaultWrapper";
import ViewFundamentalWrapper from "../../wrappers/ViewFundamentalWrapper";
import TabBar from "../../components/TabBar/TabBar";

export default function Workspace(props) {
    const DEBUG_TABS = [
        { title: "Volume" },
        { title: "Price action" },
        { title: "TA #1" },
        { title: "Fundamental" }
    ];

    const [activeTabIndex, openTab] = useState(1);   // Holds the currently open tab


    useEffect(() => {
        openTab(1);
    }, [props.activeWorkspace]);

    const handleTabClick = (tab) => {
        openTab(tab + 1);
    };

    const renderActiveView = (first = false) => {
        let tab = activeTabIndex;

        if( tab === 4 )
        {
            return (
                <ViewFundamentalWrapper
                    tab={tab}
                />
            );
        }

        return (
            <ViewDefaultWrapper
                tab={tab}
                first={first}
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
