import Components from '../../utils/Components';
import {Validator} from '../../utils/Validator';
import template from './fromItem.hbs';

interface FormItemProps {
    className: string,
    label: string,
    name: string,
    type: string,
    validation: string
}

export class FormItem extends Components<FormItemProps> {
    static componentName = 'FormItem';

    constructor({label, validation, ...props}: FormItemProps) {
        const validator = new Validator();

        super({
            ...props,
            label,
            onFocus: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;

                const {result, message} = validator.validate(validation, value);

                this.refs.error.setProps({
                    isValid: result,
                    text: message,
                });
            },
            onBlur: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;

                const {result, message} = validator.validate(validation, value);

                this.refs.error.setProps({
                    isValid: result,
                    text: message,
                });
            },
            onInput: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;

                const {result, message} = validator.validate(validation, value);

                this.refs.error.setProps({
                    isValid: result,
                    text: message,
                });
            },
        });
    }

    public getName() {
        return (this.element.querySelector('input') as HTMLInputElement).name;
    }

    public getValue() {
        return (this.element.querySelector('input') as HTMLInputElement).value;
    }

    protected render() {
        return this.compile(template, this.props);
    }
}
