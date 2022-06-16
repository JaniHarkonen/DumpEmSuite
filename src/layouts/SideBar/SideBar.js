import styled from "styled-components";
import ImageButton from "../../components/ImageButton/ImageButton";
import ModalAPI from "../../apis/ModalAPI";
import DialogAPI from "../../apis/DialogAPI";
import Config from "../../apis/Config";
import CreateWorkspacePrompt from "../../modals/prompts/CreateWorkspacePrompt";
import { images } from "../../assets/assets";
import { getKey } from "../../utils/KeyManager";

export default function SideBar(props) {
    const updateWorkspaces = props.updateWorkspaces;

    const makeOption = (tooltip, image, onClick) => {
        return {
            tooltip: tooltip,
            image: image,
            onClick: onClick
        };
    };

    const options = [
        makeOption("Create a new workspace", images.folder.white, () => {
            ModalAPI.popup(
                <CreateWorkspacePrompt onDone={handleWorkspaceCreate} />
            );
        }),

        makeOption("Open an existing workspace", images.folder.white, () => {
            handleWorkspaceOpen();
        })
    ];


    const handleWorkspaceCreate = (name) => {
        DialogAPI.showOpenFolder({ title: "Select the destination folder..." }, (ws) => {
            if( ws == null ) return;

            ModalAPI.close();
            
            const changes = Config.createWorkspace(ws[0], name);
            updateWorkspaces(changes);
        });
    };

    const handleWorkspaceOpen = () => {
        DialogAPI.showOpenFolder({ title: "Open existing workspace..." }, (ws) => {
            if( ws == null ) return;

            const changes = Config.openWorkspace(ws[0]);
            updateWorkspaces(changes);
        });
    };

    const renderOptionPanel = (option) => {
        if( !option ) return <></>;

        return (
            <OptionPanelContainer key={"sidebar-option-panel-" + getKey()}>
                <ImageButton
                    tooltip={option.tooltip}
                    image={option.image}
                    onClick={option.onClick}
                />
            </OptionPanelContainer>
        );
    };

    const renderOptions = (optionArray) => {
        if( !optionArray ) return [];

        return optionArray.map((option) => {
            return renderOptionPanel(option);
        });
    };

    return (
        <Content>
            <OptionContainer>
                {renderOptions(options)}
            </OptionContainer>
        </Content>
    );
};

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    background-color: yellow;
`;

const OptionContainer = styled.div`
    position: relative;
    width: 90%;
    height: 100%;
`;

const OptionPanelContainer = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    margin-bottom: 1em;
`;
