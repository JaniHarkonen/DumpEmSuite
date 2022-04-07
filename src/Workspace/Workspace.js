import React, { useState } from "react";
import styled from "styled-components";
import { getKey } from "../utils/KeyManager";
import WorkspaceModel from "../utils/model/WorkspaceModel";

export default function Workspace(props) {

        // State declarations
    const [ activeTab, openTab ] = useState(props.model.tabs[WorkspaceModel.TAB_VOLUME]);   // Holds the currently open tab
    

    const handleTabClick = (tab) => {
        if( !tab ) return;

        openTab(tab);
    }

    const renderTabs = (tablist) => {
        if( !tablist ) return <></>;

        return tablist.map((tab) => {
            return(
                <TabContainer key={"wsview-" + getKey()}>
                    <WSTab
                        onClick={() => { handleTabClick(tab); }}
                    >
                        {tab.name}
                    </WSTab>
                </TabContainer>
            );
        });
    };

    const renderView = (element, data) => {
        let View = element;

        return(
            <View
                data ={data}
                model={props.model}
            />
        );
    }

    return(
        <Content>
            <TabBar>
                {renderTabs(props.model.tabs)}
            </TabBar>

            <ViewContainer>
                {renderView(activeTab.element, activeTab.data)}
            </ViewContainer>
        </Content>
    );
}

const Content = styled.div`
    position: absolute;
    left: 0px;
    top : 0px;
    width: 100%;
    height: 100%;

    background-color: blue;
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