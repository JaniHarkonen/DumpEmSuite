import React from "react";
import styled from "styled-components";
import View from "./View/View";
import { getKey } from "../utils/KeyManager";

export default function Workspace(props) {
    const tabs = ["hello", "world", "my", "name", "jefff"];
    
    const renderTabs = () => {
        return tabs.map((tab) => {
            return(
                <TabContainer key={"wstab-" + getKey()}>
                    <WSTab
                        onClick={() => { console.log("trolled B)"); }}
                    >
                        {tab}
                    </WSTab>
                </TabContainer>
            )
        });
    };

    return(
        <Content>
            <TabBar>
                { renderTabs() }
            </TabBar>

            <ViewContainer>
                <View />
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