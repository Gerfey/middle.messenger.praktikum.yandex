import template from "./form_registration.hbs";
import Components from "../../../utils/Components";
import './from_registration.scss';

import {registerComponent} from "../../../utils/registerComponent";
import {FormRegistrationItem} from "./Items";

registerComponent('FormRegistrationItem', FormRegistrationItem as any);

interface FormRegistrationProps {

}

// @ts-ignore
export class FormRegistration extends Components<FormRegistrationProps> {

    constructor(props: FormRegistrationProps = {}) {
        super(props);
    }

    protected render() {
        return this.compile(template, this.props);
    }
}