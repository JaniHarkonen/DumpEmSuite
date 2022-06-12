import styled from "styled-components";
import ImageButton from "../../components/ImageButton/ImageButton";
import { getKey } from "../../utils/KeyManager";
import ModalAPI from "../../apis/ModalAPI";
import CreateWorkspacePrompt from "../../modals/prompts/CreateWorkspacePrompt";
import imgCreateWorkspace from "../../assets/img_chart.svg";
import imgOpenWorkspace from "../../assets/img_chart.svg";
import Config from "../../apis/Config";
import DialogAPI from "../../apis/DialogAPI";



export default function SideBar(props) {
    const DEBUGonclose = props.debugonclose;

    const makeOption = (tooltip, image, onClick) => {
        return {
            tooltip: tooltip,
            image: image,
            onClick: onClick
        };
    };

    const options = [
        makeOption("Create a new workspace", imgCreateWorkspace, () => {
            ModalAPI.popup(
                <CreateWorkspacePrompt onDone={handleWorkspaceCreate} />
            );
        }),

        makeOption("Open an existing workspace", imgOpenWorkspace, () => {
            handleWorkspaceOpen();
        }),

        makeOption("Close current workspace", imgOpenWorkspace, () => {
            DEBUGonclose();
        })
    ];


    const handleWorkspaceCreate = (name) => {
        DialogAPI.showOpenFolder({ title: "Select the destination folder..." }, (ws) => {
            if( ws == null ) return;

            Config.createWorkspace(ws[0], name);
            ModalAPI.close();
        });
    };

    const handleWorkspaceOpen = () => {
        DialogAPI.showOpenFolder({ title: "Open existing workspace..." }, (ws) => {
            if( ws == null ) return;

            Config.openWorkspace(ws[0]);
        });
    };

    const renderOptions = (opts) => {
        if( !opts ) return <></>;

        return options.map((opt) => {
            return(
                <OptionPanelContainer key={getKey()}>
                    <ImageButton
                        tooltip={opt.tooltip}
                        image={opt.image}
                        onClick={opt.onClick}
                    />
                </OptionPanelContainer>
            );
        });
    };

    return(
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

const HiddenFileInput = styled.input`
    position: absolute;
    width: 0px;
    height: 0px;
    opacity: 0.0;
`;
