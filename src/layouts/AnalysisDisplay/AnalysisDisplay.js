import Note from "../../components/Note/Note";
import Config from "../../apis/Config";
import TabBar from "../../components/TabBar/TabBar";

import { useState, useLayoutEffect } from "react";
import { Styles } from "./AnalysisDisplay.styles";


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
    const [ openAnalysis, setOpenAnalysis ] = useState("");


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
        onAnalysisUpdate(openAnalysis.key, updatedText);
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
                        activeStyle={{ backgroundColor: "#FFF9E8" }}
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
