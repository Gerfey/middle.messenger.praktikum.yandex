import template from "./item.hbs";
import Components from "../../../utils/Components";

interface ProfileItemsProps {
    className: string,
    name: string;
    type?: string;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

// @ts-ignore
export class ProfileItems extends Components<ProfileItemsProps> {
    constructor({onFocus, onBlur, ...props}: ProfileItemsProps) {
        super({
            ...props,
            events: {
                focus: onFocus,
                blur: onBlur,
            }
        });
    }

    protected render() {
        return this.compile(template, this.props);
    }
}