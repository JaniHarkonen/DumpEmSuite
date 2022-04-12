import React from "react";
import styled from "styled-components";
import { FullDiv } from "../../../../common/FullDiv";
import { getKey } from "../../../../utils/KeyManager";

const { exec } = window.require("child_process");
const fs = window.require("fs");
const pathModule = window.require("path");

export default function FileExplorer() {

    const TESTFOLDER = "D:\\javascript\\DumpEmSuite\\project\\dump-em-suite\\testfolder\\";

    /**
     * Reads the files contained in a given folder and returns an array containing
     * JSON-objects representing the files and their attributes.
     * @param {string} path Folder whose contents to read.
     * @returns An array of JSON-objects representing the read files.
     */
    const readFolder = (path) => {
        if( !path || path === "" ) return [];

        let files = fs.readdirSync(path);
        let file_objs = files.map((file) => {
            if( (path + "\\" + file).includes("System Volume Information") ) return false;

            /*let is_folder = fs.lstatSync(path + "\\" + file).isDirectory();
            return { 
                path: (is_folder) ? path + file + "\\" : path + "\\" + file,
                name: file,
                isFolder: is_folder,
                extension: pathModule.extname(file)
            };*/

            return {
                name: file
            };
        });
    
        /*let opts = this.state.itemTypes;
        return file_objs.filter((file) => {
            if( !opts.includes("FOLDER") && file.isFolder === true ) return false;
            if( !opts.includes("FILE") && file.isFolder === false )
            {
                if( opts.includes(file.extension) ) return true;
                else return false;
            }

            return true;
        });*/

        return file_objs;
    }

    /**
     * Returns an array of React-components representing a given list of files.
     * @param {*} files An array of files whose should be rendered.
     */
    const renderFileList = (files) => {
        if( !files ) return <></>;

        return files.map((file) => {
            return(
                <FileContainer
                    key={"fe-file-" + getKey()}
                    onClick={() => { console.log("file clicked"); }}
                >
                    {file.name}
                </FileContainer>
            );
        });
    }

    return(
        <FullDiv>
            {renderFileList(readFolder(TESTFOLDER))}
        </FullDiv>
    );
}

/*
<input type="file" />

readFolder = (path) => {
        let files = fs.readdirSync(path);
        let file_objs = files.map((file) => {
            if( (path + "\\" + file).includes("System Volume Information") ) return false;

            let is_folder = fs.lstatSync(path + "\\" + file).isDirectory();
            return { 
                path: (is_folder) ? path + file + "\\" : path + "\\" + file,
                name: file,
                isFolder: is_folder,
                extension: pathModule.extname(file)
            };
        });
    
        let opts = this.state.itemTypes;
        return file_objs.filter((file) => {
            if( !opts.includes("FOLDER") && file.isFolder === true ) return false;
            if( !opts.includes("FILE") && file.isFolder === false )
            {
                if( opts.includes(file.extension) ) return true;
                else return false;
            }

            return true;
        });
    }
*/

const FileContainer = styled.div`
    position: relative;
    width : 50%;
    height: 48px;
`;