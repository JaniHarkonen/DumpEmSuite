import { useState, useEffect } from "react";
import styled from "styled-components";
import { getKey } from "../../utils/KeyManager";
import ViewDefaultWrapper from "../../wrappers/ViewDefaultWrapper";
import ViewFundamentalWrapper from "../../wrappers/ViewFundamentalWrapper";

export default function Workspace(props) {
    const DEBUG_TABS = [
        "Volume",
        "Price action",
        "TA #1",
        "Fundamental"
    ];

    const [activeTab, openTab] = useState(1);   // Holds the currently open tab


    useEffect(() => {
        openTab(1);
    }, [props.activeWorkspace]);

    const handleTabClick = (tab) => {
        if( !tab ) return;

        openTab(tab);
    };

    const renderTabs = (tablist) => {
        if( !tablist ) return <></>;

        return tablist.map((tab, index) => {
            return(
                <TabContainer key={"workspace-view-tab-" + getKey()}>
                    <WSTab
                        onClick={() => {
                            handleTabClick(index + 1);
                        }}

                        style={{
                            backgroundColor: (activeTab - 1 === index) ? "#BCBCBC" : "auto"
                        }}
                    >
                        {tab}
                    </WSTab>
                </TabContainer>
            );
        });
    };

    const renderActiveTab = (first = false) => {
        let tab = activeTab;

        if( tab === 4 )
        {
            return(
                <ViewFundamentalWrapper
                    tab={tab}
                />
            );
        }

        return(
            <ViewDefaultWrapper
                tab={tab}
                first={first}
            />
        );
    };

    return(
        <Content>
            <TabBar>
                {renderTabs(DEBUG_TABS)}
            </TabBar>

            <ViewContainer>
                {renderActiveTab(activeTab === 1)}
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

const TabBar = styled.div`
    position: relative;
    width: 100%;
    height: 32px;

    background-color: orange;
`;

const TabContainer = styled.div`
    position: relative;
    display: inline-block;
    width: 128px;
    height: 100%;
    margin-right: 4px;
`;

const ViewContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 32px);
`;

const WSTab = styled.div`
    position: absolute;
    left: 0px;
    top : 0px;
    width: 100%;
    height: 100%;

    background-color: gray;
`;
