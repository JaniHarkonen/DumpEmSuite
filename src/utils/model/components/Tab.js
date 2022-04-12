import ModelComponent from "./ModelComponent";

export default class Tab extends ModelComponent {
    constructor(host = null, id = -1, name = "", jsx = <></>) {
        super(host);
        this.id         = id;
        this.name       = name;
        this.element    = jsx;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getElement() {
        return this.element;
    }
}