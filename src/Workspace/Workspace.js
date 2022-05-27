import React, { useState } from "react";
import styled from "styled-components";
import { getKey } from "../utils/KeyManager";
import View from "./View/views/View";
import SymbolList from "./View/components/SymbolList/SymbolList";
import ClearNotification from "./modals/ClearNotification";

export default function Workspace(props) {
    const DEBUG_TABS = [
        "Volume",
        "Price action",
        "TA #1",
        "Fundamental"
    ];
    const storageInterface = props.storageInterface;

    const [ activeTab, openTab ] = useState(1);   // Holds the currently open tab
    const [isModalActive, setModalActive] = useState(null);


    const handleTabClick = (tab) => {
        if( !tab ) return;

        openTab(tab);
    };

    const bringStocksFromTab = (filters, tab) => {
        if( !filters ) return;

        if( storageInterface.tabHasColorCodedStocks(tab) )
        setModalActive(true);
        else
        storageInterface.bringStocksFromTab(tab - 1, tab, filters);
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
                    element: SymbolList,
                    context: {
                        stocks: storageInterface.getStocksOnTab(tab),
                        refresh: () => {
                            return storageInterface.getStocksOnTab(tab);
                        },
                        enableBring: !first,
                        onBring: (filters) => {
                            bringStocksFromTab(filters, tab)
                        },
                        onColorCodeChange: (id, newcol) => {
                            return storageInterface.changeColorCode(id, tab, newcol);
                        },
                        onClear: () => {
                            storageInterface.clearTabStocks(tab);
                        }
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

            {
                isModalActive &&
                (<ClearNotification 
                    tab={activeTab}
                    storageInterface={storageInterface}
                    setModalActive={setModalActive}
                />)
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
