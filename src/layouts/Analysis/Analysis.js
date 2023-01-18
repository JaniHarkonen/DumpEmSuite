import FileExplorer from "../../components/FileExplorer/FileExplorer";
import ExternalStorageAPI from "../../apis/ExternalStorageAPI";
import AdvancedRealTimeChart from "../../components/AdvancedRealTimeChart/AdvancedRealTimeChart";

import AnalysisStyles from "./Analysis.styles";
import { COMMON_PATHS } from "../../utils/CommonVariables";
import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";


export default function Analysis(props) {
	const selectedSymbolID = props.selectedSymbolID;
	const selectedSymbolTicker = props.selectedSymbolTicker;
	const targetDirectory = ExternalStorageAPI.getOpenWorkspaceDirectory() + COMMON_PATHS.folders.materialsSub + "\\" + selectedSymbolID + "\\";

	const tabs = [
		{
			id: "chart",
			title: "Chart",
			content: <AdvancedRealTimeChart symbol={selectedSymbolTicker} />
		},
		{
			id: "materials",
			title: "Materials",
			content: <FileExplorer targetDirectory={targetDirectory} />
		}
	];
	const [ selectedTab, openTab ] = useState(tabs[0]);
	
	const { theme } = useContext(ThemeContext);
	const Styles = AnalysisStyles[theme];


	const renderTabs = () => {
		return tabs.map((tab) => Tab(tab));
	};

	const Tab = (tab) => {
		return(
			<Styles.MaterialTab
					key={tab.title}
					onClick={() => openTab(tab)}
					style={selectedTab.id === tab.id ? { backgroundColor: Styles.tabHighlightColor } : {}}
			>
				{tab.title}
			</Styles.MaterialTab>
		);
	}

	return (
		<Styles.Content>
			{
				(selectedSymbolID >= 0) ?
				(
					<>
						<Styles.CaptionBar
							title="External files providing material for the analysis"
						>
							<Styles.CaptionAligner>{renderTabs()}</Styles.CaptionAligner>
						</Styles.CaptionBar>
						<Styles.FileExplorerContainer>
							{selectedTab.content}
						</Styles.FileExplorerContainer>
					</>
				)
				:
				(<>{"Please, select a symbol..."}</>)
			}
		</Styles.Content>
	);
}
