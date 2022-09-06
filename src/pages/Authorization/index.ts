import template from "./authorization.hbs";
import Components from "../../utils/Components";
import './authorization.scss';
import {Validator} from "../../utils/Validator";

// @ts-ignore
export class AuthorizationPage extends Components {
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
                    // @ts-ignore
                    Array.from(formInputs).forEach((formInput) => {

                        let input = formInput?.querySelector('input');

                        if (input) {
                            data[input.name] = input.value;

                            let result = validator.validate(input.name, input.value)

                            let error = formInput?.querySelector('.form-item__div');
                            // @ts-ignore
                            if (result.result === false) {

                                if (error !== undefined) {
                                    // @ts-ignore
                                    error.textContent = result.message;
                                }

                                sendForm = false;
                            }else {
                                // @ts-ignore
                                error.textContent = '';
                            }
                        }
                    });

                    if (sendForm) {
                        console.log(data);
                    }
                }
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}