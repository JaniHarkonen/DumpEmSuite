import FileLoadButton from "../FileLoadButton/FileLoadButton";

import { FullDiv } from "../../common/FullDiv"
import { Styles } from "./PathPicker.styles";


export default function PathPicker(props) {
    const caption = props.caption;
    const path = props.path;
    const onChange = props.onChange;


    const handleDialogSelection = (files) => {
        if( !files ) return;

        onChange(files[0]);
    };

    return (
        <FullDiv>
            <Styles.HalfDiv>
                {caption}
            </Styles.HalfDiv>

            <Styles.HalfDiv>
                <Styles.FileInput
                    value={path}
                    onChange={onChange}
                />

                <Styles.FileLoadButtonContainer>
                    <FileLoadButton
                        caption="Change"
                        onFileLoad={handleDialogSelection}
                        dialogSettings={{
                            title: "Select a file"
                        }}
                    />
                </Styles.FileLoadButtonContainer>
            </Styles.HalfDiv>
        </FullDiv>
    );
};
