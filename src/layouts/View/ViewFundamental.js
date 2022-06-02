/*import React, { useState } from "react";
import styled from "styled-components";
import { FullDiv } from "../../../common/FullDiv";
import FileExplorer from "../components/FileExplorer/FileExplorer";
import SymbolList from "../components/SymbolList/SymbolList";
import { getDirectoryFromPath, removeIllegals } from "../../../utils/FileUtils";
import AnalysisDisplay from "../components/FileExplorer/AnalysisDisplay";

export default function ViewFundamental(props) {
    const [ selectedStock, selectStock ] = useState(null);

    const handleSymbolSelection = (selection) => {
        if( !selection ) return;

        selectStock(selection);
    };

    const stockTickerToDirectory = (ticker) => {
        if( !ticker || ticker === "" ) return "";

        let dir = getDirectoryFromPath(props.model.getPath());
        return dir + "\\Candidate - " + removeIllegals(ticker);
    };

    const getStockDirectory = (stock) => {
        if( !stock ) return "";

        return stockTickerToDirectory(selectedStock.getTicker());
    }

    return(
        <FullDiv>
            <SymbolListContainer>
                <SymbolList
                    tab={props.tab}
                    filters={props.tab.getFilters()}
                    stocks={props.model.getStocks()}

                    itemSelectionHook={handleSymbolSelection}
                />
            </SymbolListContainer>

            <StockInfoContainer>
                {
                    !selectedStock ?
                    (
                        <NoSelectionContainer>
                            Start by selecting a stock...
                        </NoSelectionContainer>
                    )
                    :
                    <>
                        <FileExplorerContainer>
                            <FileExplorer directory={getStockDirectory()} />
                        </FileExplorerContainer>

                        <AnalysisContainer>
                            <AnalysisDisplay stockDirectory={getStockDirectory()} />
                        </AnalysisContainer>
                    </>
                }
            </StockInfoContainer>
        </FullDiv>
    );
}

const SymbolListContainer = styled.div`
    position: relative;
    width: 50%;
    height: 100%;

    display: inline-block;
`;

const StockInfoContainer = styled.div`
    position: relative;
    width: 50%;
    height: 100%;

    display: inline-block;
    vertical-align: top;
`;

const NoSelectionContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const FileExplorerContainer = styled.div`
    position: relative;
    width: 100%;
    height: 50%;
`;

const AnalysisContainer = styled.div`
    position: relative;
    width: 100%;
    height: 50%;

    background-color: blue;
`;*/