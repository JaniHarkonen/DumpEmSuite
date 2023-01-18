export default class ModalAPI {
    static modal = null;

    static initialize(modal) {
        ModalAPI.modal = modal;
    }

    static popup(view) {
        if( !ModalAPI.modal ) return;

        ModalAPI.modal.setState({
            view: view
        });
    }

    static close() {
        if( !ModalAPI.modal ) return;

        ModalAPI.modal.setState({
            view: null
        });
    }
}
