import Components from "../../utils/Components";
import template from "./fromItem.hbs";
import {Validator} from "../../utils/Validator";

interface FormItemProps {
    className: string,
    label: string,
    name: string,
    type: string,
    validation: string
}

// @ts-ignore
export class FormItem extends Components<FormItemProps> {
    constructor({ label, validation, ...props }: FormItemProps) {

        const validator = new Validator();

        super({
            ...props,
            label,
            onFocus: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;

                // @ts-ignore
                const {result, message} = validator.validate(validation, value);

                this.refs.error.setProps({
                    isValid: result,
                    text: message
                });
            },
            onBlur: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;

                // @ts-ignore
                const {result, message} = validator.validate(validation, value);

                this.refs.error.setProps({
                    isValid: result,
                    text: message
                });
            },
            onInput: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;

                // @ts-ignore
                const {result, message} = validator.validate(validation, value);

                this.refs.error.setProps({
                    isValid: result,
                    text: message
                });
            }
        });
    }

    protected render() {
        return this.compile(template, this.props);
    }
}