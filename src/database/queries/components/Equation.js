import QueryComponent from "./QueryComponent";

export default class Equation extends QueryComponent {
    constructor(op1, op2, oprt) {
        super();
        this.operand1 = op1;
        this.operand2 = op2;
        this.operator = oprt;
    }

    getJSON() {
        return {
            operand1: this.operand1.getJSON(),
            operand2: this.operand2.getJSON(),
            operator: this.operator
        };
    }

    getString() {
        return this.operand1.getString() + this.operator + this.operand2.getString();
    }
}
