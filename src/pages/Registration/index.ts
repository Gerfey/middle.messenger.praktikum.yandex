import template from "./registration.hbs";
import Components from "../../utils/Components";
import './registration.scss';
import {FormRegistration} from "../../components/Form/Registration";

interface RegistrationPageProps {

}

// @ts-ignore
export class RegistrationPage extends Components<RegistrationPageProps> {
    constructor(props: RegistrationPageProps = {}) {
        super(props);
    }

    protected render(): DocumentFragment {

        // @ts-ignore
        this.setChildren('form_registration', new FormRegistration());

        return this.compile(template, {children: this.children});
    }
}