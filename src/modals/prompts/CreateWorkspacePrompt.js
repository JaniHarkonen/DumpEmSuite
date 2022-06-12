import InputPrompt from "./generic/InputPrompt";

export default function CreateWorkspacePrompt(props) {
    return(
        <InputPrompt
            title="Create a workspace..."
            inputCaption="Enter workspace name: "
            disableCloseOnDone
            body={<></>}
            onDone={(input) => {
                props.onDone(input);
            }}
        />
    );
};
