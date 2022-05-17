import React, { useState } from "react";
import styled from "styled-components";
import Note from "../Note/Note";
import { FullDiv } from "../../../../common/FullDiv";
import { ANALYSIS_TEMPLATES } from "../../../../utils/CommonVariables";

export default function AnalysisDisplay(props) {
    const [ technicalAnalysis, updateTechnicalAnalysis ] = useState(props.analyses?.technical || ANALYSIS_TEMPLATES.technical);
    const [ fundamentalAnalysis, updateFundamentalAnalysis ] = useState(props.analyses?.fundamental || ANALYSIS_TEMPLATES.fundamental);
    const [ consensusAnalysis, updateConsensusAnalysis ] = useState(props.analyses?.consensus || ANALYSIS_TEMPLATES.consensus);

    const ANALYSES = [
        {
            title: "Technical",
            update: updateTechnicalAnalysis
        },
        {
            title: "Fundamental",
            update: updateFundamentalAnalysis
        },
        {
            title: "Consensus",
            update: updateConsensusAnalysis
        }
    ];


    const handleAnalysisTabChange = () => {
        console.log("switch analysis");
    };

    const renderAnalysisTabButtons = () => {
        ANALYSES.forEach((a) => {
            return renderAnalysisTabButton(a.title);
        });
    };

    const renderAnalysisTabButton = (title) => {
        if( !title ) return <></>;

        return(
            <AnalysisTabButton onClick={handleAnalysisTabChange} >
                <AnalysisTabCaption>
                    {title}
                </AnalysisTabCaption>
            </AnalysisTabButton>
        ); 
    };
    
    return(
        <FullDiv>
            <TopBarContainer>
               {renderAnalysisTabButtons()}
            </TopBarContainer>

            <NoteContainer>
                <Note content={technicalAnalysis} />
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