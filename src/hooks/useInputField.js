import { useState } from "react";

export default function useInputField(defaultInput) {
    const [input, setInput] = useState(defaultInput);

    const handleInputChange = (e) => {

            // The input is expected to be received from an input
            // field element, however sometimes it may be 
            // necessary to input directly to the field
        if(  typeof e === "string" )
        setInput(e);
        else
        setInput(e.target.value);
    };

    return [ input, handleInputChange ];
}
