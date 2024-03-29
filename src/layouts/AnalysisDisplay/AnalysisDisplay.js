import Note from "../../components/Note/Note";
import Config from "../../apis/Config";
import TabBar from "../../components/TabBar/TabBar";
import useStateRef from "react-usestateref";

import { useState, useLayoutEffect } from "react";
import AnalysisDisplayStyles from "./AnalysisDisplay.styles";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";


export default function AnalysisDisplay(props) {
    const fetchAnalysis = props.fetchAnalysis;
    const analysisTemplates = Config.getAnalysisTemplates();
    const onAnalysisUpdate = props.onAnalysisUpdate;
    const analyses = [
        {
            key: "technical",
            index: 0,
            title: "Technical",
            template: analysisTemplates.technical
        },
        {
            key: "fundamental",
            index: 1,
            title: "Fundamental",
            template: analysisTemplates.fundamental
        },
        {
            key: "consensus",
            index: 2,
            title: "Consensus",
            template: analysisTemplates.consensus
        }
    ];

    const [ analysisText, setAnalysisText ] = useState(null);
    const [ openAnalysis, setOpenAnalysis, openAnalysisREF ] = useStateRef("");

    const { theme } = useContext(ThemeContext);
    const Styles = AnalysisDisplayStyles[theme];


    useLayoutEffect(() => {
        setAnalysis(analyses[0]);
    }, []);

    const setAnalysis = (analysis) => {
        if( !analysis ) return "";

        const fetchedAnalysis = fetchAnalysis(analysis.key);

        if( !fetchedAnalysis.isSuccessful )
        setOpenAnalysis(null);
        else
        {
            setAnalysisText(fetchedAnalysis.analysis || analysis.template);
            setOpenAnalysis(analysis);
        }
    };

    const handleAnalysisTabChange = (tabIndex) => {
        setAnalysis(analyses[tabIndex]);
    };

    const handleAnalysisUpdate = (updatedText) => {
        onAnalysisUpdate(openAnalysisREF.current.key, updatedText);
    };
    
    return (
        openAnalysis &&
        (
            <Styles.Content>
                <Styles.TopBarContainer>
                    <TabBar
                        keyFixes={{ prefix: "analysis-display-analysis-tab" }}
                        tabElement={Styles.AnalysisTabButton}
                        tabElementContentWrapper={Styles.TabButtonContentAligner}
                        tabs={analyses}
                        activeTabIndex={openAnalysis.index}
                        activeStyle={{ backgroundColor: Styles.TabBarColor.active }}
                        onTabClick={handleAnalysisTabChange}
                    />
                </Styles.TopBarContainer>
                <Styles.NoteContainer>
                    
                    <Note
                        content={analysisText}
                        updateContent={handleAnalysisUpdate}
                    />
                </Styles.NoteContainer>
            </Styles.Content>
        )
    );
}
