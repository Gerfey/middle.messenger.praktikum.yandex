import Components from "../../utils/Components";
import template from "./button.hbs";

interface ButtonProps {
    label: string;
    className: string;
    onClick?: () => void;
}

// @ts-ignore
export class Button extends Components<ButtonProps> {
    constructor({onClick, label, className}: ButtonProps) {
        super({
            label,
            className,
            events: {
                click: onClick
            }
        });
    }

    protected render() {
        return this.compile(template, this.props);
    }
}