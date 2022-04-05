import styled from "styled-components";
import Workspace from "./Workspace/Workspace";
import SideBar from "./SideBar/SideBar";
import { getKey } from "./utils/KeyManager";

export default function App() {
    let tabs = ["Workspace 2021-1", "Workspace 2021-2", "Workspace 2022-1"]

    const renderTabs = (tablist) => {
        return tablist.map((name) => {
            return(
                <Tab
                    key={getKey()}
                    title={name}
                    onClick={() => { console.log("switch workspace") }}
                />
            );
        });
    }

    return (
        <Base>
            <ContentContainer>

                <SideBarContainer>
                    <SideBar />
                </SideBarContainer>

                <WorkspaceContainer id="lol">

                    <TopBar>
                        {renderTabs(tabs)}
                    </TopBar>

                    <Content>
                        <Workspace />
                    </Content>

                </WorkspaceContainer>

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

    background-color: gray;

    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
`;

const ContentContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const WorkspaceContainer = styled.div`
    position: absolute;
    //display : inline-block;

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

const Content = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 32px);
`;

const SideBarContainer = styled.div`
    position: absolute;
    //display: inline-block;
    left: 0px;
    width: 48px;
    height: 100%;
`;