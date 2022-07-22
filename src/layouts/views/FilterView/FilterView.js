import DialogAPI from "../../../apis/DialogAPI";
import ExternalStorageAPI from "../../../apis/ExternalStorageAPI";
import scrape from "../../../scraper/scrape";
import View, { makeViewElement } from "../View";
import SymbolListExternalWrapper from "./SymbolListExternalWrapper";
import useStateRef from "react-usestateref";

import { VOLUME_FILTER_COLOR_CODES } from "../../../utils/CommonVariables";

const fs = window.require("fs");


export default function FilterView(props) {
    const tab = props.tab;
    const isFirstTab = props.isFirstTab;

    const [stocksChanged, setStocksChanged, stocksChangedREF] = useStateRef(1);

    /**
     * Scrapes Kauppalehti's stock section from its HTML-string
     * and posts the scraped stocks into the database.
     * 
     * @param {*} filters (Unused, placeholder for bring filters)
     */
    const scrapeFromWebsite = (filters) => {
        DialogAPI.showOpenFile({
                title: "Select website HTML to scrape",
                filters: [{ name: "Website (*.html, *.htm)", extensions: ["html", "htm"] }]

            }, (selectedFile) => {
                if( !selectedFile )
                return;

                    // Scrape symbols from website
                const htmlString = fs.readFileSync(selectedFile[0]).toString();
                const scraperResult = scrape(htmlString, {
                    form: {
                        name: "companyName",
                        ticker: "stockSymbol",
                        volume: "volume",
                        colorCode: 0
                    }
                });

                const scrapedSymbols = scraperResult.symbols;

                    // Automatically reject stocks with less than €100k of volume
                    // by assigning them a certain color code (red)
                for( let symbol of scrapedSymbols )
                {
                    if( isNaN(symbol.volume) )
                    symbol.volume = 0;

                    if( symbol.volume < 100000 )
                    symbol.colorCode = VOLUME_FILTER_COLOR_CODES.rejected;
                    else
                    symbol.colorCode = VOLUME_FILTER_COLOR_CODES.accepted;
                }

                    // Post to database, clearing all tabs and previous companies
                ExternalStorageAPI.clearTabStocks(1);
                ExternalStorageAPI.clearTabStocks(2);
                ExternalStorageAPI.clearTabStocks(3);
                ExternalStorageAPI.clearTabStocks(4);
                ExternalStorageAPI.clearCompanies();
                ExternalStorageAPI.setCompanyCollection(scrapedSymbols);
                
                    // Update the UI
                setStocksChanged(stocksChangedREF.current + 1);
            }
        );
    };

    const elements = [
        makeViewElement(
            { x: 1, y: 1 },
            { width: 1, height: 2 },
            <SymbolListExternalWrapper
                tab={tab}
                enableBring={true}
                customBring={isFirstTab ? scrapeFromWebsite : null}
            />
        )
    ];

    return (
        <View elements={elements} />
    );
}
