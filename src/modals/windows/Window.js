import Prompt from "../prompts/generic/Prompt";

export default function Window(props) {
    const title = props.title;
    const Body = props.children;

    return (
        <Prompt
            title={title}
            body={Body}
        />
    );
}
