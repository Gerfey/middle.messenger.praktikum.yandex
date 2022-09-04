import template from "./registration.hbs";
import Components from "../../utils/Components";
import './registration.scss';
import {FormRegistration} from "../../components/Form/Registration";
import {registerComponent} from "../../utils/registerComponent";

registerComponent('FormRegistration', FormRegistration as any);

interface RegistrationPageProps {

}

// @ts-ignore
export class RegistrationPage extends Components<RegistrationPageProps> {
    constructor(props: RegistrationPageProps = {}) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {children: this.children});
    }
}