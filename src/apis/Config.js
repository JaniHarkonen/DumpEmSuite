import { readJson, writeJson } from "../utils/FileUtils";
const fs = window.require("fs");
const pathModule = window.require("path");

export default class Config {
    static config;
    static configFile;

    static isConfigValid() {
        return this.config != null;
    }

    static updateConfig() {
        if( !this.isConfigValid() ) return;

        writeJson(this.configFile, this.config);
    }

    static loadConfig(file) {
        if( !file ) return;

        this.config = readJson(file);
        this.configFile = file;
    }

    static getActiveWorkspaceID() {
        if( !this.isConfigValid() ) return -1;

        return this.config.activeWorkspaceID;
    }

    static getAnalysisTemplates() {
        if( !this.isConfigValid() )
        {
            return {
                technical: "ERROR",
                fundamental: "ERROR",
                consensus: "ERROR"
            };
        }

        return {
            technical: this.config.templates.technical.content,
            fundamental: this.config.templates.fundamental.content,
            consensus: this.config.templates.consensus.content
        };
    }

    static getAnalysisPaths() {
        return {
            technical: this.config.templates.technical.filepath,
            fundamental: this.config.templates.fundamental.filepath,
            consensus: this.config.templates.consensus.filepath
        };
    }

    static getOpenWorkspaces() {
        if( !this.isConfigValid() ) return [];

        return this.config.openWorkspaces;
    }

    static switchWorkspace(toWorkspaceID) {
        if( !this.isConfigValid() ) return;

        this.config.activeWorkspaceID = toWorkspaceID;
        this.updateConfig();
    }

    static isWorkspaceOpen(path) {
        for( let ws of this.config.openWorkspaces )
        if( ws.source === path ) return true;

        return false;
    }

    static openWorkspace(path) {
        if( 
            !this.isConfigValid()               ||
            !fs.existsSync(path)                ||
            this.isWorkspaceOpen(path + "\\")
        )
        return {
            workspaces: this.config.openWorkspaces,
            activeWorkspaceID: this.config.activeWorkspaceID
        };

            // Find the .db file constituting the Workspace
        const files = fs.readdirSync(path);
        let db = null;
        for( let file of files )
        {
            if( pathModule.extname(file) === ".db" )
            {
                db = file;
                break;
            }
        }

            // No .db file found in the directory -> this is not a Workspace
        if( db == null ) return;

            // Parse required information from the .db filepath
        const parse = pathModule.parse(db);
        const name = parse.name;
        const source = path + "\\";
        const format = parse.ext;

        const ws = {
            name: name,
            source: source,
            format: format
        };

            // Modify the configuration and update the file
        this.config.activeWorkspaceID = this.config.openWorkspaces.length;
        this.config.openWorkspaces.push(ws);
        this.updateConfig();

        return {
            workspaces: this.config.openWorkspaces,
            activeWorkspaceID: this.config.activeWorkspaceID
        };
    }

    static createWorkspace(path, name) {
        if(
            !name                 ||
            name === ""           ||
            !this.isConfigValid() ||
            !fs.existsSync(path)  ||
            fs.existsSync(path + "\\" + name)
        )
        return this.config.openWorkspaces;

            // Create the Workspace folder structure
        path += "\\" + name;
        const db = process.cwd() + "\\config\\default.db";

        if( !fs.existsSync(db) ) return this.config.openWorkspaces;

        fs.mkdirSync(path + "\\materials", { recursive: true });
        fs.copyFileSync(db, path + "\\" + name + ".db");
        
        return this.openWorkspace(path);
    }

    static closeWorkspace(workspaceID) {
        if( !this.isConfigValid() ) return;

        this.config.openWorkspaces.splice(workspaceID, 1);

            // Switch tabs if the active tab is the closed tab or
            // to the right of it
        if( workspaceID >= this.config.activeWorkspaceID )
        this.config.activeWorkspaceID = workspaceID - 1;

        this.updateConfig();

        return {
            workspaces: this.config.openWorkspaces,
            activeWorkspaceID: this.config.activeWorkspaceID
        };
    }

    static getWorkspacePath(workspace) {
        if( !workspace ) return "";

        return workspace.source + workspace.name + workspace.format;
    }

    static changeAnalysisTemplate(templateIdentifier, templatePath) {
        if( !templateIdentifier ) return;
        if( !templatePath ) return;
        if( !fs.existsSync(templatePath) ) return;

        this.config.templates[templateIdentifier].content = fs.readFileSync(templatePath, "utf8").toString();
        this.config.templates[templateIdentifier].filepath = templatePath;
        this.updateConfig();
    }
}
