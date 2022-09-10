import Components from '../../utils/Components';
import template from './chat.hbs';
import './chat.scss';
import {Validator} from '../../utils/Validator';

export class ChatPage extends Components {
    constructor() {
        super({
            sendValues: () => {
                const element = this.getContent();

                const form = element?.querySelector('form');

                if (form !== undefined) {
                    const input = form?.querySelector('input');

                    const data: Record<string, unknown> = {};

                    const validator = new Validator();

                    let sendForm = true;

                    if (input) {
                        data[input.name] = input.value;

                        const resultValidation = validator.validate(input.name, input.value);

                        sendForm = resultValidation.result;
                    }

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
