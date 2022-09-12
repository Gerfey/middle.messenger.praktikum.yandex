import Components from '../../utils/Components';
import template from './authorization.hbs';
import './authorization.scss';
import sendDataForm from '../../utils/sendDataForm';

export class AuthorizationPage extends Components {

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
