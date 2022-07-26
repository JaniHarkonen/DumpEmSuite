const ipcRenderer = window.require("electron").ipcRenderer;


/**
 * This API can be used to access the file system dialog window to
 * select files and directories to save to or to open. The API makes
 * requests to the Electron main-process vai "invoke", which will
 * then display an appropriate dialog window and return the
 * selections.
 */
export default class DialogAPI {

    /**
     * Shows a folder selection dialog window with the given settings
     * that are analogous to the dialog "options" outlined in "main.js".
     * The title and the selection button label can be customized with
     * the settings.
     * 
     * After the dialog window closes a given callback function will be
     * executed with the selection result passed in as an argument.
     * 
     * The *response* will either be an array containing only the path of
     * the selected folder, or undefined, if the user didn't choose one.
     * @param {JSON} settings 
     * @param {Function} callback 
     */
    static showOpenFolder(settings, callback) {
        ipcRenderer.invoke("open-dialog", {
            title: settings.title,
            buttonLabel: settings.buttonLabel,
            properties: ["openDirectory"]
        })
        .then((response) => {
            callback(response);
        });
    }

    /**
     * Shows a file opening dialog window with the given settings that
     * are analogous to the dialog "options" outlined in "main.js".
     * The title, the selection button caption and whether to allow
     * multiple selection can be customized in the settings.
     * 
     * After the dialog window closes a given callback function will be
     * executed with the selection result passed in as an argument.
     * 
     * The *response* will either be an array containing only the paths of
     * the selected files, or undefined, if the user didn't choose any
     * files.
     * @param {JSON} settings 
     * @param {Function} callback 
     */
    static showOpenFile(settings, callback) {
        ipcRenderer.invoke("open-dialog", {
            title: settings.title,
            buttonLabel: settings.buttonLabel,
            filters: settings.filters,
            properties: ["openFile"].concat(settings.multiSelections && "multiSelections")
        })
        .then((response) => {
            callback(response);
        });
    }
}
