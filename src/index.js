import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DatabaseController from "./database/DatabaseController";
import ExternalStorageAPI from "./apis/ExternalStorageAPI";
import Config from './apis/Config';


    // Load configuration
Config.loadConfig("D:\\javascript\\DumpEmSuite\\project\\dump-em-suite\\config\\config.json");
const workspaces = Config.getOpenWorkspaces();

    // Set up the ExternalStorageAPI interface along with a database connection
ExternalStorageAPI.initialize(new DatabaseController());

    // React setup
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App
        openWorkspaces={workspaces}
        activeWorkspaceID={Config.getActiveWorkspaceID()}
    />
);
