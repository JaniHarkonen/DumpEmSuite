import { useState, useEffect } from "react";
import { FullDiv } from "../../common/FullDiv";
import { getKey } from "../../utils/KeyManager";
import FileLoadButton from "../FileLoadButton/FileLoadButton";
import { Styles } from "./FileExplorer.styles";

const { exec } = window.require("child_process");
const fs = window.require("fs");
const pathModule = window.require("path");

export default function FileExplorer(props) {
    const targetDirectory = props.targetDirectory;


    useEffect(() => {
        refresh();
    }, []);

    const readFolder = (path) => {
        if( !path || path === "" ) return [];
        if( !fs.existsSync(path) ) return [];

        const files = fs.readdirSync(path);
        const file_objs = [];

        for( let file of files )
        {
            let full_path = path + "\\" + file;

            if( full_path.includes("System Volume Information") )   continue;
            if( fs.lstatSync(full_path).isDirectory() )             continue;

            file_objs.push(file);
        }

        return file_objs;
    };

    const refresh = () => {
        setDisplayedFiles(readFolder(targetDirectory));
    };

    const [displayedFiles, setDisplayedFiles] = useState(readFolder(targetDirectory));

    const handleFileClick = (file) => {
        if( !file || file === "" ) return;

        exec("\"" + targetDirectory + "\\" + file + "\"");
    };

    const handleFileRemove = (e, file) => {
        e.stopPropagation();

        fs.unlinkSync(targetDirectory +file);
        refresh();
    };

    const handleFileAdditionClick = (selectedFiles) => {
        const files = selectedFiles;
        const targetDir = targetDirectory;

            // Create a research materials folder for the stock if it doesn't exist
        if( !fs.existsSync(targetDir) )
        fs.mkdirSync(targetDir);

        for( let file of files )
        fs.copyFileSync(file, targetDir + pathModule.basename(file));

        refresh();
    };

    const renderFileList = (files) => {
        if( !files || files.length === 0 )
        {
            return (
                <Styles.FileContainer>
                    No files or analysis yet...
                </Styles.FileContainer>
            );
        }

        return files.map((file) => {
            return (
                <Styles.FileContainer
                    key={"file-explorer-file-" + getKey()}
                    onClick={() => { handleFileClick(file); }}
                >
                    {file}

                    <Styles.FileCloseButton
                        onClick={(e) => { handleFileRemove(e, file); }}
                    />
                </Styles.FileContainer>
            );
        });
    };

    return (
        <FullDiv>
            <FileLoadButton
                caption="Load file..."
                onFileLoad={handleFileAdditionClick}
                dialogSettings={{
                    title: "Import research material(s)",
                    multiSelections: true
                }}
            />

            {renderFileList(displayedFiles)}
        </FullDiv>
    );
}
