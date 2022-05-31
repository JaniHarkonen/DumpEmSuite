import React, { useState } from "react";
import styled from "styled-components";
import { getKey } from "../utils/KeyManager";
import View from "./View/views/View";
//import ClearNotification from "./modals/ClearNotification";
import SymbolListExternalWrapper from "./View/views/wrappers/SymbolListExternalWrapper";

export default function Workspace(props) {
    const DEBUG_TABS = [
        "Volume",
        "Price action",
        "TA #1",
        "Fundamental"
    ];

    console.log("render: workspace");
    const [activeTab, openTab] = useState(1);   // Holds the currently open tab
    //const [isModalActive, setModalActive] = useState(null);


    const handleTabClick = (tab) => {
        if( !tab ) return;

        openTab(tab);
    };

    const renderTabs = (tablist) => {
        if( !tablist ) return <></>;

        return tablist.map((tab, index) => {
            return(
                <TabContainer key={"wsview-" + getKey()}>
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

    return(
        <Content>
            <TabBar>
                {renderTabs(DEBUG_TABS)}
            </TabBar>

            <ViewContainer>
                {renderActiveTab(activeTab === 1)}
            </ViewContainer>

            {/*
                isModalActive &&
                (<ClearNotification 
                    tab={activeTab}
                    setModalActive={setModalActive}
                />)*/
            }
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
