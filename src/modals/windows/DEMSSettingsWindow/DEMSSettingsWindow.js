import { useLayoutEffect } from "react";
import Window from "../Window";
import useInputField from "../../../hooks/useInputField";
import PathPicker from "../../../components/PathPicker/PathPicker";
import { Styles } from "./DEMSSettingsWindow.styles";
import Config from "../../../apis/Config";

export default function DEMSSettingsWindow(props) {
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
                <br/>
                <br/>
                <Styles.SaveButton
                    onClick={handleSaveChanges}
                >
                    Save
                </Styles.SaveButton>
            </Styles.BodyWrapper>
        </Window>
    );
}
