const { app, BrowserWindow, ipcMain, dialog } = require('electron');

const path = require("path");
const isDev = require("electron-is-dev");
const url = require("url");

require("@electron/remote/main").initialize();

function createWindow() {
    const startUrl = isDev ? "http://localhost:3000" : process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, './public/index.html'),  // EDIT OUT THE /public/ PART TO AVOID DUPLICATE DIRECTORY, original: path.join(__dirname, './public/index.html')
        protocol: 'file:',
        slashes: true,
      });

    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        resizable: true,
        icon: path.join(__dirname, "./logo_des.png"),
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });

    //win.removeMenu();
    win.loadURL(startUrl);
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
    if( process.platform !== "darwin" ) app.quit();
});

app.on("activate", function() {
    if( BrowserWindow.getAllWindows().length === 0 ) createWindow();
});

    // Handle open dialog requests
ipcMain.handle("open-dialog", async (event, settings) => {

    return dialog.showOpenDialogSync(null, {
        title: settings?.title || "Select a file",
        buttonLabel: settings?.buttonLabel || "Select",
        filters: settings?.filters || "",
        properties: settings?.properties?.concat("dontAddToRecent") || [
            "openFile",
            "dontAddToRecent"
        ]
    });
});

    // Handle save dialog requests
ipcMain.handle("save-dialog", async (event, settings) => {

    return dialog.showSaveDialogSync(null, {
        title: settings?.title || "Save a file",
        buttonLabel: settings?.buttonLabel || "Save",
        filters: settings?.filters || "",
        properties: settings?.properties?.concat("dontAddToRecent") || [
            "dontAddToRecent"
        ]
    });
});
