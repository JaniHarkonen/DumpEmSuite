import Window from "../Window";
import PathPicker from "../../../components/PathPicker/PathPicker";
import ThemePicker from "../../../components/ThemePicker/ThemePicker";
import Config from "../../../apis/Config";

import useInputField from "../../../hooks/useInputField";
import { useLayoutEffect } from "react";
import { Styles } from "./DEMSSettingsWindow.styles";
import { Styles as PromptStyles } from "../../prompts/generic/Prompt.styles";


export default function DEMSSettingsWindow() {
    const [technicalTemplate, handleTechnicalTemplate] = useInputField("");
    const [fundamentalTemplate, handleFundamentalTemplate] = useInputField("");
    const [consensusTemplate, handleConsensusTemplate] = useInputField("");
    const [scraper, handleScraperChange] = useInputField("");


    useLayoutEffect(() => {
        const templates = Config.getAnalysisPaths();

        handleTechnicalTemplate(templates.technical);
        handleFundamentalTemplate(templates.fundamental);
        handleConsensusTemplate(templates.consensus);
    }, []);

    const handleSaveChanges = () => {
        Config.changeAnalysisTemplate("technical", technicalTemplate);
        Config.changeAnalysisTemplate("fundamental", fundamentalTemplate);
        Config.changeAnalysisTemplate("consensus", consensusTemplate);
    };

    return (
        <Window
            title="DumpEm Suite settings"
            dimensions={{
                width: "400px",
                height: "400px"
            }}
        >
            <Styles.BodyWrapper>
                <Styles.FilePickerContainer>
                    <PathPicker
                        caption="Technical analysis template:"
                        path={technicalTemplate}
                        onChange={handleTechnicalTemplate}
                    />
                </Styles.FilePickerContainer>
                <Styles.FilePickerContainer>
                    <PathPicker
                        caption="Fundamental analysis template:"
                        path={fundamentalTemplate}
                        onChange={handleFundamentalTemplate}
                    />
                </Styles.FilePickerContainer>
                <Styles.FilePickerContainer>
                    <PathPicker
                        caption="Consensus analysis template:"
                        path={consensusTemplate}
                        onChange={handleConsensusTemplate}
                    />
                </Styles.FilePickerContainer>
                <Styles.FilePickerContainer>
                    <PathPicker
                        caption="Scraper:"
                        path={scraper}
                        onChange={handleScraperChange}
                    />
                </Styles.FilePickerContainer>
                <Styles.FilePickerContainer>
                    <ThemePicker />
                </Styles.FilePickerContainer>
                <br/>
                <br/>
                <Styles.SaveButtonContainer>
                    <PromptStyles.ControlButton
                        onClick={handleSaveChanges}
                    >
                        Save
                    </PromptStyles.ControlButton>
                </Styles.SaveButtonContainer>
            </Styles.BodyWrapper>
        </Window>
    );
}
