import Components from "../../utils/Components";
import template from "./error.hbs";
import template_blank from "./error.blank.hbs";

// @ts-ignore
export class Error extends Components<ButtonProps> {
    protected render() {
        if (this.props.isValid) {
            return this.compile(template_blank, this.props);
        }

        return this.compile(template, this.props);
    }
}