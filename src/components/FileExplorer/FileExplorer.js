import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FullDiv } from "../../common/FullDiv";
import { getKey } from "../../utils/KeyManager";
import { FullImage } from "../../common/FullImage";
import { copyFile } from "../../utils/FileUtils";

import imgFolderWhite from "../../assets/img_folder_white.svg";

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

    const handleFileAdditionClick = (e) => {
        e.stopPropagation();

        const files = e.target.files;
        const targetDir = targetDirectory;

        if( !fs.existsSync(targetDir) )
        fs.mkdirSync(targetDir);

        for( let file of files )
        copyFile(file.path, targetDir + file.name);

        refresh();
    };

    const renderFileList = (files) => {
        if( !files || files.length === 0 )
        {
            return(
                <FileContainer>
                    No files or analysis yet...
                </FileContainer>
            )
        }

        return files.map((file) => {
            return(
                <FileContainer
                    key={"fe-file-" + getKey()}
                    onClick={() => { handleFileClick(file); }}
                >
                    {file}
                </FileContainer>
            );
        });
    };

    return(
        <FullDiv>
            <LoadFileContainer>
                <LoadFileIconPanel>
                    <FullImage src={imgFolderWhite} />
                </LoadFileIconPanel>

                <LoadFileCaptionPanel>
                    <LoadFileButtonCaptionContainer>
                        Load file...
                    </LoadFileButtonCaptionContainer>
                </LoadFileCaptionPanel>

                <LoadFileInput
                    type="file"
                    multiple="multiple"
                    onChange={handleFileAdditionClick}
                />
            </LoadFileContainer>

            {renderFileList(displayedFiles)}
        </FullDiv>
    );
}

const FileContainer = styled.div`
    position: relative;
    width : 50%;
    height: 48px;
`;

const LoadFileContainer = styled.div`
    position: relative;
    width: 128px;
    height: 32px;

    border-style: solid;
    border-width: 1px;
    border-radius: 8px;
`;

const LoadFileIconPanel = styled.div`
    position: relative;
    width: 25%;
    height: 100%;

    display: inline-block;
`;

const LoadFileCaptionPanel = styled.div`
    position: relative;
    width: 75%;
    height: 100%;

    display: inline-block;
    vertical-align: top;    // This line prevents the div within (shown below) from "falling" when text is added
`;

const LoadFileButtonCaptionContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoadFileInput = styled.input`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    opacity: 0.0;
`;
