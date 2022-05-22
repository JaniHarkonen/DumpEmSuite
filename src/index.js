import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DUMP_EM_CONFIG, setAnalysisTemplates } from './utils/CommonVariables';
import { readJson } from './utils/FileUtils';
import DatabaseController from "./database/DatabaseController";
import WorkspaceManager from "./Workspace/WorkspaceManager";


    // Load analysis note templates
/*let config = readJson(DUMP_EM_CONFIG);
setAnalysisTemplates({
    technical: readJson(config.analysisTemplates.technical).content,
    fundamental: readJson(config.analysisTemplates.fundamental).content,
    consensus: readJson(config.analysisTemplates.consensus).content
});*/

    // Set up the WorkspaceManager interface along with a database connection
let wsm = new WorkspaceManager(new DatabaseController());
wsm.openWorkspace("D:\\javascript\\DumpEmSuite\\project\\dump-em-suite\\testfolder\\test.db");

    // React setup
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App storageInterface={wsm} />);