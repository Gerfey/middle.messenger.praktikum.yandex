import template from "./form_registration_items.hbs";
import './from_registration_items.scss';
import Components from "../../../../utils/Components";

interface FormRegistrationItemProps {

}

// @ts-ignore
export class FormRegistrationItem extends Components<FormRegistrationItemProps> {
    constructor(props: FormRegistrationItemProps = {}) {
        super(props);
    }

    protected render() {
        return this.compile(template, this.getProps());
    }
}