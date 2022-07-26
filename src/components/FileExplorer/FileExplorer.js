import FileItem from "./FileItem";
import FileLoadButton from "../FileLoadButton/FileLoadButton";
import OpenExplorerButton from "../OpenExplorerButton/OpenExplorerButton";

import { useState, useLayoutEffect } from "react";
import { FullDiv } from "../../common/FullDiv";
import { getKey } from "../../utils/KeyManager";
import { Styles } from "./FileExplorer.styles";

const { exec } = window.require("child_process");
const fs = window.require("fs");
const pathModule = window.require("path");


export default function FileExplorer(props) {
    const targetDirectory = props.targetDirectory;

    const [displayedFiles, setDisplayedFiles] = useState(null);


    useLayoutEffect(() => {
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

        return file_objs.sort();
    };

    const refresh = () => {
        setDisplayedFiles(readFolder(targetDirectory));
    };

    const handleFileClick = (file) => {
        if( !file || file === "" ) return;

        exec("\"" + targetDirectory + "\\" + file + "\"");
    };

    const handleFileRemove = (file) => {
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
                <>
                    No research material yet...
                </>
            );
        }

        return files.map((file) => {
            return (
                <Styles.FileItemContainer
                    key={"file-explorer-file-" + getKey()}
                >
                    <FileItem
                        targetFile={file}
                        onClick={() => { handleFileClick(file); }}
                        onRemove={() => { handleFileRemove(file);  }}
                    />
                </Styles.FileItemContainer>
            );
        });
    };

    return (
        <FullDiv>
            <Styles.ControlPanel>
                <Styles.FileLoadButtonContainer>
                    <FileLoadButton
                        caption="Load file..."
                        onFileLoad={handleFileAdditionClick}
                        dialogSettings={{
                            title: "Import research material(s)",
                            multiSelections: true
                        }}
                    />
                </Styles.FileLoadButtonContainer>

                <Styles.OpenExplorerButtonContainer>
                    <OpenExplorerButton
                        path={targetDirectory}
                    />
                </Styles.OpenExplorerButtonContainer>
            </Styles.ControlPanel>
            <Styles.MaterialsContainer>
                <Styles.MaterialsAligner>
                    <Styles.MaterialsGrid>
                        {renderFileList(displayedFiles)}
                    </Styles.MaterialsGrid>
                </Styles.MaterialsAligner>
            </Styles.MaterialsContainer>
        </FullDiv>
    );
}
