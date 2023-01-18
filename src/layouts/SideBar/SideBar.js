import { useContext } from "react";

import ImageButton from "../../components/ImageButton/ImageButton";
import ModalAPI from "../../apis/ModalAPI";
import DialogAPI from "../../apis/DialogAPI";
import Config from "../../apis/Config";
import CreateWorkspacePrompt from "../../modals/prompts/CreateWorkspacePrompt";
import DEMSSettingsWindow from "../../modals/windows/DEMSSettingsWindow/DEMSSettingsWindow";

import { images } from "../../assets/assets";
import { getKey } from "../../utils/KeyManager";
import SideBarStyles from "./SideBar.styles";
import { ThemeContext } from "../../contexts/ThemeContext";


export default function SideBar(props) {
    const updateWorkspaces = props.updateWorkspaces;
    const { theme } = useContext(ThemeContext);
    const Styles = SideBarStyles[theme];
    
    const makeOption = (tooltip, image, onClick) => {
        return {
            tooltip: tooltip,
            image: image,
            onClick: onClick
        };
    };

    const options = [
        makeOption("Create a new workspace", images.plus.green, () => {
            ModalAPI.popup(
                <CreateWorkspacePrompt onDone={handleWorkspaceCreate} />
            );
        }),

        makeOption("Open an existing workspace", images.folder.white, () => {
            handleWorkspaceOpen();
        }),

        makeOption("Configure DumpEm Suite settings", images.gear, () => {
            ModalAPI.popup(
                <DEMSSettingsWindow />
            );
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
            <Styles.OptionPanelContainer key={"sidebar-option-panel-" + getKey()}>
                <Styles.ImageButtonContainer>
                    <ImageButton
                        tooltip={option.tooltip}
                        image={option.image}
                        onClick={option.onClick}
                    />
                </Styles.ImageButtonContainer>
            </Styles.OptionPanelContainer>
        );
    };

    const renderOptions = (optionArray) => {
        if( !optionArray ) return [];

        return optionArray.map((option) => {
            return renderOptionPanel(option);
        });
    };

    return (
        <Styles.Content>
            <Styles.OptionContainer>
                {renderOptions(options)}
            </Styles.OptionContainer>
        </Styles.Content>
    );
}
