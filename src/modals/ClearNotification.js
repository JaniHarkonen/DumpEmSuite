import React from "react";
import ModalAPI from "../apis/ModalAPI";
import ModalView from "../layouts/Modal/ModalView";

export default function ClearNotification(props) {
    const caption = props.caption || "Before bringing...";
    const message = props.message || "Some of the stocks on this tab are color coded and have to be cleared before bringing!\nWould you like to clear the tab?";
    const onYes = props.onYes;

    return(
        <ModalView
            mode={"question"}
            caption={caption}
            message={message}
            hooks={{
                onYes: () => {
                    onYes();
                    ModalAPI.close();
                },
                onClose: () => {
                    ModalAPI.close();
                }
            }}
        />
    );
};
