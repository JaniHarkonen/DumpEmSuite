import React from "react";
import Modal from "../../Modal/Modal";
import ExternalStorageAPI from "../ExternalStorageAPI";

export default function ClearNotification(props) {
    const caption = props.caption || "Before bringing...";
    const message = props.message || "Some of the stocks on this tab are color coded and have to be cleared before bringing!\nWould you like to clear the tab?";
    const tab = props.tab;
    const setModalActive = props.setModalActive;

    return(
        <Modal
            mode={"question"}
            caption={caption}
            message={message}
            hooks={{
                onYes: () => {
                    console.log("yes");
                    /*ExternalStorageAPI.clearTabStocks(tab);
                    setModalActive(false);*/
                },
                onNo: () => {
                    console.log("no");
                    /*setModalActive(false);*/
                },
                onClose: () => {
                    console.log("close");
                    /*setModalActive(false);*/
                }
            }}
        />
    );
};
