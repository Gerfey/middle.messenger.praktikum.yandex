import Components from '../../utils/Components';
import template from './registration.hbs';
import './registration.scss';
import sendDataForm from '../../utils/sendDataForm';

export class RegistrationPage extends Components {
    constructor() {
        super({
            sendValues: () => {
                const element = this.getContent();
                sendDataForm(element);
            },
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
