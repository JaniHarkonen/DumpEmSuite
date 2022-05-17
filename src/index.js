import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ModelManager from './utils/ModelManager';
import { DUMP_EM_CONFIG, setAnalysisTemplates } from './utils/CommonVariables';
import { readJson } from './utils/FileUtils';

    // Model manager is initialized here to avoid being initialized multitple times
const modelManager = new ModelManager();
modelManager.initialize();

    // Load analysis note templates
let config = readJson(DUMP_EM_CONFIG);
setAnalysisTemplates({
    technical: readJson(config.analysisTemplates.technical).content,
    fundamental: readJson(config.analysisTemplates.fundamental).content,
    consensus: readJson(config.analysisTemplates.consensus).content
});

    // React setup
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App modelManager={modelManager}/>);