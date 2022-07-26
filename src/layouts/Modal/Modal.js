import ModalAPI from "../../apis/ModalAPI";

import { Component } from "react";


export default class Modal extends Component {
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
