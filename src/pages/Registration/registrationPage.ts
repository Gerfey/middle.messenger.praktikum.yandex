import Components from '../../utils/Components';
import {Validator} from '../../utils/Validator';
import template from './registration.hbs';
import './registration.scss';

export class RegistrationPage extends Components {
    constructor() {
        super({
            sendValues: () => {
                const element = this.getContent();

                const form = element?.querySelector('form');

                if (form !== undefined) {
                    const formInputs = form?.querySelectorAll('.form-item');

                    const data: Record<string, unknown> = {};

                    const validator = new Validator();

                    let sendForm = true;

                    Array.from(formInputs).forEach((formInput) => {
                        const input = formInput?.querySelector('input');

                        if (input) {
                            data[input.name] = input.value;

                            const resultValidation = validator.validate(input.name, input.value);

                            console.log(resultValidation);

                            const error = formInput?.querySelector('.form-item__div');

                            if (resultValidation.result === false) {
                                if (error !== undefined) {
                                    error.textContent = resultValidation.message;
                                }

                                sendForm = false;
                            } else {
                                error.textContent = '';
                            }
                        }
                    });

                    if (sendForm) {
                        console.log(data);
                    }
                }
            },
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
