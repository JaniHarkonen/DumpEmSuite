import Workspace from "./layouts/Workspace/Workspace"
import SideBar from "./layouts/SideBar/SideBar";
import ExternalStorageAPI from "./apis/ExternalStorageAPI";
import Modal from "./layouts/Modal/Modal";
import Config from "./apis/Config";
import TabBar, { extractTabsFromArray } from "./components/TabBar/TabBar";

import { Styles } from "./App.styles";
import { useLayoutEffect, useState } from "react";
import { setColorCodes } from "./utils/CommonVariables";
import { images } from "./assets/assets";


export default function App(props) {
    const defaultOpenWorkspaces = props.openWorkspaces;
    const startupActiveWorkspaceID = props.activeWorkspaceID;

    const [activeWorkspaceIndex, setActiveWorkspace] = useState(null);
    const [openWorkspaces, setOpenWorkspaces] = useState(defaultOpenWorkspaces);
    const [forceRerender, setForceRerender] = useState(0);


    useLayoutEffect(() => {
        if( defaultOpenWorkspaces[startupActiveWorkspaceID] != null )
        switchWorkspace(startupActiveWorkspaceID);
    }, []);

    const openWorkspace = (workspaceIndex) => {
        const ws = openWorkspaces[workspaceIndex];
        ExternalStorageAPI.openWorkspace(Config.getWorkspacePath(ws));
    };

    const switchWorkspace = (index) => {
        Config.switchWorkspace(index);
        openWorkspace(index);
        setActiveWorkspace(index);
        setColorCodes(ExternalStorageAPI.getColorCodes());
    };

    const updateWorkspacesBasedOnConfigChanges = (changes) => {
        if( !changes ) return;

        openWorkspace(changes.activeWorkspaceID);
        setActiveWorkspace(changes.activeWorkspaceID);
        setOpenWorkspaces(changes.workspaces);
        setForceRerender(forceRerender + 1);
        setColorCodes(ExternalStorageAPI.getColorCodes());
    };

    const handleCloseWorkSpace = (index) => {
        const changes = Config.closeWorkspace(index);
        updateWorkspacesBasedOnConfigChanges(changes);
    };

    return (
        <Styles.Base>
            <Styles.ContentContainer>

                <Styles.SideBarContainer>
                    <SideBar updateWorkspaces={updateWorkspacesBasedOnConfigChanges} />
                </Styles.SideBarContainer>

                <Styles.WorkspaceContainer>

                    <Styles.TopBar>
                        <TabBar
                            keyFixes={{ prefix: "workspace-tab" }}
                            tabElement={Styles.Tab}
                            tabElementContentWrapper={Styles.TabContentWrapper}
                            tabs={extractTabsFromArray(openWorkspaces, { titleAs: "name" })}
                            activeTabIndex={activeWorkspaceIndex}
                            onTabClick={switchWorkspace}
                            activeStyle={Styles.Tab_highlightStyle}
                            closeButton={Styles.TabCloseButton}
                            closeButtonIcon={images.close.square.white}
                            allowCloseByDefault={true}
                            onClose={handleCloseWorkSpace}
                        />
                    </Styles.TopBar>

                    {
                        openWorkspaces[activeWorkspaceIndex] &&
                        (<Styles.Content>
                            <Workspace activeWorkspace={openWorkspaces[activeWorkspaceIndex]} />
                        </Styles.Content>)
                    }

                </Styles.WorkspaceContainer>

                <Modal />

            </Styles.ContentContainer>
        </Styles.Base>
    );
};
