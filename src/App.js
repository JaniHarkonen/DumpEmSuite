import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import Workspace from "./layouts/Workspace/Workspace"
import SideBar from "./layouts/SideBar/SideBar";
import { getKey } from "./utils/KeyManager";
import { setColorCodes } from "./utils/CommonVariables";
import ExternalStorageAPI from "./apis/ExternalStorageAPI";
import Modal from "./layouts/Modal/Modal";
import Config from "./apis/Config";


export default function App(props) {
    const openWorkspaces = props.openWorkspaces;
    const startupActiveWorkspaceID = props.activeWorkspaceID;

    const [activeWorkspace, setActiveWorkspace] = useState(null);


    useLayoutEffect(() => {
        const saWorkspace = openWorkspaces[startupActiveWorkspaceID];

        if( saWorkspace != null )
        {
            switchWorkspace(saWorkspace, startupActiveWorkspaceID);
            setColorCodes(ExternalStorageAPI.getColorCodes());
        }
    }, []);

    const openWorkspace = (ws) => {
        if( !ws ) return;
        ExternalStorageAPI.openWorkspace(Config.getWorkspacePath(ws));

        return ws;
    };

    const switchWorkspace = (ws, index) => {
        if( !ws ) return;

        Config.switchWorkspace(index);
        setActiveWorkspace(openWorkspace(ws));
    };

    const closeActiveWorkSpace = () => {
        Config.closeWorkspace(openWorkspaces.indexOf(activeWorkspace));
        setActiveWorkspace(null);
    };

    const renderTabs = (workspaces) => {
        if( !workspaces ) return <></>;
        
        return workspaces.map((ws, index) => {
            return(
                <Tab
                    key={getKey()}
                    onClick={() => {
                        switchWorkspace(ws, index);
                    }}
                    style={{
                        backgroundColor: (activeWorkspace === ws) ? "lightgreen" : "green"
                    }}
                >
                    {ws.name}
                </Tab>
            );
        });
    };

    return (
            <Base>
                <ContentContainer>

                    <SideBarContainer>
                        <SideBar debugonclose={closeActiveWorkSpace} />
                    </SideBarContainer>

                    <WorkspaceContainer>

                        <TopBar>
                            {renderTabs(openWorkspaces)}
                        </TopBar>

                        {
                            activeWorkspace &&
                            (<Content>
                                <Workspace activeWorkspace={activeWorkspace} />
                            </Content>)
                        }

                    </WorkspaceContainer>

                    <Modal />

                </ContentContainer>
            </Base>
    );
}

const Base = styled.div`
    position: absolute;
    left: 0px;
    top : 0px;
    width: 100%;
    height: 100%;

    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;

    overflow-y: hidden;
`;

const ContentContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const WorkspaceContainer = styled.div`
    position: absolute;

    left: 48px;
    width: calc(100% - 48px);
    height: 100%;
`;

const TopBar = styled.div`
    position: relative;
    width: 100%;
    height: 32px;

    background-color: red;

    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
`;

const Tab = styled.div`
    position: relative;
    display : inline-block;

    width : 128px;
    height: 32px;
    margin-right: 4px;
`;

const Content = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 32px);
`;

const SideBarContainer = styled.div`
    position: absolute;
    left: 0px;
    width: 48px;
    height: 100%;
`;
