import Components from "../../utils/Components";
import template from "./button.hbs";

interface ButtonProps {
    label: string,
    events: {
        click: () => void;
    }
}

// @ts-ignore
export class Button extends Components<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props);
    }

    protected render() {
        return this.compile(template, this.getProps());
    }
}