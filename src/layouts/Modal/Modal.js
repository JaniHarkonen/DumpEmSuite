import React from "react";
import ModalAPI from "../../apis/ModalAPI";

export default class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: null
        };

        ModalAPI.initialize(this);
    }

    render() {
        if( !this.state.view ) return <></>;

        return(
            <>
                {this.state.view}
            </>
        );
    }
}