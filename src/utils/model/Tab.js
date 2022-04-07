export default class Tab {
    constructor(name = "", jsx = <></>, data = {}) {
        this.name       = name;
        this.element    = jsx;
        this.data       = data;
    }
}