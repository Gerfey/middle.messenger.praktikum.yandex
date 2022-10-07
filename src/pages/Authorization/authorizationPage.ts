import Components from '../../utils/Components';
import template from './authorization.hbs';
import './authorization.scss';
import FormItem from '../../components/FormItem';
import AuthController from '../../controllers/AuthController';

export class AuthorizationPage extends Components {

    constructor() {
        super({
            onSubmit: () => {
                const values = Object
                    .values(this.children)
                    .filter(child => child instanceof FormItem)
                    .map((child) => ([(child as FormItem).getName(), (child as FormItem).getValue()]));

                const data = Object.fromEntries(values);

                AuthController.signin(data);
            },
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
