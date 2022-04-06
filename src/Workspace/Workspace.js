import React, { useState } from "react";
import styled from "styled-components";
//import View from "./View/View";
import { getKey } from "../utils/KeyManager";
import ViewPriceAction from "./View/views/ViewPriceAction";
import ViewTa1 from "./View/views/ViewTa1";
import ViewVolume from "./View/views/ViewVolume";
import ViewFundamental from "./View/views/ViewFundamental";
import ViewMacro from "./View/views/ViewMacro";

export default function Workspace(props) {

    /**
     * Creates a JSON representing a Tab and returns it.
     * @param {string} name Name of the tab (its title).
     * @param {*} content React-component that constitutes the content of the view.
     * @returns JSON-object representing the tab.
     */
    const createTab = (name, content) => {
        if( !name ) name = "";
        if( !content ) return {};

        return {
            name: name,
            content: content
        };
    }

    /**
     * Initializes all the available tabs.
     */
    const TABS = [
        createTab("Volume",         <ViewVolume />),
        createTab("Price action",   <ViewPriceAction />),
        createTab("TA #1",          <ViewTa1 />) ,
        createTab("Fundamental",    <ViewFundamental />),
        createTab("MACRO",          <ViewMacro />)
    ];

        // State declarations
    const [ activeTab, openTab ] = useState(TABS[0]);   // Holds the currently open tab
    

    /**
     * Opens the tab represented by the given JSON.
     * @param {*} tab JSON-object representing the tab to be opened.
     */
    const handleTabClick = (tab) => {
        openTab(tab);
    }

    /**
     * Renders the tabs into the top navigation bar.
     * @param {*} tablist Array containing the tabs whose navigation buttons are to be rendered.
     * @returns An array containing the React-components of the navigation buttons.
     */
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
            )
        });
    };

    return(
        <Content>
            <TabBar>
                { renderTabs(TABS) }
            </TabBar>

            <ViewContainer>
                {activeTab.content}
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