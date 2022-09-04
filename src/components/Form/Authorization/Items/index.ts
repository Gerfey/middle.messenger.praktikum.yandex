import template from "./form_authorization_items.hbs";
import './from_authorization_items.scss';
import Components from "../../../../utils/Components";

interface FormAuthorizationItemProps {

}

// @ts-ignore
export class FormAuthorizationItem extends Components<FormAuthorizationItemProps> {
    constructor(props: FormAuthorizationItemProps = {}) {
        super(props);
    }

    protected render() {
        return this.compile(template, this.getProps());
    }
}