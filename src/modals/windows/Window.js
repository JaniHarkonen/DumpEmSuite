import Prompt from "../prompts/generic/Prompt";


export default function Window(props) {
    const title = props.title;
    const dimensions = props.dimensions;
    const Body = props.children;

    return (
        <Prompt
            title={title}
            body={Body}
            dimensions={dimensions}
        />
    );
}
