export default class ModelComponent {
    constructor(host = null) {
        this.hostWorkspace = host;
    }

    /**
     * Returns the attributes of the component in a JSON-object which can
     * then be appended to a Workspace Model file.
     * @returns JSON-object of this component's attributes.
     */
    jsonify() {
        return;
    }

    notifyChange() {
        this.hostWorkspace.registerComponentChange(this);
    }
}