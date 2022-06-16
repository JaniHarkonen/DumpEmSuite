import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import Workspace from "./layouts/Workspace/Workspace"
import SideBar from "./layouts/SideBar/SideBar";
import { setColorCodes } from "./utils/CommonVariables";
import ExternalStorageAPI from "./apis/ExternalStorageAPI";
import Modal from "./layouts/Modal/Modal";
import Config from "./apis/Config";
import TabBar, { extractTabsFromArray } from "./components/TabBar/TabBar";


export default function App(props) {
    const defaultOpenWorkspaces = props.openWorkspaces;
    const startupActiveWorkspaceID = props.activeWorkspaceID;

    const [activeWorkspaceIndex, setActiveWorkspace] = useState(null);
    const [openWorkspaces, setOpenWorkspaces] = useState(defaultOpenWorkspaces);


    useLayoutEffect(() => {
        if( defaultOpenWorkspaces[startupActiveWorkspaceID] != null )
        {
            switchWorkspace(startupActiveWorkspaceID);
            setColorCodes(ExternalStorageAPI.getColorCodes());
        }
    }, []);

    const openWorkspace = (workspaceIndex) => {
        const ws = openWorkspaces[workspaceIndex];
        ExternalStorageAPI.openWorkspace(Config.getWorkspacePath(ws));
    };

    const switchWorkspace = (index) => {
        Config.switchWorkspace(index);
        openWorkspace(index);
        setActiveWorkspace(index);
    };

    const updateWorkspacesBasedOnConfigChanges = (changes) => {
        if( !changes ) return;

        openWorkspace(changes.activeWorkspaceID);
        setActiveWorkspace(changes.activeWorkspaceID);
        setOpenWorkspaces(changes.workspaces);
    };

    const handleCloseWorkSpace = (index) => {
        const changes = Config.closeWorkspace(index);
        updateWorkspacesBasedOnConfigChanges(changes);
    };

    return (
        <Base>
            <ContentContainer>

                <SideBarContainer>
                    <SideBar updateWorkspaces={updateWorkspacesBasedOnConfigChanges} />
                </SideBarContainer>

                <WorkspaceContainer>

                    <TopBar>
                        <TabBar
                            keyFixes={{ prefix: "workspace-tab" }}
                            tabElement={Tab}
                            tabs={extractTabsFromArray(openWorkspaces, { titleAs: "name" })}
                            activeTabIndex={activeWorkspaceIndex}
                            onTabClick={switchWorkspace}
                            activeStyle={{
                                backgroundColor: "lightgreen"
                            }}
                            closeButton={TabCloseButton}
                            allowCloseByDefault={true}
                            onClose={handleCloseWorkSpace}
                        />
                    </TopBar>

                    {
                        openWorkspaces[activeWorkspaceIndex] &&
                        (<Content>
                            <Workspace activeWorkspace={openWorkspaces[activeWorkspaceIndex]} />
                        </Content>)
                    }

                </WorkspaceContainer>

                <Modal />

            </ContentContainer>
        </Base>
    );
};

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

    background-color: green;
`;

const TabCloseButton = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    aspect-ratio: 1 / 1;

    background-color: #B70000;
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
