import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Note from "../../components/Note/Note";
import { FullDiv } from "../../common/FullDiv";
import Config from "../../apis/Config";
import { getKey } from "../../utils/KeyManager";

export default function AnalysisDisplay(props) {
    const fetchAnalysis = props.fetchAnalysis;
    const analysisTemplates = Config.getAnalysisTemplates();
    const onAnalysisUpdate = props.onAnalysisUpdate;
    const analyses = [
        {
            key: "technical",
            title: "Technical",
            template: analysisTemplates.technical
        },
        {
            key: "fundamental",
            title: "Fundamental",
            template: analysisTemplates.fundamental
        },
        {
            key: "consensus",
            title: "Consensus",
            template: analysisTemplates.consensus
        }
    ];

    const [ analysisText, setAnalysisText ] = useState("");
    const [ openAnalysis, setOpenAnalysis ] = useState(null);


    useEffect(() => {
        setAnalysis(analyses[0]);
    }, []);

    const setAnalysis = (analysis) => {
        if( !analysis ) return "";

        setAnalysisText(fetchAnalysis(analysis.key) || analysis.template);
        setOpenAnalysis(analysis);
    };

    const handleAnalysisTabChange = (tabIndex) => {
        setAnalysis(analyses[tabIndex]);
    };

    const handleAnalysisUpdate = (updatedText) => {
        onAnalysisUpdate(openAnalysis.key, updatedText);
    };

    const renderAnalysisTabButtons = (analysisTabs) => {
        return analysisTabs.map((analysis, index) => {
            return renderAnalysisTabButton(analysis.title, index);
        });
    };

    const renderAnalysisTabButton = (title, index) => {
        if( !title ) return <></>;

        return(
            <AnalysisTabButton
                key={getKey()}
                onClick={() => {
                    handleAnalysisTabChange(index);
                }}
            >
                <AnalysisTabCaption>
                    {title}
                </AnalysisTabCaption>
            </AnalysisTabButton>
        );
    };
    
    return(
        <FullDiv>
            <TopBarContainer>
               {renderAnalysisTabButtons(analyses)}
            </TopBarContainer>

            <NoteContainer>
                <Note
                    content={analysisText}
                    updateContent={handleAnalysisUpdate}
                />
            </NoteContainer>
        </FullDiv>
    );
}

const TopBarContainer = styled.div`
    position: relative;
    width: 100%;
    height: 32px;

    display: flex;
    align-items: flex-end;
`;

const AnalysisTabButton = styled.div`
    position: relative;
    width: 128px;
    height: 28px;

    display: inline-block;
    margin-right: 8px;
    vertical-align: top;

    background-color: white;
`;

const AnalysisTabCaption = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
`;

const NoteContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 32px);
`;
