import { useState } from "react";

export default function useInputField(defaultInput) {
    const [input, setInput] = useState(defaultInput);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    return [ input, handleInputChange ];
}
