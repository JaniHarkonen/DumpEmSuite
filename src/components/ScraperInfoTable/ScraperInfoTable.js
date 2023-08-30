export function ScraperInfoTable(props) {
    const metadata = props.scraper?.metadata;

    return (
        metadata ? 
        <>
            <b>Scraper metadata:</b> <br />
            <b>Name:</b> {metadata.name} <br />
            <b>Scraper version:</b> {metadata.version} <br />
            <b>ScrapeScript version:</b> {metadata["ss-version"]} <br />
            <b>Good for date:</b> {metadata.goodFor} <br />
            <br />
        </> :
        <>No scraper selected!</>
    );
}
