import { useState } from "react";
import { Styles } from "./FileItem.styles";
import { FullImage } from "../../common/FullImage";
import { images } from "../../assets/assets";
import { imageExtensions } from "../../assets/imageExtensions";

const pathModule = window.require("path");


export default function FileItem(props) {
    const targetFile = props.targetFile;
    const onClick = props.onClick;
    const onRemove = props.onRemove;

    const [ displayRemoveButton, setDisplayRemoveButton ] = useState(false);


    const handleFileClick = (file) => {
        onClick(file);
    };

    const handleFileRemove = (e, file) => {
        e.stopPropagation();
        onRemove(file);
    };

    const determineIconImage = (file) => {
        const ext = pathModule.extname(file);

        switch( ext )
        {
            case ".pdf": return images.file.pdf;
            case ".txt":
            case ".json":
                return images.file.text;

            default:
                if( imageExtensions.includes(ext) )
                return images.file.image;

                return images.file.blank;
        }
    };

    return (
        <Styles.Content
            onClick={() => { handleFileClick(targetFile); }}
            onMouseEnter={() => { setDisplayRemoveButton(true); }}
            onMouseLeave={() => { setDisplayRemoveButton(false); }}
            title={targetFile}
        >
            <Styles.IconPanel>
                <Styles.IconContainer><FullImage src={determineIconImage(targetFile)} /></Styles.IconContainer>
            </Styles.IconPanel>

            <Styles.TitlePanel>
                {targetFile}
            </Styles.TitlePanel>

            {
                displayRemoveButton &&
                (
                    <Styles.RemoveButton
                        onClick={(e) => { handleFileRemove(e, targetFile); }}
                    >
                        <FullImage src={images.minus.redWhite} />
                    </Styles.RemoveButton>
                )
            }
            
        </Styles.Content>
    );
}
